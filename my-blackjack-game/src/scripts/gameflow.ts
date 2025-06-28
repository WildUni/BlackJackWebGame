import { Deck } from "./deck";
import { Player } from "./player";
import { Card } from "./deck";
import assert from "assert";

type Hand = {
    inPlay: boolean, 
    cards: Array<Card>}
    ;

class Game{
    private readonly playerHands: Map<number, Array<Hand>>;
    private readonly gameDeck: Deck;
    private readonly dealer: Array<Card> = [];
    
    public constructor(players: Array<Player>, numDecks:number){
        this.gameDeck = new Deck(numDecks);
        this.playerHands = new Map();
        players.forEach((player)=>{
            //need to aask for bet too here
            this.playerHands.set(player.playerID, []);
        })
        this.distributeInitialCards();
        
        
    }

    /**
     * 
     */
    private distributeInitialCards():void{
        for(const [ _ , hands] of this.playerHands){
            hands.push({inPlay: true,
                        cards: [this.gameDeck.drawCard()]});
        }
        this.dealer.push(this.gameDeck.drawCard());
        for(const [ playerID, hands] of this.playerHands){
            for(const hand of hands){
                hand.cards.push(this.gameDeck.drawCard());
                if (this.checkDouble(hand)){
                    this.handleDouble(playerID, hand);
                }
            }
        }
    }

    private checkDouble(hand:Hand):boolean{
        return hand.cards[0].getValue() === hand.cards[1].getValue();
    }

    private handleDouble(playerID:number, currHand:Hand){
        //need to ask player for split
        const response = true;
        if(response){
            const hands = this.playerHands.get(playerID);
            const index = hands?.indexOf(currHand) ?? assert.fail();;
            const newHands: Array<Hand> = [];
            for(const card of currHand.cards){
                newHands.push({
                    inPlay: true,
                    cards:[card, this.gameDeck.drawCard()]
                });
            }
            hands?.splice(index, 1, ...newHands);
        }
    }


}