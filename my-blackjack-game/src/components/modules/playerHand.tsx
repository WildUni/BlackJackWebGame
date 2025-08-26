import type { displayHand } from "../../scripts/utils"

const Hand = (props: { 
  hand: displayHand,
  selected: boolean}) => {
  const { hand, selected } = props
  
  const {playerName, cards, betValue,handValue} = hand;

  return (
    <div className={`flex flex-col items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg border-2 relative transition-all duration-200 min-w-[100px] max-w-[140px] ${
      selected ? 'bg-slate-700/80 border-yellow-400' : 'bg-slate-800/60 border-slate-600'
    }`}>
      <div className="relative flex items-center">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`
            w-14 h-20 flex items-center justify-center rounded-lg border 
            bg-white shadow-md font-bold text-lg 
            ${card.includes("h") || card.includes("d") ? "text-red-500" : "text-black"}
            ${i >= 2 ? "-ml-10" : "ml-0"} 
          `}
          style={{ zIndex: i }}
        >
          {card}
        </div>
      ))}
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