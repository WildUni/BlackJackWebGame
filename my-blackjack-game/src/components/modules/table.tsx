import React from 'react'
import DealerSection from './DealerSection'
import PlayerSection from './PlayerSection'
import PlayerControls from './playerControls'

const Table = (props: {
  hands: Array<{
    playerName: string
    handValue: number
    betValue: number
    selected: boolean
    owns: boolean
  }>
  gameState: "WAITING" | "BETTING" | "CIRCULATING" | "REVEAL"
  playerName: string
  owns: boolean
  onPlayerReady?: () => void
  isPlayerReady?: boolean
  allReady?: boolean
  players?: Array<{
    playerName: string
    balance: number
    ready: boolean
  }>
}) => {
  const { hands, gameState, playerName, owns, onPlayerReady, isPlayerReady, allReady } = props
  
  // Mock dealer data - this would come from your game state
  const dealerHands = [{
    playerName: "Dealer",
    selected: false,
    owns: false,
    handValue: 17,
    betValue: 0
  }]

  // Render waiting room interface
  const renderWaitingRoom = () => (
    <>
      {/* Dealer Section */}
      <div className='flex-shrink-0 mt-2 md:mt-4'>
        <DealerSection hands={dealerHands} />
      </div>

      {/* Players Section with Ready Indicators */}
      <div className='flex-1 flex items-center justify-center w-full min-h-0 px-2'>
        <PlayerSection playerID="dummy" hands={hands} players={props.players} />
      </div>

      {/* Ready Controls */}
      <div className='flex-shrink-0 mb-2 px-4'>
        <div className='flex flex-col items-center gap-3 md:gap-4'>
          {/* Ready Status Summary */}
          <div className='bg-slate-700/50 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg border border-slate-600/50'>
            <div className='text-center'>
              <div className='text-white font-medium text-sm md:text-base'>
                {props.players?.filter(p => p.ready).length || 0} / {props.players?.length || 0} Players Ready
              </div>
            </div>
          </div>
          
          {/* Ready Button */}
          <button
            onClick={onPlayerReady}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
              isPlayerReady
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            }`}
          >
            {isPlayerReady ? '✓ Ready!' : 'Ready Up'}
          </button>

          {/* Status Message */}
          {allReady && (
            <div className='text-green-400 font-bold animate-pulse text-sm md:text-base'>
              🎮 Starting game...
            </div>
          )}
        </div>
      </div>
    </>
  )

  // Render game table interface
  const renderGameTable = () => (
    <>
      {/* Dealer Section */}
      <div className='flex-shrink-0 mt-2 md:mt-4'>
        <DealerSection hands={dealerHands} />
      </div>

      {/* Players Section */}
      <div className='flex-1 flex items-center justify-center w-full min-h-0 px-2'>
        <PlayerSection playerID="dummy" hands={hands} />
      </div>

      {/* Game Controls */}
      <div className='flex-shrink-0 mb-2 px-4'>
        <PlayerControls 
          playerName={playerName} 
          owns={owns} 
          gameState={gameState}
        />
      </div>
    </>
  )
  
  return (
    <div className='flex justify-center items-center min-h-screen w-screen p-2 md:p-0 m-0 bg-gradient-to-br from-slate-900 to-slate-800 fixed top-0 left-0 z-[1]'>
      <div className='bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl md:rounded-3xl w-full md:w-[90vw] h-[calc(100vh-1rem)] md:h-[80vh] max-w-[1200px] max-h-[800px] flex flex-col items-center py-3 md:py-6 px-3 md:px-6 relative shadow-xl mt-16 md:mt-20 gap-4 md:gap-8'>
        
        {gameState === "WAITING" ? renderWaitingRoom() : renderGameTable()}
        
      </div>
    </div>
  )
}

export default Table