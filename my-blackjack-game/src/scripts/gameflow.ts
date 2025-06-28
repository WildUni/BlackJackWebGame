import { Deck } from "./deck";
import { Player } from "./player";
import { Card } from "./deck";

import assert from "assert";
type user = {
    id:number,
    name: string;
    chips: number;
}
type hand = {
    cards:Array<Card>,
    inPlay:boolean,
    assignedChips:number,
}
class Game{
    private readonly currentPlayers:Array<Player>;
    private readonly deck: Deck;
    private readonly dealer: Array<Card> = [];
    private gameTerminated = false;
    
    public constructor(players: Array<user>, numDecks:number){
        this.deck = new Deck(numDecks);
        this.currentPlayers = [];
        for(const {id, name, chips} of players){
            this.currentPlayers.push(new Player(id, name, chips));
        }
        this.distributeInitialCards();
        while (!this.gameTerminated){
            this.gameTerminated = this.playRound();
        }
        this.handleEndGame();
    }

    /**
     * 
     */
    private distributeInitialCards():void{
        for(let i = 0; i < 2; i++){
            for(const player of this.currentPlayers){
                const hands = player.getHands()
                if (!hands.length){
                    const newhand:hand = {cards:[], inPlay:true, assignedChips:this.askForBet()};
                    hands.push(newhand);
                }
                for(const {cards, inPlay, assignedChips} of hands){
                    cards.push(this.deck.drawCard());
                }
            }
            this.dealer.push(this.deck.drawCard());
        }  
    }
    
    //need to be fixed
    private playRound():boolean{
        for(const player of this.currentPlayers){
            const hands = player.getHands();
            let index = 0;
            while(index < hands.length){
                if(hands[index].inPlay){
                    const hand = hands[index];
                    if(hand.cards.length === 2 && hand.cards[0].getValue() === hand.cards[1].getValue()){
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
        return true;
    }
    private handleDuplicate(player: Player, index:number):boolean{
        const hands = player.getHands();
        const newHands:Array<hand> = [];
        for(const card of hands[index].cards){
            const newHand:hand= {
                cards:[card, this.deck.drawCard()],
                inPlay:true,
                assignedChips:hands[index].assignedChips 
            }
            newHands.push(newHand);
        }
        player.replaceDuplicate(newHands, index);
        return true;
    }
    private playHand(player: Player, index:number):void{
        const hand = player.getHands()[index];
        if(hand.cards.length === 2 && hand.cards[0].getValue() === hand.cards[1].getValue()){
            //need interactivity
        }
    }
    
    private dealerReveals():void{
        while (this.getHandValue(this.dealer) < 17){
            this.dealer.push(this.deck.drawCard());
        }
    }

    private handleEndGame():void{
        this.dealerReveals();
        const dealerValue = this.getHandValue(this.dealer);
        for(const player of this.currentPlayers){
            if (dealerValue <= 21){
                for(const {cards, inPlay, assignedChips} of player.getHands()){
                    const playerHandVal = this.getHandValue(cards)
                    if(playerHandVal <= 21){
                        if(playerHandVal > dealerValue){
                            player.updateChipCount(2 * assignedChips)
                        }else if(playerHandVal === dealerValue){
                            player.updateChipCount(assignedChips);   
                        }
                    }
                }
            }
        }
    }

    private getHandValue(hand:Array<Card>):number{
        let value = 0;
        let aces = 0;
        for (const card of hand) {
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

    public askForBet():number{
        //todo need to ask for bet
        return 0
    }
}