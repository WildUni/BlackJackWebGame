import DealerSection from './DealerSection'
import PlayerSection from './PlayerSection'
import PlayerControls from './playerControls'
import type { displayData } from '../../scripts/utils'
import { usePlayer } from '../player-context'
import { useGameSocket } from '../client-socket'
import PlayerInfoBox from './PlayerInfo'
import BettingArea from './bettingArea'
import { DoubleButton } from './playerControls'
import Timer from './Timer'

const Table = (props: { data: displayData, roomId: string }) => {
  // Extract data from props
  const { players, hands, gameState, dealerHand, handIndex, handResult } = props.data;
  const roomId = props.roomId;
  const { playerName, balance } = usePlayer();
  const { updateReadyStatus } = useGameSocket();
  
  // Calculate ready status
  let isThisPlayerReady = false;
  let numPlayersReady = 0;
  players.forEach(player => {
    if (player.ready) {
      numPlayersReady++;
      if (player.playerName === playerName) {
        isThisPlayerReady = true; 
      }
    }
  });

  const handInPlay = hands[handIndex];

  const renderWaitingRoom = () => (
    <>
      {/* Player Info Boxes */}
      <div className='flex w-full justify-around'>
        {players.map((player, index) => (
          <PlayerInfoBox 
            key={index} 
            playerName={player.playerName} 
            balance={player.balance} 
            isPlayerReady={player.ready} 
            currentBet={player.currentBet} 
            gameState={gameState} 
          />
        ))}
      </div>
      
      {/* Ready Controls */}
      <div className='flex-shrink-0 mb-2 px-4'>
        <div className='flex flex-col items-center gap-3 md:gap-4'>
          {/* Ready Status Summary */}
          <div className='bg-slate-700/50 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg border border-slate-600/50'>
            <div className='text-center'>
              <div className='text-white font-medium text-sm md:text-base'>
                {numPlayersReady} / {players?.length || 0} Players Ready
              </div>
            </div>
          </div>
          
          {/* Ready Button */}
          <button
            onClick={() => updateReadyStatus(roomId)}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
              isThisPlayerReady
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            }`}
          >
            {isThisPlayerReady ? '✓ Ready!' : 'Ready Up'}
          </button>

          {/* Status Message - Fixed logic */}
          {numPlayersReady === players.length && players.length > 0 && (
            <div className='text-green-400 font-bold animate-pulse text-sm md:text-base'>
              🎮 Starting game...
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderGameTable = (showWinners = false) => (
    <>
      {/* Dealer Section */}
      <div className='flex-shrink-0 mt-2 md:mt-4'>
        <DealerSection dealerHand={dealerHand} />
      </div>

      {/* Players Section */}
      <div className='flex-1 flex items-center justify-center w-full min-h-0 px-2'>
        <PlayerSection 
          players={players} 
          hands={hands} 
          handIndex={handIndex}
          gameState={gameState}
          handResult={handResult}
          
        />
      </div>
    </>
  );
  
  const renderBetting = () => (
    <>
      <Timer gameState={gameState} />
      <div className='flex w-full justify-around'>
        {players.map((player, index) => (
          <PlayerInfoBox 
            key={index} 
            playerName={player.playerName} 
            balance={player.balance} 
            isPlayerReady={player.ready} 
            currentBet={player.currentBet} 
            gameState={gameState} 
          />
        ))}
      </div>

      <div className="w-full flex justify-center px-2">
        <BettingArea
          gameState={gameState}
          roomId={roomId}
          Balance={balance}
        />
      </div>
    </>
  );

  const renderDealing = () => (
    <>
      {renderGameTable()}
      <Timer gameState={gameState} />
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-wrap justify-center items-center w-full px-2">
        <div className="flex gap-2 md:gap-3">
          <DoubleButton
            gameState={gameState}
            playerName={playerName}
            roomId={roomId}
          />
        </div>
      </div>
    </>
  );

  const renderActing = () => (
    <>
      {renderGameTable()}
      <Timer gameState={gameState} />
      {/* Game Controls */}
      <div className='flex-shrink-0 mb-2 px-4'>
        <PlayerControls 
          playerName={playerName} 
          gameState={gameState}
          roomId={roomId}
        />
      </div>
    </>
  );

  const renderRevealing = () => {
    // Count wins, losses, and ties
    const wins = handResult?.filter(result => result === "W").length || 0;
    const ties = handResult?.filter(result => result === "T").length || 0;
    const losses = handResult?.filter(result => result === "L").length || 0;

    return (
      <>
      
        {renderGameTable( true )}
        <div className="mt-4 flex flex-col items-center">
          <span className="text-lg font-bold text-white">
            Game Ended
          </span>
          
          {wins > 0 && (
            <div className='text-green-400 font-bold text-sm md:text-base mt-2'>
              {wins} Player{wins > 1 ? 's' : ''} Won!
            </div>
          )}
          
          {ties > 0 && (
            <div className='text-yellow-400 font-bold text-sm md:text-base mt-2'>
              {ties} Tie{ties > 1 ? 's' : ''}!
            </div>
          )}
          
          {losses > 0 && wins === 0 && ties === 0 && (
            <div className='text-red-400 font-bold text-sm md:text-base mt-2'>
              Dealer Wins All Hands!
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className='flex justify-center items-center min-h-screen w-screen p-2 md:p-0 m-0 bg-gradient-to-br from-slate-900 to-slate-800 fixed top-0 left-0 z-[1]'>
      <div className='bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl md:rounded-3xl w-full md:w-[90vw] h-[calc(100vh-1rem)] md:h-[80vh] max-w-[1200px] max-h-[800px] flex flex-col items-center py-3 md:py-6 px-3 md:px-6 relative shadow-xl mt-16 md:mt-20 gap-4 md:gap-8'>
        {(() => {
          console.log("Game State:", gameState);
          switch (gameState) {
            case "WAITING":
              return renderWaitingRoom();
            case "BETTING":
              return renderBetting();
            case "DEALING":
              return renderDealing();
            case "ACTING":
              return renderActing();
            case "REVEALING":
              return renderRevealing();
            default:
              return renderWaitingRoom(); // Fallback case
          }
        })()}
      </div>
    </div>
  );
};

export default Table;