import React from 'react'
import ReactDOM from 'react-dom/client'
import '../modules/style.css'
import Header from '../modules/header'
import Table from '../modules/table'


// import Table from './components/Table' 
// import Hand from './components/Hand'

// For now, let's create simple placeholder components

// Remove the misplaced interface and fix the props

// Accept props in the Game component
const Game = (props:{playerID: string, roomID:string}) => {
  //Player will need to click on ready in the game room:

  //Different game states:
  /*
    WAIT: Waiting for players ready up: Only displays player name, icon, your own balance
    BET: Players make their bets to the server: Same as waits, also displays betting area
    DIST: Dealer Distributes cards. Goes around once asking for action, allow double down. Shows Dealer Area, and Player Area, dismount betting area and player icon
    ACT: Only display the control area if selected card is yours: check using playerName associated with hand
    REVEAL: Dealer reveals. No play actions avaiblable
    WIN: Decide the winners. Add the coins, and return to WAIT state.
  */



  //procedure:
  //given code and player id: 
  //load waiting message until game starts
  //does update room with current players

  //
  
  //this is where the player sockets will be set up
  const dummyGame = {
    roomID: "777",
    playerID: "dummy",
    hands:[{playerName:"dummy", handValue:10, betValue:10, selected:true, owns:true}, 
          {playerName:"other", handValue:9, betValue:9, selected:false, owns:false},
          {playerName:"other2", handValue:100, betValue:100, selected:false, owns:false},
        {playerName:"other3", handValue:9, betValue:9, selected:false, owns:false}]
  }

  


  return (
    <div>
      <Header roomID={dummyGame.roomID}/>
      <Table hands={dummyGame.hands}/>
    </div>
  )
}

export default Game