import React from "react"

const Hand = (props: {
  playerName: string
  selected: boolean
  owns: boolean
  handValue: number
  betValue: number
  isReady?: boolean
  isWinner?: boolean
  isTie?: boolean
}) => {
  const { playerName, selected, handValue, betValue, isReady, isWinner, isTie } = props
  
  return (
    <div className={`flex flex-col items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg border-2 relative transition-all duration-200 min-w-[100px] max-w-[140px] ${
      isWinner 
        ? 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border-yellow-400 ring-2 ring-yellow-400/50 animate-pulse shadow-lg shadow-yellow-400/25' 
        : isTie
          ? 'bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border-blue-400 ring-2 ring-blue-400/50 shadow-lg shadow-blue-400/25'
          : selected 
            ? 'bg-slate-700/80 border-yellow-400' 
            : 'bg-slate-800/60 border-slate-600'
    }`}>
      
      {/* Winner Crown */}
      {isWinner && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-yellow-400 text-lg animate-bounce">
          👑
        </div>
      )}
      
      {/* Tie Icon */}
      {isTie && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-blue-400 text-lg">
          🤝
        </div>
      )}
      
      {/* Ready Indicator */}
      {isReady !== undefined && !isWinner && !isTie && (
        <div className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold ${
          isReady 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-500 text-gray-300'
        }`}>
          {isReady ? '✓' : '○'}
        </div>
      )}
      
      {/* Winner Trophy */}
      {isWinner && (
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center text-xs">
          🏆
        </div>
      )}
      
      {/* Tie Badge */}
      {isTie && (
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-blue-400 border-2 border-blue-500 flex items-center justify-center text-xs">
          T
        </div>
      )}
      
      {/* Cards */}
      <div className='flex gap-0.5 md:gap-1'>
        <div className={`w-6 h-9 md:w-8 md:h-12 bg-slate-100 rounded border shadow-sm flex items-center justify-center text-sm md:text-lg ${
          isWinner ? 'border-yellow-300 shadow-yellow-400/30' : isTie ? 'border-blue-300 shadow-blue-400/30' : 'border-slate-300'
        }`}>
          🂠
        </div>
        <div className={`w-6 h-9 md:w-8 md:h-12 bg-slate-100 rounded border shadow-sm flex items-center justify-center text-sm md:text-lg ${
          isWinner ? 'border-yellow-300 shadow-yellow-400/30' : isTie ? 'border-blue-300 shadow-blue-400/30' : 'border-slate-300'
        }`}>
          🂠
        </div>
      </div>
      
      {/* Player Info */}
      <div className='text-center w-full'>
        <div className={`font-medium text-xs md:text-sm mb-1 truncate ${
          isWinner ? 'text-yellow-300 font-bold' : isTie ? 'text-blue-300 font-bold' : 'text-white'
        }`} title={playerName}>
          {playerName.length > 8 ? `${playerName.slice(0, 8)}...` : playerName}
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-2 text-xs items-center justify-center'>
          <span className={isWinner ? 'text-yellow-200' : isTie ? 'text-blue-200' : 'text-slate-300'}>
            Score: {handValue}
          </span>
          <span className={isWinner ? 'text-yellow-300 font-bold' : isTie ? 'text-blue-300 font-bold' : 'text-yellow-400'}>
            Bet: ${betValue}
          </span>
        </div>
        
        {/* Result Text */}
        {isWinner && (
          <div className="text-yellow-300 font-bold text-xs mt-1 animate-pulse">
            WINNER! 🎉
          </div>
        )}
        {isTie && (
          <div className="text-blue-300 font-bold text-xs mt-1">
            TIE! 🤝
          </div>
        )}
      </div>
    </div>
  )
}

export default Hand