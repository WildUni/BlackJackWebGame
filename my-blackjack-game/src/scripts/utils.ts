import { Card } from "./deck";


export const gameConstants = {
    MAX_PLAYER_COUNT: 3,
    MAX_PLAYER_HANDS: 3,
    MAX_WAIT_TIME: 10000,
    NUM_DECKS: 2, 
    MIN_BETSIZE: 1, 
    MIN_DEALER_VAL: 17

}

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
    socket:string, 
    ready:boolean
}