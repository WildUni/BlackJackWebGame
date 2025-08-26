import { PlayerProvider, usePlayer } from '../player-context'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../modules/style.css'
import Header from '../modules/header'
import Table from '../modules/table'
import {type displayData, type displayPlayer, type displayHand, type gameState} from '../../scripts/utils'
import { useGameSocket } from '../client-socket'


const Game = () => {
  //use for redirecting
  const nav = useNavigate();
  
  //importing sockets, handles joining, and leaving room, turns socket listener off when leaving
  const {joinRoom, setUpGameListener, leaveRoom} = useGameSocket();
  
  //stores current display data
  const [data, setDisplayData] = useState<displayData | null>(null);

  //breaking down display data
  const [players, setPlayers] = useState<Array<displayPlayer>>([]);
  const [hands, setHands] = useState<Array<displayHand>>([]);
  const [gameState, setGameState] = useState<gameState>("WAITING");
  const [handIdx, setHandIdx] = useState(0);
  const {roomId} = useParams<{roomId: string}>(); // Get the roomId from the route

  //global vars for getting current player name, as well as updating balance stored locally
  const {playerName, setBalance} = usePlayer();


  //if we can't get a roomid, we re direct user back to home
  useEffect(()=>{
    if(!roomId){
      nav("/Home");
      alert("Join room Failed")
    }else{
      //sets up gamestate listener
      joinRoom(roomId);                           
      setUpGameListener(setDisplayData);
      return () => {
        //this will close the game listener
        leaveRoom(roomId);
      }
    }
  },[roomId]);

  //whenever data is updated, we update the parameters
  useEffect(()=>{
    if(data){
      const {players, hands, handIndex, gameState}= data;
      setPlayers(players);
      setHands(hands);
      setHandIdx(handIndex)
      setGameState(gameState)
      setBalance(players.find((player)=> playerName === player.playerName)?.balance || 100)
    }
  }, [data])

  //if not game room, we can display a waiting message, else we display the game room
  if(data && roomId){
    let numPlayersReady = 0;
    let isThisPlayerReady = false;
    const numPlayers = players.length;
    if(gameState === "WAITING"){
    //generating display information for waiting phase
      players.forEach(player=>{
        if(player.ready){
          numPlayersReady ++;
          if(player.playerName === playerName) isThisPlayerReady = true;
        }
      })
    }
    
    return(
      <div>
        <Header roomID={roomId} />
        <Table 
          data = {data} 
          roomId={roomId}
        />
      </div>
    )}
}

export default Game