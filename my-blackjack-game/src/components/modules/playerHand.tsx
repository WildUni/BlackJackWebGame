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
    <div className={`flex flex-col items-center gap-3 p-3 rounded-lg border-2 relative ${
      selected ? 'bg-slate-700/80 border-yellow-400' : 'bg-slate-800/60 border-slate-600'
    } transition-all duration-200`}>
      
      {/* Ready Indicator */}
      {isReady !== undefined && (
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold ${
          isReady 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-500 text-gray-300'
        }`}>
          {isReady ? '✓' : '○'}
        </div>
      )}
      
      {/* Cards */}
      <div className='flex gap-1'>
        <div className='w-8 h-12 bg-slate-100 rounded border-2 border-slate-300 shadow-sm flex items-center justify-center text-lg'>
          🂠
        </div>
        <div className='w-8 h-12 bg-slate-100 rounded border-2 border-slate-300 shadow-sm flex items-center justify-center text-lg'>
          🂠
        </div>
      </div>
      
      {/* Player Info */}
      <div className='text-center'>
        <div className='text-white font-medium text-sm mb-1'>{playerName}</div>
        <div className='flex gap-2 text-xs'>
          <span className='text-slate-300'>Score: {handValue}</span>
          <span className='text-yellow-400'>Bet: ${betValue}</span>
        </div>
      </div>
    </div>
  )
}

export default Hand