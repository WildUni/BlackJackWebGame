import { Card } from "./deck";


export const gameConstants = {
    MAX_PLAYER_COUNT: 3,
    MAX_PLAYER_HANDS: 3,
    MAX_WAIT_TIME: 10000,
    NUM_DECKS: 2, 
    MIN_BETSIZE: 1, 
    MIN_DEALER_VAL: 17,
    BETTING_TIMER:10000,
    DEALING_TIMER:5000,
    ACTING_TIMER:10000,
    REVEALING_TIMER:5000
}

export type gameState = "WAITING" | "BETTING" | "DEALING" | "ACTING"| "REVEALING";
export type hand = {
    playerName:string,
    cards:Array<Card>,
    handValue:number,
    betValue:number,
    inPlay:boolean
}

export type playerInfo = {
    playerName:string, 
    balance: number, 
    currentBet: number,
    socket:string, 
    ready:boolean,
}


export type displayPlayer = {playerName:string, balance:number, ready:boolean, currentBet:number}
export type displayHand = {playerName:string, cards:Array<string>, handValue:number, betValue:number}

export type displayData = {
    players:Array<displayPlayer>,
    hands:Array<displayHand>,
    dealerHand:Array<string>,
    gameState:gameState,
    handIndex:number,
    roomId:string,
    handResult:Array<"W" | "T" | "L">
    
}
