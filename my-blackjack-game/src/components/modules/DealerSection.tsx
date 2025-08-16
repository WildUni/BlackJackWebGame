import React from "react";
import { useState } from "react";
import Hand from "./playerHand";
import "./style.css"

const DealerSection = (props:{hands:Array<{playerName:string, selected:boolean, owns:boolean, handValue:number, betValue:number}>, }) =>{
    //to be optimized to use useState for smaller updates
    //current codes requires all hands to be broadcasted

    //TODO need to be fixed to reflect dealer hand
    const {hands} = props;
    return (
        <div className="dealer-section">
            {
            hands.map((hand, index)=>
                (<Hand key = {index} 
                playerName={hand.playerName} 
                selected= {hand.selected} 
                owns={hand.owns} 
                handValue={hand.handValue} 
                betValue={hand.betValue}></Hand>))}
        </div>
    )
    
    
}
export default DealerSection;