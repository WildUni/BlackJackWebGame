import { Card } from './deck.ts';

export class Player { 
    private hand: Card[] = [];
    private chips: number;
    private currBet:number = 0;

    constructor(initialChips: number = 1000) {
        this.chips = initialChips;
    }

    addCard(card: Card): void {
        this.hand.push(card);
    }

    getHand(): Card[] {
        return [...this.hand];
    }

    getHandValue(): number {
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

    hasBlackjack(): boolean {
        return this.hand.length === 2 && this.getHandValue() === 21;
    }

    isBusted(): boolean {
        return this.getHandValue() > 21;
    }

    clearHand(): void {
        this.hand = [];
    }


}