import { Card } from "./deck";


export const gameConstants = {
    MAX_PLAYER_COUNT: 3,
    MAX_PLAYER_HANDS: 3,
    MAX_WAIT_TIME: 10000,
    NUM_DECKS: 2, 
    MIN_BETSIZE: 1, 
    MIN_DEALER_VAL: 17,
    BETTING_TIMER:5000,
    DEALING_TIMER:5000,
    ACTING_TIMER:5000,
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

export type displayData = {
    players:Array<{playerName:string, balance:number, ready:boolean, currentBet:number}>,
    hands:Array<{playerName:string, cards:Array<string>, handValue:number, betValue:number}>,
    dealerHand:Array<string>,
    gameState:gameState,
    handIndex:number,
    roomId:string,
    winningHandIndex:Array<number>
    
}