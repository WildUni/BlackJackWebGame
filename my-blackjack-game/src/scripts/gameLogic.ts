import {Card, Deck } from "./deck";
import assert from "assert";
import { gameConstants } from "./utils";
import type {displayData, gameState, hand, playerInfo} from "./utils";


class GameRoom{
    
    public readonly players:Map<string, playerInfo> = new Map();
    private dealer: Array<Card> = [];
    private hands: Array<hand> = [];
    private deck: Deck;
    private gameState:gameState = "WAITING";
    private selectionCounter = 0;
    public readonly roomId:string;
    private handResult:Array<"W" | "T" | "L"> = [];
    public constructor(roomID: string){
        this.roomId = roomID;
        this.deck = new Deck(gameConstants.NUM_DECKS);
    }
    
    public getDisplayData():displayData{

        const players = [];
        for(const [playerName, info] of this.players){
            players.push({
                playerName,
                balance:info.balance,
                ready:info.ready,
                currentBet: info.currentBet
            })
        }
        const hands = [];
        for(const hand of this.hands){
            const cards: Array<string> = [];
            for(const card of hand.cards){
                cards.push(card.getSuit() + card.getNumericValue())
            }
            hands.push({
                playerName:hand.playerName,
                cards:cards,
                handValue: hand.handValue,
                betValue: hand.betValue
            })
        }
        const gameState = this.gameState;
        const handIndex = this.selectionCounter;
        const dealerHand = []
        if(this.dealer.length){
            if(this.gameState != "REVEALING"){
                dealerHand.push(this.dealer[0].getSuit() + this.dealer[0].getNumericValue())
                dealerHand.push("HIDDEN")
            }else{
                for(const card of this.dealer){
                    dealerHand.push(card.getSuit() + card.getNumericValue);
                }
            }
        }
        return{
            players,
            hands,
            dealerHand, 
            gameState,
            handIndex, 
            roomId: this.roomId,
            handResult:this.handResult
        }
    }

    /*
    ROOM FUNCTIONS
    */

    /**
     * Adds the player to the game room object
     * @param info player information
     */
    public addPlayer(info:playerInfo):void{
        this.players.set(info.playerName, info);
    }

    /**
     * Removes the player from the game room object
     * @param info player information
     */
    public removePlayer(playerName:string):void{
        this.players.delete(playerName);
    }


    /**
     * Restarts the game, resetting the deck, hands, selection counter and return state to waiting
     */
    public restartGame(){
        this.deck = new Deck(gameConstants.NUM_DECKS);
        this.hands = [];
        this.selectionCounter = 0;
        this.gameState = "WAITING";
        for(const [_, info] of this.players){
            info.ready = false;
            info.currentBet = 0;
        }
    }

    /**
     * Changes the player's ready status
     * @param playerID Player Id/name
     */
    public changeReadyState(playerID:string):void{
        const player = this.players.get(playerID)??assert.fail("Player does not exist");
        player.ready = !player.ready;
    }



    /*
    Game State Checks
    */

    /**
     * starts the betting pase if all players are ready
     * @returns true iff all players are ready to enter the bettin phase
     */
    public checkBetting():boolean{
        for(const [ _ , info] of this.players){
            if(!info.ready){
                return false;
            }
        }
        return true;
    }
    
    /**
     * @returns return iff all hands are no longer in play
     * should be called when an iteration is complete
     */
    public checkForTermination():boolean{
        return this.hands.every(hand => !hand.inPlay);
    }
    
    /**
     * @returns The state of the current game WAITING, BETTING, DEALING, ACTING, REVEALING
     */
    public getGameState():gameState{
        return this.gameState;
    }

    public getHands():Array<hand>{
        return this.hands;
    }

    public getDealerHand():Array<Card>{
        return this.dealer;
    }

    
    /**
     * 
     * @returns A number representing the number of players
     */
    public getNumPlayers():number{
        return this.players.size;
    }

    public getPlayersInfo():Map<string, playerInfo>{
        return this.players;
    }

    /**
     * 
     * @returns gets the current players name/id 
     */
    public getCurrentPlayerName():string{
        return this.hands[this.selectionCounter].playerName;
    }


    public getCurrentHandIndex():number{
        return this.selectionCounter;
    }

    /*Betting Phase*/

    /**
     * Finalize player bets, for player with positive balance, set bet to min bet size, and subtract from player balance
     */
    public finalizePlayerBet(){
        for(const [_, info] of this.players){
            if(!info.currentBet && info.balance){
                info.currentBet = gameConstants.MIN_BETSIZE;
            }
            info.balance -= info.currentBet;
        }

    }
    
    /**
     * Called whenever player wants to add bet during the initial betting phase.
     * Function should not be called after betting phase
    */
    public setPlayerBet(playerID: string, betSize: number):void{
        const player = this.players.get(playerID)??assert.fail("Player does not exist");
        player.currentBet = Math.min(betSize, player.balance);
    }


