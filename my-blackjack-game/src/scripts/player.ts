import { Card } from './deck.ts';


type hand = {
    cards:Array<Card>,
    inPlay:boolean,
    assignedChips:number,
}
export class Player { 
    private hand: Array<hand> = [];
    private chips: number;
    public readonly playerId;
    public readonly playerName;

    constructor(playerId:number, name: string, initialChips: number = 1000) {
        this.chips = initialChips;
        this.playerId = playerId;
        this.playerName = name;
    }

    public getHands(): Array<hand>{
        return this.hand;
    }

    public clearHand(): void {
        this.hand = [];
    }

    public replaceDuplicate(hands: Array<hand>, index: number): void {
        this.hand.splice(index, 1, ...hands);
    }

    public updateChipCount(change:number){
        this.chips += change;
    }
}