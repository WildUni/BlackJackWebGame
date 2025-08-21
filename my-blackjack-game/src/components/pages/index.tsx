import React, { useEffect, useState } from 'react'
import Game from './game'
import '../modules/style.css'

const Index = () => {
  const [gameCode, setGameCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [showGame, setShowGame] = useState(false)
  const [gameData, setGameData] = useState({ gameCode: '', playerID: '' })

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const gameCodeFromUrl = urlParams.get('gameCode')
    const playerIDFromUrl = urlParams.get('playerID')
    
    if (gameCodeFromUrl && playerIDFromUrl) {
      setGameData({ gameCode: gameCodeFromUrl, playerID: playerIDFromUrl })
      setShowGame(true)
    }
  }, [])

  if (showGame) {
    return <Game playerID={gameData.playerID} roomID={gameData.gameCode} />
  }

  const generateGameCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleStartNewGame = () => {
    if (!playerName.trim()) {
      alert('Please enter your name!')
      return
    }
    
    const newGameCode = generateGameCode()
    // Redirect to game page with parameters
    window.location.href = `${window.location.pathname}?gameCode=${newGameCode}&playerID=${encodeURIComponent(playerName.trim())}`
  }

  const handleJoinGame = () => {
    if (!gameCode.trim()) {
      alert('Please enter a game code!')
      return
    }
    
    if (!playerName.trim()) {
      alert('Please enter your name!')
      return
    }
    
    // Redirect to game page with parameters
    window.location.href = `${window.location.pathname}?gameCode=${gameCode.trim()}&playerID=${encodeURIComponent(playerName.trim())}`
  }

  return (
    <div className="fixed inset-0 h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 overflow-hidden">
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 max-w-lg w-full">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl animate-pulse"></div>
        
        <div className="relative z-10">
          {/* Title Section */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3 animate-bounce">🃏</div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-wider drop-shadow-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BLACKJACK
            </h1>
            <p className="text-gray-300 text-lg font-medium">
              Beat the dealer. Hit 21. Win big.
            </p>
          </div>

          {/* Player Name Input */}
          <div className="mb-5">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your display name"
              maxLength={20}
              className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-3 text-white text-base 
                         font-medium tracking-wide placeholder-gray-500 outline-none transition-all duration-300
                         focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/25"
            />
          </div>

          {/* Buttons Section */}
          <div className="space-y-4">
            <button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-5 rounded-xl text-base 
                         transform transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 
                         shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3"
              onClick={handleStartNewGame}
            >
              <span className="text-xl">🎮</span>
              <span>Start New Game</span>
            </button>
            
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-800 px-3 text-gray-400 font-medium">
                  or join existing game
                </span>
              </div>
            </div>

            {/* Join Game Section */}
            <div className="space-y-3">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit game code"
                maxLength={6}
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-3 text-white text-base 
                           font-mono tracking-wider placeholder-gray-500 outline-none transition-all duration-300
                           focus:border-emerald-500 focus:bg-white/10 focus:shadow-lg focus:shadow-emerald-500/25"
              />
              <button 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 px-5 rounded-xl text-base 
                           transform transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-teal-700 
                           shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                onClick={handleJoinGame}
              >
                <span className="text-xl">🎯</span>
                <span>Join Game</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-5 border-t border-white/10 text-center">
              <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm font-medium">
                <span className="flex items-center gap-2">
                  A BlackJack Multiplayer Game | Created By WildUni & tteoi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index