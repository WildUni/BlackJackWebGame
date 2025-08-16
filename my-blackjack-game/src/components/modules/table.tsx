import React from 'react'
import './style.css'
import DealerSection from './DealerSection';
import PlayerSection from './PlayerSection';
import PlayerControls from './playerControls';

const Table = (props:{hands:Array<{playerName:string, handValue:number, betValue:number, selected:boolean, owns:boolean,}>}) => {
  const {hands} = props;
  return (
    <div className='table'>
      <div className='table-container'>
        {/* Dealer Section */}
        {/*<DealerSection hands = {hands}></DealerSection>*/}

        {/* Players Section */}
        <PlayerSection playerID = {"dummy"} hands ={hands}></PlayerSection>

        {/* Game Controls - Only show for current player */}
        <PlayerControls playerID='DUMMY' handID={100} owns={true} gameState='BETTING'></PlayerControls>
      </div>
    </div>
  )


  return (
    <div className='table'>
      <div className='table-container'>
        {/* Dealer Section */}
        <div className='dealer-section'>
          <div className='dealer-info'>
            <h3 className='dealer-label'>Dealer</h3>
            <div className='dealer-score'>Score: ?</div>
          </div>
          <div className='dealer-cards'>
            <div className='card-placeholder'>🂠</div>
            <div className='card-placeholder'>🂠</div>
          </div>
        </div>

        {/* Players Section */}
        <div className='players-section'>
          {/* Player 1 */}
          <div className='player-seat other-player current-player'>
            <div className='player-cards'>
              <div className='card-placeholder'>🂠</div>
              <div className='card-placeholder'>🂠</div>
            </div>
            <div className='player-info'>
              <div className='player-name'>Player 1</div>
              <div className='player-score'>Score: 19</div>
              <div className='player-bet'>Bet: $50</div>
            </div>
          </div>

          {/* Player 2 (You) */}
          <div className='player-seat current-player'>
            <div className='player-cards'>
              <div className='card-placeholder'>🂠</div>
              <div className='card-placeholder'>🂠</div>
            </div>
            <div className='player-info'>
              <div className='player-name'>You</div>
              <div className='player-score'>Score: 16</div>
              <div className='player-bet'>Bet: $100</div>
            </div>
          </div>

          {/* Player 3 */}
          <div className='player-seat'>
            <div className='player-cards'>
              <div className='card-placeholder'>🂠</div>
              <div className='card-placeholder'>🂠</div>
            </div>
            <div className='player-info'>
              <div className='player-name'>Player 3</div>
              <div className='player-score'>Score: 21</div>
              <div className='player-bet'>Bet: $25</div>
            </div>
          </div>

          {/* Empty Seat */}
          <div className='player-seat empty-seat'>
            <div className='empty-seat-content'>
              <div className='join-btn'>Join Game</div>
            </div>
          </div>
        </div>

        {/* Game Status */}
        <div className='game-status'>
          <div className='status-message'>
            Your turn - Hit or Stand?
          </div>
          <div className='turn-indicator'>
            Player 2's Turn
          </div>
        </div>

        {/* Game Controls - Only show for current player */}
        <div className='game-controls'>
          <button className='game-btn hit-btn'>Hit</button>
          <button className='game-btn stand-btn'>Stand</button>
          <button className='game-btn split-btn'>Split</button>
        </div>

        {/* Betting Area */}
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
      </div>
    </div>
  )
}

export default Table