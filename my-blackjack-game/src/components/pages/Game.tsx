import { usePlayer } from '../player-context'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../modules/style.css'
import Header from '../modules/header'
import Table from '../modules/table'
import type {displayData} from '../../scripts/utils'
import { useGameSocket } from '../client-socket'


const Game = () => {
    const nav = useNavigate();
    const {joinRoom, setUpGameListener, leaveRoom, updateReadyStatus} = useGameSocket();
    const [data, setDisplayData] = useState<displayData | null>(null);
    const { roomId } = useParams<{roomId: string}>(); // Get the roomId from the route
    const {playerName} = usePlayer();

    //if we can't get a roomid, we re direct user back to home
    useEffect(()=>{
        if(!roomId){
          nav("/Home");
          alert("Join room Failed")
        }else{
          joinRoom(roomId);                           
          setUpGameListener(setDisplayData);
          return () => {
            leaveRoom(roomId);
          }
        }
      },[roomId]);

    //if not game room, we can display a waiting message, else we display the game room
    if(data){
        console.log(data["players"]);
        const {players, hands, roomId, handIndex}= data;
        let gameState = data.gameState;
        let numPlayersReady = 0;
        let isThisPlayerReady = false;
        let numPlayers = players? players.length: 1;
        players.forEach(player=>{
          if(player.ready){
            numPlayersReady +=1};
            if(player.playerName === playerName) isThisPlayerReady = true;
        })
      return (
        <div>
          <Header roomID={roomId} />
          <Table 
            data = {data} 
            roomId={roomId}
          />
          {/* Game Info Panel */}
          <div className='fixed top-24 right-4 bg-slate-800/90 text-white p-4 rounded-lg text-sm max-w-xs backdrop-blur-sm border border-slate-600/50'>
            <div className='font-bold mb-2 text-yellow-400'>Game Status</div>
            <div className='space-y-1'>
              <div>Phase: <span className='text-green-400'>{gameState}</span></div>
              <div>Players: <span className='text-blue-400'>{numPlayers}</span></div>
              <div>Your Balance: <span className='text-yellow-400'>${players.find(player => player.playerName === playerName)?.balance || 0}</span></div>
              {gameState === "DEALING" && (
                <div>Turn: <span className='text-purple-400'>{hands[handIndex].playerName}</span></div>
              )}
              {gameState === "WAITING" && (
                <div>
                  Ready: <span className={players.every(player=>player.ready) ? 'text-green-400' : 'text-red-400'}>
                    {numPlayersReady}/{numPlayers}
                  </span>
                </div>
              )}
            </div>
            

            {/* Player List */}
            <div className='mt-3 border-t border-slate-600 pt-2'>
              <div className='font-medium mb-1 text-slate-300'>Players:</div>
              {Array.from(players.values()).map(player => (
                <div key={player.playerName} className='flex justify-between text-xs'>
                  <span className={player.ready ? 'text-green-400' : 'text-slate-400'}>
                    {player.playerName} {player.ready && '✓'}
                  </span>
                  <span className='text-yellow-400'>${player.balance}</span>
                </div>
              ))}
            </div>
            
            {/* Ready status indicator */}
            {gameState === "WAITING" && (
              <div className='mt-3 border-t border-slate-600 pt-2'>
                {numPlayersReady === players.length? (
                  <div className='text-green-400 text-center text-xs font-bold animate-pulse'>
                    Starting Game...
                  </div>
                ) : (
                  <div className='text-slate-400 text-center text-xs'>
                    Waiting for all players to ready up
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Debug Panel - Mobile Responsive */}
          <div className='fixed bottom-2 md:bottom-4 left-2 md:left-4 bg-slate-800/90 text-white p-2 md:p-4 rounded-lg text-xs max-w-[200px] md:max-w-sm backdrop-blur-sm border border-slate-600/50 z-50'>
            <div className='font-bold mb-1 md:mb-2 text-red-400'>Debug Controls</div>
            <div className='grid grid-cols-2 gap-1 md:gap-2'>
              <button 
                onClick={() => gameState = "WAITING"}
                className='px-1 md:px-2 py-1 bg-slate-600 hover:bg-slate-700 rounded text-xs'
              >
                Waiting
              </button>
              <button 
                onClick={() => gameState = "BETTING"}
                className='px-1 md:px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs'
              >
                Betting
              </button>
              <button 
                onClick={() => gameState = "DEALING"}
                className='px-1 md:px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs'
              >
                Dealing
              </button>
              <button 
                onClick={() => gameState = "ACTING"}
                className='px-1 md:px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs'
              >
                Acting
              </button>
              <button 
                onClick={() => gameState = "REVEALING"}
                className='px-1 md:px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs'
              >
                Revealing
              </button>
              
              <button 
                onClick={() => updateReadyStatus(roomId)}
                className={`px-1 md:px-2 py-1 rounded text-xs col-span-2 ${
                  isThisPlayerReady 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isThisPlayerReady ? 'Unready' : 'Ready Up'}
              </button>
            </div>
          </div>
        </div>
      )
    }else{
      console.log(data);
      return <></>;
    }
}

export default Game