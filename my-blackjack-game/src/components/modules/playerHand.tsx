import React from "react"

const Hand = (props: {
  playerName: string
  selected: boolean
  owns: boolean
  handValue: number
  betValue: number
  isReady?: boolean
}) => {
  const { playerName, selected, owns, handValue, betValue, isReady } = props
  
  return (
    <div className={`flex flex-col items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg border-2 relative transition-all duration-200 min-w-[100px] max-w-[140px] ${
      selected ? 'bg-slate-700/80 border-yellow-400' : 'bg-slate-800/60 border-slate-600'
    }`}>
      
      {/* Ready Indicator */}
      {isReady !== undefined && (
        <div className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold ${
          isReady 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-500 text-gray-300'
        }`}>
          {isReady ? '✓' : '○'}
        </div>
      )}
      
      {/* Cards */}
      <div className='flex gap-0.5 md:gap-1'>
        <div className='w-6 h-9 md:w-8 md:h-12 bg-slate-100 rounded border border-slate-300 shadow-sm flex items-center justify-center text-sm md:text-lg'>
          🂠
        </div>
        <div className='w-6 h-9 md:w-8 md:h-12 bg-slate-100 rounded border border-slate-300 shadow-sm flex items-center justify-center text-sm md:text-lg'>
          🂠
        </div>
      </div>
      
      {/* Player Info */}
      <div className='text-center w-full'>
        <div className='text-white font-medium text-xs md:text-sm mb-1 truncate' title={playerName}>
          {playerName.length > 8 ? `${playerName.slice(0, 8)}...` : playerName}
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-2 text-xs items-center justify-center'>
          <span className='text-slate-300'>Score: {handValue}</span>
          <span className='text-yellow-400'>Bet: ${betValue}</span>
        </div>
      </div>
    </div>
  )
}

export default Hand