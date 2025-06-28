import { Deck } from "./deck";
import { Player } from "./player";
import { Card } from "./deck";
import assert from "assert";

type userInfo = {
    id:number,
    name: string;
    chips: number;
}

type hand = {
    cards: Array<Card>,
    inPlay: boolean
}

class Game{
    private readonly currentPlayers:Array<Player>;
    private readonly deck: Deck;
    private readonly dealer: Array<Card> = [];
    private gameTerminated = false;
    
    public constructor(players: Array<userInfo>, numDecks:number){
        this.deck = new Deck(numDecks);
        this.currentPlayers = [];
        for(const {id, name, chips} of players){
            this.currentPlayers.push(new Player(id, name, chips));
        }
        this.distributeInitialCards();
        while (!this.gameTerminated){
            this.playRound();
        }
    }

    /**
     * 
     */
    private distributeInitialCards():void{
        for(let i = 0; i < 2; i++){
            for(const player of this.currentPlayers){
                for(const hand of player.getHand()){
                    hand.push(this.deck.drawCard());
                }
            }
            this.dealer.push(this.deck.drawCard());
        }  
    }
    
    private playRound():void{
        for(const player of this.currentPlayers){
            const hands = player.getHand();
            let index = 0;
            while(index < hands.length){
                if(player.handInPlay(index)){
                    const hand = hands[index];
                    if(hand.length === 2 && hand[0].getValue() === hand[1].getValue()){
                        if(this.handleDuplicate(player, index)){
                            index ++;
                        }
                    }else{
                        this.playHand(player, index);
                        index ++;
                    }
                }
            } 
        }
    }
    private handleDuplicate(player: Player, index:number):boolean{
        const hand = player.getHand();
        const newHands = [];
        for(const card of hand[index]){
            newHands.push([card, this.deck.drawCard()]);
        }
        player.insertHands(newHands, index);
        return true;
    }
    private playHand(player: Player, index:number):void{
        const hand = player.getHand()[index];
        if(hand.length === 2 && hand[0].getValue() === hand[1].getValue()){
            //need interactivity
        }
    }

}