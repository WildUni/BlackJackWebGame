import { usePlayer } from '../player-context'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../modules/style.css'
import Header from '../modules/header'
import Table from '../modules/table'
import type { displayData } from '../../scripts/utils'
import { useGameSocket } from '../client-socket'


const Game = () => {
  //use for redirecting
  const nav = useNavigate();
  
  //importing sockets, handles joining, and leaving room, turns socket listener off when leaving
  const {joinRoom, setUpGameListener, leaveRoom, listenForSocketError} = useGameSocket();
  
  //stores current display data
  const [data, setDisplayData] = useState<displayData | null>(null);

  const {roomId} = useParams<{roomId: string}>(); // Get the roomId from the route

  //global vars for getting current player name, as well as updating balance stored locally
  const {playerName, setBalance} = usePlayer();


  //if we can't get a roomid, we re direct user back to home
  useEffect(()=>{
    listenForSocketError();
    
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
      const {players}= data;
      setBalance(players.find((player)=> playerName === player.playerName)?.balance || 0)
    }
  }, [data])

  //if not game room, we can display a waiting message, else we display the game room
  if(data && roomId){
    const numPlayers = data.players.length;
    return(
      <div>
        <Header roomID={roomId} numPlayers={numPlayers}/>
        <Table 
          data = {data} 
          roomId={roomId}
        />
      </div>
    )}
}

export default Game