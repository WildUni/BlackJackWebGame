import { isUint8ClampedArray } from "util/types";
import {Card, Deck } from "./deck";
//CONSTANTS
const MAX_PLAYERS = 3;
const MAX_HANDS_PER_PLAYER = 3;

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
    
    private readonly players:Array<playerInfo> = [];
    private dealer: Array<Card> = [];
    private hands: Array<hand> = [];
    private deck = new Deck(4);
    private gameState = "WAITING";
    private selectionCounter = 0;

    public constructor(){
    }
    
    public startBettingPhase(){
        this.gameState = "BETTING";
        for(const player of this.players){
            const newHand:hand = {
                playerName:player.playerName,
                cards: [],
                handValue: 0,
                betValue: 0,
                inPlay: true
            }
            this.hands.push(newHand);
        }
    }

    public givePlayerCard(){
        const newCard = this.deck.drawCard();
        this.hands[this.selectionCounter].cards.push(newCard);
        this.incrementCounter();
    }


    /**
     * Splits the hand at current index into two one card piles. For 
     * future animation purpose, we need to distribute the cards by calling 
     * give player cards, then reverse the counter
     */
    public playerSplitHand(){
        const newHands = [];
        const {playerName, cards, betValue} = this.hands[this.selectionCounter];
        for(const card of cards){
            const newHand:hand = {
                playerName:playerName,
                cards:[card],
                handValue:card.getNumericValue(),
                betValue:betValue,
                inPlay: true
            };
            newHands.push(newHand)
        }

        this.hands.splice(this.selectionCounter, 1, newHands[0], newHands[1]);
    }



    public giveDealerCard(){
        const newCard = this.deck.drawCard();
        this.dealer.push(newCard);
    }


    public incrementCounter(){
        this.selectionCounter += 1;
        this.selectionCounter %= this.hands.length;
    }

    /**
     * @returns retur iff all hands are no longer in play
     */
    public checkForTermination(){
        for(const hand of this.hands){
            if(hand.inPlay)return false;
        }
        return true;
    }


}