    /*
    Dealing
    */


    /**
    * Init hands for all players with a positive current bet in game
    */
    public initHands(){
        for(const [playerName, info]  of this.players){
            if(info.currentBet){
                const newHand:hand = {
                playerName:playerName,
                cards: [],
                handValue: 0,
                betValue: info.currentBet,
                inPlay: true
                }
                this.hands.push(newHand);
            }
        }
        assert(this.hands.length, "No hands were initialized because no one was able to place a bet");
    }


    public dealInitCards():void{
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < this.hands.length; j++){
                this.givePlayerCard();
                this.incrementCounter();
            }
            this.giveDealerCard();
        }
        for(const hand of this.hands){
            hand.handValue = this.getHandValue(hand.cards);
            hand.inPlay = hand.handValue != 21;
        }
        assert(this.hands.length, "No hands were dealt because no one was able to place a bet");
    }

    /*
    Gives the current player a card
     */
    public givePlayerCard(){
        const newCard = this.deck.drawCard();
        this.hands[this.selectionCounter].cards.push(newCard);
    }


    /**
     * Gives the dealer a card
     */
    public giveDealerCard(){
        const newCard = this.deck.drawCard();
        this.dealer.push(newCard);
    }


    /**
     * Evaluates a given hand value
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


    /**
     * Gives card to dealer until dealer value is greater or equal to minimum
     */
    public dealerReveal(){
        while (this.getHandValue(this.dealer) < gameConstants.MIN_DEALER_VAL){
            this.giveDealerCard();
        }
    }

    /**
     * Increments the counter and loops back accordingly
     */
    public incrementCounter(){
        this.selectionCounter += 1;
        this.selectionCounter %= this.hands.length;
        while(!this.hands[this.selectionCounter].inPlay){
            this.selectionCounter += 1;
            this.selectionCounter %= this.hands.length;
            if(this.selectionCounter === 0 && this.checkForTermination()){
                this.gameState = "REVEALING";
                return
            }
        }
        if(this.checkForTermination()){
            this.gameState = "REVEALING";
            return;
        }
    }

    /** 
     * Performs the hit action on the current player
     * If the hand exceeds the limit or hits 21, the hand is no longer in play
     */
    public hitAction(){
        const hand = this.hands[this.selectionCounter];
        this.givePlayerCard();

        hand.handValue = this.getHandValue(hand.cards);
        if(hand.handValue >= 21){
            hand.inPlay = false;
        }
        this.incrementCounter();
    }

    /**
     * Performs the stand action on the current player
     *  Hand will no longer be in play
     */
    public standAction(){
        const hand = this.hands[this.selectionCounter];
        hand.inPlay = false;
        this.incrementCounter();
    }

    
    /**
     * Handles double down for the current player
     * Function can only be called in dealing phase
     * @throws error if player can not perform a double down with their current money
     */
    public doubleDownAction(playerName:string):void{
        const hand = this.hands.find(hand=>hand.playerName === playerName)??assert.fail("Player does not have a hand in play");
        const player = this.players.get(playerName)??assert.fail("Missing Player");
        if(hand.inPlay && player.balance >= hand.betValue){
            player.balance -= hand.betValue;
            hand.betValue += hand.betValue;
        }else{
            throw new Error("Insuifficient Balance")
        }
    }

    /**
     * Splits the hand at current index into two one card piles.
     * @Error if there are more than 2 cards in hand, or if the two card don't share the same value;
     */
    public playerSplitHand(){
        
        const hand = this.hands[this.selectionCounter];
        
        assert(hand.cards.length === 2 && hand.cards[0].getValue() === hand.cards[1].getValue(), "Cards do not have the same card value");

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




    /*REVEAL*/

    /**
     * Evaluates all current hand: 
     * updates the balance of players accordingly,
     * if player wins, double the hand's betval
     * if player ties, return the hand's betval
     * if player loses, gets nothing
     */
    public evaluateWinner():void{
        const dealerVal = this.getHandValue(this.dealer);  
        this.hands.forEach((hand)=>{
            const handVal = this.getHandValue(hand.cards);
            const player = this.players.get(hand.playerName)??assert.fail();
            if(dealerVal > 21){
                if(handVal <= 21){
                    player.balance += hand.betValue * 2;
                    this.handResult.push("W");
                }else this.handResult.push("L");
            }else{
                if(handVal <= 21){
                    if(handVal > dealerVal){
                        player.balance += hand.betValue * 2;
                        this.handResult.push("W");
                    }else if(handVal === dealerVal){
                        player.balance += hand.betValue;
                        this.handResult.push("T")
                    }else{
                        this.handResult.push("L");
                    }
                }else this.handResult.push("L");
            }
        })
    }

    public setGameState(state:gameState){
        this.gameState = state;
    }

    public winnerData(){
        
    }
}

export default GameRoom;