import assert from 'assert';

const NON_NUMERIC = new Set(["J", "Q", "K", "A"]);
const SUITS = ["d", "h", "s", "c"];
const NUMERIC = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export class Card{
    private readonly suit: string;
    private readonly value: string;
    private readonly numValue: number;
    public constructor(suit: string, value: string){
        this.suit = suit;
        this.value  = value;
        if(NON_NUMERIC.has(value)){
            if(value === "A"){
                this.numValue = 1;
            }
            else{
                this.numValue = 10;
            }
        }else{
            this.numValue = (Number(value));
        }
    }

    public getSuit():string{
        return this.suit;
    }
    public getValue():string{
        return this.value;
    }
    public getNumericValue():number{
        return this.numValue;
    }
}

export class Deck{
    private readonly cardDeck:Array<Card> = [];
    public constructor(numOfDecks:number){
        for(let i = 0; i < numOfDecks; i++){
            for(const suit of SUITS){
                for(const val of NUMERIC){
                    this.cardDeck.push(new Card(suit, val))
                }
            }
        }
        this.shuffleDeck();
    }

    public shuffleDeck():void{
        for(let i = 0; i < this.cardDeck.length; i++){
            const j = Math.floor(Math.random() * this.cardDeck.length);
            [this.cardDeck[i], this.cardDeck[j]] = [this.cardDeck[j], this.cardDeck[i]];
        }
    }

    public drawCard():Card{
        return this.cardDeck.pop()??assert.fail("Empty Deck");
    }
}