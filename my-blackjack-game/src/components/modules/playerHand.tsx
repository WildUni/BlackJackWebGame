import type { displayHand } from "../../scripts/utils"
const suiteMapping = new Map([
  ["s","♠"],
  ["h","♥"],
  ["d","♦"],
  ["c","♣"]
])
const Hand = (props: { 
  hand: displayHand,
  selected: boolean,
  result:"W"|"T"|"L"}) => {
  const { hand, selected, result } = props
  const {playerName, betValue,handValue} = hand;
  const cards:Array<string> = [];

  hand.cards.forEach(card=>{
    if(card !== "HIDDEN"){
      cards.push(card.substring(0, card.length - 1) + suiteMapping.get(card[card.length - 1]));
    }
  })

  return (
    <div className={`flex flex-col items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg border-2 relative transition-all duration-200 min-w-[100px] max-w-[140px] ${
      result === "W" ? 'bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border-yellow-400 ring-2 ring-yellow-400/50 animate-pulse shadow-lg shadow-yellow-400/25' 
        : result === "T" ? 'bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border-blue-400 ring-2 ring-blue-400/50 shadow-lg shadow-blue-400/25'
          : selected ? 'bg-slate-700/80 border-yellow-400' 
            : 'bg-slate-800/60 border-slate-600'
    }`}>

      {/* Card Info */}
      <div className="relative flex items-center">
      {cards.map((card, i) => (
        card === "HIDDEN" ? <div className='w-8 h-12 bg-slate-100 rounded border-2 border-slate-300 shadow-sm flex items-center justify-center text-lg'>
          🂠
        </div>
        :
        <div key={i} className={`w-14 h-20 flex items-start justify-start rounded-lg border bg-white shadow-md font-bold text-lg 
            ${card.includes("h") || card.includes("d") ? "text-red-500" : "text-black"} ${i >= 1 ? "-ml-5" : "ml-0"}`}
          style={{ zIndex: i }}>
          {card}
        </div>
      ))}
    </div>
      



      {/* Player Info */}
      <div className='text-center w-full'>
        <div className={`font-medium text-xs md:text-sm mb-1 truncate ${
           result === "W" ? 'text-yellow-300 font-bold' :  result === "T" ? 'text-blue-300 font-bold' : 'text-white'
        }`} title={playerName}>
          {playerName.length > 8 ? `${playerName.slice(0, 8)}...` : playerName}
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-2 text-xs items-center justify-center'>
          <span className={ result === "W" ? 'text-yellow-200' :  result === "T" ? 'text-blue-200' : 'text-slate-300'}>
            Score: {handValue}
          </span>
          <span className={ result === "W" ? 'text-yellow-300 font-bold' :  result === "T" ? 'text-blue-300 font-bold' : 'text-yellow-400'}>
            Bet: ${betValue}
          </span>
        </div>
        
        {/* Result Text */}
        { result === "W" && (
          <div className="text-yellow-300 font-bold text-xs mt-1 animate-pulse">
            WINNER! 🎉
          </div>
        )}
        { result === "T" && (
          <div className="text-blue-300 font-bold text-xs mt-1">
            TIE! 🤝
          </div>
        )}
      </div>
    </div>
  )
}

export default Hand