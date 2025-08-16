import React from "react";
import "./playerHand.css";
const Hand = (props: {playerName: string, selected: boolean, owns:boolean, handValue:number, betValue:number}) =>{
    const {playerName, selected, owns, handValue, betValue} = props;
    let typeOfSeat:string = "player-seat";
    if(! owns){
        typeOfSeat += " other-player";
    }
    if(selected){
        typeOfSeat += " current-player";
    }

    return(
        <div className={typeOfSeat}>
            <div className='player-cards'>
            <div className='card-placeholder'>🂠</div>
            <div className='card-placeholder'>🂠</div>
            </div>
            <div className='player-info'>
            <div className='player-name'>{playerName}</div>
            <div className='player-score'>Score: {handValue}</div>
            <div className='player-bet'>Bet: ${betValue}</div>
            </div>
        </div>
    )

}

export default Hand;