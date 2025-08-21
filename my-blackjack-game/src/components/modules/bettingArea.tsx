import React, { useState } from "react"

const BettingArea = (props: {
  playerName: string
  owns: boolean
  gameState: string
  playerBalance?: number
}) => {
  const [currentBet, setCurrentBet] = useState(25)
  const [customAmount, setCustomAmount] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const balance = props.playerBalance || 1000
  const chipValues = [5, 25, 50, 100]
  
  const handleCustomBet = () => {
    const amount = parseInt(customAmount)
    if (amount >= 5 && amount <= balance) {
      setCurrentBet(amount)
      setShowCustomInput(false)
      setCustomAmount("")
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setShowCustomInput(false)
      setCustomAmount("")
    }
  }

  if (!isExpanded) {
    // Collapsed state - just a button
    return (
      <button
        onClick={toggleExpanded}
        className='flex items-center gap-3 px-6 py-3 bg-slate-800/80 rounded-xl border border-slate-600/50 hover:bg-slate-700/80 transition-all duration-200 hover:scale-105'
      >
        <span className='text-white text-sm font-medium'>Place Bet</span>
        <div className='bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-3 py-1 rounded-lg font-bold text-sm'>
          ${currentBet}
        </div>
        <svg className='w-4 h-4 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>
    )
  }

  // Expanded state - full betting interface
  return (
    <div className='flex flex-col items-center gap-3 p-4 bg-slate-800/80 rounded-xl border border-slate-600/50 relative'>
      {/* Close Button */}
      <button
        onClick={toggleExpanded}
        className='absolute top-2 right-2 p-1 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded transition-all duration-200'
      >
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>

      {/* Current Bet and Balance */}
      <div className='flex items-center gap-4 mt-2'>
        <div className='flex items-center gap-2'>
          <span className='text-white text-sm'>Bet:</span>
          <div className='bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-4 py-1 rounded-lg font-bold text-lg'>
            ${currentBet}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-slate-400 text-sm'>Balance:</span>
          <div className='bg-green-600/80 text-white px-3 py-1 rounded-lg font-medium text-sm'>
            ${balance}
          </div>
        </div>
      </div>
      
      {/* Chip Buttons */}
      <div className='flex gap-2'>
        {chipValues.map((value) => (
          <button
            key={value}
            onClick={() => {
              setCurrentBet(value)
              setShowCustomInput(false)
              setCustomAmount("")
            }}
            className={`w-10 h-10 rounded-full border-2 font-bold text-xs transition-all duration-200 hover:scale-110 ${
              currentBet === value
                ? 'border-yellow-400 bg-yellow-500 text-black'
                : value <= 25
                ? 'border-red-600 bg-red-700 text-white hover:bg-red-600'
                : 'border-green-600 bg-green-700 text-white hover:bg-green-600'
            }`}
            disabled={value > balance}
          >
            ${value}
          </button>
        ))}
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className='w-10 h-10 rounded-full border-2 border-purple-600 bg-purple-700 text-white font-bold text-xs transition-all duration-200 hover:scale-110 hover:bg-purple-600'
        >
          +
        </button>
      </div>
      
      {/* Custom Input */}
      {showCustomInput && (
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs'>$</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder=""
              className='w-20 pl-5 pr-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500'
            />
          </div>
          <button
            onClick={handleCustomBet}
            className='px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-all duration-200'
            disabled={!customAmount || parseInt(customAmount) < 5 || parseInt(customAmount) > balance}
          >
            Set
          </button>
        </div>
      )}
      
      {/* Place Bet Button */}
      <button
        onClick={() => {
          console.log(`Placing bet of $${currentBet}`)
          setIsExpanded(false) // Close after placing bet
        }}
        className='w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-bold transition-all duration-200 hover:scale-105'
      >
        Place Bet
      </button>
    </div>
  )
}

export default BettingArea