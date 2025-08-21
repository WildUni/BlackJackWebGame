import { isUint8ClampedArray } from "util/types";
import {Card, Deck } from "./deck";
import assert from "assert";
import { error } from "console";
import type { NumericType } from "mongodb";

//CONSTANTS
const MAX_PLAYERS = 3;
const MAX_HANDS_PER_PLAYER = 3;
const NUM_DECKS = 2;
const MIN_BET = 1;

type hand = {
    playerName:string,
    cards:Array<Card>,
    handValue:number,
    betValue:number,
    inPlay:boolean
}

type playerInfo = {
    playerName:string, 
    balance: number, 
    socket:string, 
    ready:boolean
}

//room object
class GameRoom{
    //need player name and balance for database
    //need a deck for distribution
    //need an array to hold hands
    //need an index to keep track of current player
    //hands need to track playerName, cards, value, bet, inPlay,
    //
    
    public readonly players:Map<string, playerInfo> = new Map();
    private dealer: Array<Card> = [];
    private hands: Array<hand> = [];
    private deck: Deck;
    private gameState = "WAITING";
    private selectionCounter = 0;
    public readonly roomID:string;

    public constructor(roomID: string){
        this.roomID = roomID;
        this.deck = new Deck(NUM_DECKS);
    }
    

    /*
    ROOM FUNCTIONS
    */
    public addPlayer(info:playerInfo):void{
        this.players.set(info.playerName, info);
    }

    public removePlayer(playerID:string):void{
        this.players.delete(playerID);
    }


    /**
     * Restarts the game, resetting the deck, hands, selection counter and return state to waiting
     */
    public restartGame(){
        this.deck = new Deck(NUM_DECKS);
        this.hands = [];
        this.selectionCounter = 0;
        this.gameState = "WAITING";
    }





    /*
    Game Flow Management
    */


    /**
     * Changes the player's ready status
     * @param playerID Player Id/name
     */
    public changeReadyState(playerID:string):void{
        const player = this.players.get(playerID)??assert.fail("Player does not exist");
        player.ready = !player.ready;
    }

    /**
     * 
     * @returns true iff all players are ready
     */
    public checkAllReady():boolean{
        for(const [ _ , info] of this.players){
            if(!info.ready){
                return false;
            }
        }
        return true;
    }


    

    /*Betting Phase*/

    /*
    Adds new player hands, allowing players to bet
    Only allows player to add bet to one hand.
    */
    public initBettingHands(){
        this.gameState = "BETTING";
        for(const [playerName, _]  of this.players){
            const newHand:hand = {
                playerName:playerName,
                cards: [],
                handValue: 0,
                betValue: 0,
                inPlay: true
            }
            this.hands.push(newHand);
        }
    }
    
    /*
    Called whenever player wants to add bet during the initial betting phase.
    Function should not be called after betting phase
    */
    public addBet(playerID: string, betSize: number):void{
        const player = this.players.get(playerID)??assert.fail("Player does not exist");
        const amount = Math.min(betSize, player.balance);
        player.balance -= amount;
        for(const hand of this.hands){
            if(hand.playerName === playerID){
                hand.betValue += amount;
                break;
            }
        }
    }

    /**
     * @returns true if all players have added their bets, updates game state if all bets are add
     */
    public checkBets(){
        for(const hand of this.hands){
            if(!hand.betValue){
                return false
            }
        }
        this.gameState = "DISTRIBUTING";
        return true
    }

    /**
     * Force bets for players who have not betted
     */
    public forceMinBet(){
        for(const hand of this.hands){
            if(!hand.betValue){
                const player = this.players.get(hand.playerName)??assert.fail("player not found");
                player.balance -= MIN_BET;
                hand.betValue += MIN_BET;
            }
        }
        this.gameState = "DEALING";
    }


    /*
    Dealing Phase
    */

    public dealInitCards():void{
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < this.hands.length; j++){
                this.givePlayerCard();
                this.incrementCounter();
            }
            this.giveDealerCard();
        }
    }
    /*
    Givens the current player a card
     */
    public givePlayerCard(){
        const newCard = this.deck.drawCard();
        this.hands[this.selectionCounter].cards.push(newCard);
    }

    /*
    Handles double down for the current hand. Function should not be called after distribution phase
     */
    public doubleDownAction():void{
        const hand = this.hands[this.selectionCounter];
        const player = this.players.get(hand.playerName)??assert.fail("Player does not exist");
        if(player.balance >= hand.betValue){
            hand.betValue += hand.betValue;
            player.balance -= hand.betValue;
        }else{
            throw new Error("Insuifficient Balance")
        }
    }

    /**
     * Splits the hand at current index into two one card piles.
     */
    public playerSplitHand(){
        
        const hand = this.hands[this.selectionCounter];
        
        assert(hand.cards[0].getValue() === hand.cards[1].getValue(), "Cards do not have the same card value");

        const newHands = [];
        const {playerName, cards, betValue} = hand;

        //creates new hands
        for(const card of cards){
            const newCard = this.deck.drawCard();
            const newHand:hand = {
                playerName:playerName,
                cards:[card, newCard],
                handValue:card.getNumericValue() + newCard.getNumericValue(),
                betValue:betValue,
                inPlay: true
            };

            newHands.push(newHand)
        }

        //Additional bets for the new hand, updates player balance accordingly
        const player = this.players.get(playerName)??assert.fail("Player does not exist");
        const betNewHand = Math.min(player?.balance);
        newHands[1].betValue = betNewHand;
        player.balance -= betValue;

        //adding new hand to array, index remains the same
        this.hands.splice(this.selectionCounter, 1, newHands[0], newHands[1]);
    }


    /**
     * Gives the dealer a card
     */
    public giveDealerCard(){
        const newCard = this.deck.drawCard();
        this.dealer.push(newCard);
    }

    /**
     * 
     * @param hand An array of cards
     * @returns an number representing the highest hand value <= 21
     */
    public getHandValue(hand:Array<Card>):number{
        let value = 0;
        let aces = 0;
        for (const card of hand) {
            const cardValue = card.getNumericValue();
            if (cardValue === 1) {
                aces++;
                value += 11;
            } else {
                value += cardValue;
            }
        }
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
        return value;
    }

    public dealerReveal(){
        while (this.getHandValue(this.dealer) < 17){
            this.giveDealerCard();
        }
    }

    /**
     * Increments the counter and loops back accordingly
     */
    public incrementCounter(){
        this.selectionCounter += 1;
        while(!this.hands[this.selectionCounter].inPlay){
            this.selectionCounter += 1;
            this.selectionCounter %= this.hands.length;
            if(this.selectionCounter === 0 && this.checkForTermination()){
                this.gameState = "REVEAL";
                break;
            }
        }
    }





    /**
     * @returns return iff all hands are no longer in play
     * should be called when an iteration is complete
     */
    public checkForTermination(){
        for(const hand of this.hands){
            if(hand.inPlay)return false;
        }
        return true;
    }
    
    public getGameState():string{
        return this.gameState;
    }

    public hitAction(){
        const hand = this.hands[this.selectionCounter];
        this.givePlayerCard();

        hand.handValue = this.getHandValue(hand.cards);
        if(hand.handValue >= 21){
            hand.inPlay == false;
        }
        this.incrementCounter();
    }

    public standAction(){
        const hand = this.hands[this.selectionCounter];
        hand.inPlay == false;
        this.incrementCounter();
    }


    public getNumPlayers():number{
        return this.players.size;
    }

    public getCurrentPlayerName():string{
        return this.hands[this.selectionCounter].playerName;
    }

}

export default GameRoom;