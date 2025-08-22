import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePlayer } from '../player-context'
import '../modules/style.css'
import Header from '../modules/header'
import Table from '../modules/table'

// Game state interface matching your GameRoom logic
interface GameState {
  roomID: string
  playerName: string
  gamePhase: "WAITING" | "BETTING" | "DEALING" | "DISTRIBUTING" | "REVEAL"
  hands: Array<{
    playerName: string
    handValue: number
    betValue: number
    selected: boolean
    owns: boolean
    inPlay: boolean
  }>
  players: Array<{
    playerName: string
    balance: number
    ready: boolean
  }>
  currentPlayerTurn: number // selection counter
  dealerHand: {
    handValue: number
    cards: number
  }
}

const Game = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const { playerName, balance } = usePlayer()
  
  const [gameState, setGameState] = useState<GameState>({
    roomID: roomId || "",
    playerName: playerName || "Guest",
    gamePhase: "WAITING",
    hands: [],
    players: [],
    currentPlayerTurn: 0,
    dealerHand: {
      handValue: 0,
      cards: 0
    }
  })

  // Initialize game - this would typically come from socket connection
  useEffect(() => {
    if (roomId && playerName) {
      // Initialize with current player
      setGameState(prev => ({
        ...prev,
        roomID: roomId,
        playerName: playerName,
        players: [{
          playerName: playerName,
          balance: balance || 1000,
          ready: false
        }],
        hands: [{
          playerName: playerName,
          handValue: 0,
          betValue: 0,
          selected: true,
          owns: true,
          inPlay: true
        }]
      }))
    }
  }, [roomId, playerName, balance])

  // Check if all players are ready and auto-transition to betting
  useEffect(() => {
    if (gameState.gamePhase === "WAITING" && gameState.players.length > 0) {
      const allReady = gameState.players.every(player => player.ready)
      if (allReady) {
        // All players ready - start betting phase
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            gamePhase: "BETTING"
          }))
        }, 1000) // Small delay for UX
      }
    }
  }, [gameState.players, gameState.gamePhase])

  // Player ready toggle
  const handlePlayerReady = () => {
    const currentPlayer = gameState.players.find(p => p.playerName === playerName)
    if (currentPlayer) {
      handleReadyStateChange(playerName || "Guest", !currentPlayer.ready)
    }
  }

  // Socket event handlers (these would replace the manual functions)
  
  // Player joins the room
  const handlePlayerJoin = (joinPlayerName: string, joinBalance: number) => {
    setGameState(prev => ({
      ...prev,
      players: [...prev.players, { playerName: joinPlayerName, balance: joinBalance, ready: false }],
      hands: [...prev.hands, {
        playerName: joinPlayerName,
        handValue: 0,
        betValue: 0,
        selected: false,
        owns: false,
        inPlay: true
      }]
    }))
  }

  // Player ready state change
  const handleReadyStateChange = (readyPlayerName: string, ready: boolean) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(player =>
        player.playerName === readyPlayerName ? { ...player, ready } : player
      )
    }))
  }

  // Start betting phase
  const handleBettingPhase = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "BETTING"
    }))
  }

  // Update player bet
  const handleBetUpdate = (betPlayerName: string, betAmount: number, newBalance: number) => {
    setGameState(prev => ({
      ...prev,
      hands: prev.hands.map(hand =>
        hand.playerName === betPlayerName ? { ...hand, betValue: betAmount } : hand
      ),
      players: prev.players.map(player =>
        player.playerName === betPlayerName ? { ...player, balance: newBalance } : player
      )
    }))
  }

  // Start dealing phase
  const handleDealingPhase = (updatedHands: typeof gameState.hands, dealerCards: number) => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "DISTRIBUTING",
      hands: updatedHands,
      dealerHand: { ...prev.dealerHand, cards: dealerCards }
    }))
  }

  // Update current turn
  const handleTurnChange = (selectionCounter: number) => {
    setGameState(prev => ({
      ...prev,
      currentPlayerTurn: selectionCounter,
      hands: prev.hands.map((hand, index) => ({
        ...hand,
        selected: index === selectionCounter
      }))
    }))
  }

  // Handle hit action result
  const handleHitResult = (handIndex: number, newHandValue: number, newCards: any[], inPlay: boolean) => {
    setGameState(prev => ({
      ...prev,
      hands: prev.hands.map((hand, index) =>
        index === handIndex 
          ? { ...hand, handValue: newHandValue, inPlay }
          : hand
      )
    }))
  }

  // Handle stand action
  const handleStandResult = (handIndex: number) => {
    setGameState(prev => ({
      ...prev,
      hands: prev.hands.map((hand, index) =>
        index === handIndex 
          ? { ...hand, inPlay: false }
          : hand
      )
    }))
  }

  // Handle dealer reveal
  const handleDealerReveal = (dealerHandValue: number, dealerCards: number) => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "REVEAL",
      dealerHand: { handValue: dealerHandValue, cards: dealerCards }
    }))
  }

  // Handle game restart
  const handleGameRestart = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: "WAITING",
      hands: prev.hands.map(hand => ({
        ...hand,
        handValue: 0,
        betValue: 0,
        inPlay: true,
        selected: false
      })),
      currentPlayerTurn: 0,
      dealerHand: { handValue: 0, cards: 0 },
      players: prev.players.map(player => ({ ...player, ready: false }))
    }))
  }

  // Convert game phase to table state
  const getTableGameState = (): "WAITING" | "BETTING" | "CIRCULATING" | "REVEAL" => {
    switch (gameState.gamePhase) {
      case "WAITING":
        return "WAITING"
      case "BETTING":
        return "BETTING"
      case "DEALING":
      case "DISTRIBUTING":
        return "CIRCULATING"
      case "REVEAL":
        return "REVEAL"
      default:
        return "WAITING"
    }
  }

  // Get current player's hand
  const getCurrentPlayerHand = () => {
    return gameState.hands.find(hand => hand.owns === true)
  }

  // Get current player's ready status
  const getCurrentPlayerReady = () => {
    return gameState.players.find(p => p.playerName === playerName)?.ready || false
  }

  // Check if all players are ready
  const allPlayersReady = () => {
    return gameState.players.length > 0 && gameState.players.every(player => player.ready)
  }

  const currentHand = getCurrentPlayerHand()

  // Show loading if no room ID or player name
  if (!roomId || !playerName) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading game room...</div>
      </div>
    )
  }

  return (
    <div>
      <Header roomID={gameState.roomID} />
      <Table 
        hands={gameState.hands}
        gameState={getTableGameState()}
        playerName={gameState.playerName}
        owns={currentHand?.owns || false}
        // Pass ready system props
        onPlayerReady={handlePlayerReady}
        isPlayerReady={getCurrentPlayerReady()}
        allReady={allPlayersReady()}
        players={gameState.players}
      />
      
      {/* Game Info Panel - Mobile Responsive */}
      <div className='fixed top-16 md:top-24 right-2 md:right-4 bg-slate-800/90 text-white p-2 md:p-4 rounded-lg text-xs md:text-sm max-w-[200px] md:max-w-xs backdrop-blur-sm border border-slate-600/50 z-40'>
        <div className='font-bold mb-1 md:mb-2 text-yellow-400 text-xs md:text-sm'>Game Status</div>
        <div className='space-y-0.5 md:space-y-1'>
          <div className='text-xs md:text-sm'>Phase: <span className='text-green-400'>{gameState.gamePhase}</span></div>
          <div className='text-xs md:text-sm'>Players: <span className='text-blue-400'>{gameState.players.length}</span></div>
          <div className='text-xs md:text-sm'>Room: <span className='text-purple-400 break-all'>{gameState.roomID}</span></div>
          <div className='text-xs md:text-sm'>Balance: <span className='text-yellow-400'>${getCurrentPlayerHand()?.betValue || 0}</span></div>
          {gameState.gamePhase === "DISTRIBUTING" && (
            <div className='text-xs md:text-sm'>Turn: <span className='text-purple-400'>{gameState.hands[gameState.currentPlayerTurn]?.playerName}</span></div>
          )}
          {gameState.gamePhase === "WAITING" && (
            <div className='text-xs md:text-sm'>
              Ready: <span className={allPlayersReady() ? 'text-green-400' : 'text-red-400'}>
                {gameState.players.filter(p => p.ready).length}/{gameState.players.length}
              </span>
            </div>
          )}
        </div>
        
        {/* Player List */}
        <div className='mt-2 md:mt-3 border-t border-slate-600 pt-1 md:pt-2'>
          <div className='font-medium mb-1 text-slate-300 text-xs md:text-sm'>Players:</div>
          {gameState.players.map(player => (
            <div key={player.playerName} className='flex justify-between text-xs'>
              <span className={`${player.ready ? 'text-green-400' : 'text-slate-400'} truncate max-w-[80px] md:max-w-none`} title={player.playerName}>
                {player.playerName.length > 8 ? `${player.playerName.slice(0, 8)}...` : player.playerName} {player.ready && '✓'}
              </span>
              <span className='text-yellow-400'>${player.balance}</span>
            </div>
          ))}
        </div>
        
        {/* Ready status indicator */}
        {gameState.gamePhase === "WAITING" && (
          <div className='mt-2 md:mt-3 border-t border-slate-600 pt-1 md:pt-2'>
            {allPlayersReady() ? (
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
            onClick={() => setGameState(prev => ({ ...prev, gamePhase: "WAITING" }))}
            className='px-1 md:px-2 py-1 bg-slate-600 hover:bg-slate-700 rounded text-xs'
          >
            Waiting
          </button>
          <button 
            onClick={() => setGameState(prev => ({ ...prev, gamePhase: "BETTING" }))}
            className='px-1 md:px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs'
          >
            Betting
          </button>
          <button 
            onClick={() => setGameState(prev => ({ ...prev, gamePhase: "DISTRIBUTING" }))}
            className='px-1 md:px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs'
          >
            Playing
          </button>
          <button 
            onClick={() => setGameState(prev => ({ ...prev, gamePhase: "REVEAL" }))}
            className='px-1 md:px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs'
          >
            Reveal
          </button>
          <button 
            onClick={() => handlePlayerJoin(`Player${gameState.players.length + 1}`, 1000)}
            className='px-1 md:px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs col-span-2'
          >
            Add Player
          </button>
          <button 
            onClick={handlePlayerReady}
            className={`px-1 md:px-2 py-1 rounded text-xs col-span-2 ${
              getCurrentPlayerReady() 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {getCurrentPlayerReady() ? 'Unready' : 'Ready Up'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Game