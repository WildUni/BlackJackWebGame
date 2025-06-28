import { Card } from './deck.ts';

export class Player { 
    private chips: number;
    public readonly playerID:number;
    public readonly playerName:string;

    public constructor(playerID:number, playerName: string, initialChips: number = 1000) {
        this.chips = initialChips;
        this.playerID = playerID;
        this.playerName = playerName;
    }

    public addCard(card: Card): void {
        this.hand.push(card);
    }

    public getHand(): Card[] {
        return [...this.hand];
    }

    public getHandValue(): number {
        let value = 0;
        let aces = 0;

        for (const card of this.hand) {
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

    public hasBlackjack(): boolean {
        return this.hand.length === 2 && this.getHandValue() === 21;
    }

    public isBusted(): boolean {
        return this.getHandValue() > 21;
    }

    public clearHand(): void {
        this.hand = [];
    }
    
    public bet(amount:number):number{
        if(amount > this.chips){
            this.chips = 0;
            return this.chips;
        }
        else{
            this.chips -= amount;
            return amount;
        }
    }

}