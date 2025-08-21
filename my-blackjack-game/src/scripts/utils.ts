import { Card } from "./deck"
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