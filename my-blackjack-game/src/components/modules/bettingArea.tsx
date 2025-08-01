import React from "react";

const BettingArea = (props:{playerID: string, handID: number, owns: boolean, gameState: string}) => {
    return(
        <div className='betting-area'>
          <div className='bet-info'>
            <span className='bet-label'>Your Bet:</span>
            <span className='bet-amount'>$100</span>
          </div>
          <div className='chip-controls'>
            <button className='chip-btn'>$5</button>
            <button className='chip-btn'>$25</button>
            <button className='chip-btn'>$50</button>
            <button className='chip-btn'>$100</button>
          </div>
        </div>
    )
}
export default BettingArea;