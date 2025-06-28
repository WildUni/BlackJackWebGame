import { Card } from './deck.ts';

export class Player { 
    private hand: Card[][] = [];
    private inPlay: boolean[] = [false, false, false, false];
    private chips: number;
    private currBet:number = 0;

    constructor(initialChips: number = 1000) {
        this.chips = initialChips;
    }

    addCard(card: Card, handIndex: number): void {
        if (this.hand[handIndex]) {
            this.hand[handIndex].push(card);
        } else {
            this.hand.push([card]);
        }
    }

    getHand(): Card[][] {
        return this.hand;
    }

    getHandValue(handIndex: number): number {
        let value = 0;
        let aces = 0;

        for (const Deck of this.hand[handIndex]) {
            const cardValue = Deck.getNumericValue();
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

    hasBlackjack(handIndex: number): boolean {
        return this.hand[handIndex].length === 2 && this.getHandValue(handIndex) === 21;
    }

    isBusted(handIndex: number): boolean {
        return this.getHandValue(handIndex) > 21;
    }

    clearHand(): void {
        this.hand = [];
    }

    insertHand(hand: Card[], index: number): void {
        this.hand.splice(index, 0, hand);
    }

    deleteHand(index: number): void {
        this.hand.splice(index, 1);
    }


    updateInPlay(index: number, status: boolean): void {
        this.inPlay[index] = status;
    }
}