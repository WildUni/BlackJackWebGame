import Hand from "./playerHand"
import type {displayHand } from "../../scripts/utils"

const PlayerSection = (props: {
  hands: Array<displayHand>, 
  handIndex: number,
  handResult: Array<"W"|"T"|"L">  // Changed from winningHandIndex to handResult
}) => {
  
  const { hands, handIndex, handResult } = props  // Changed here too

  return (
    <div className="w-full">
      {/* Mobile: Stack vertically on small screens, flex on larger screens */}
      <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center w-full flex-wrap gap-3 md:gap-5">
        {hands.map((hand, index) => {
          const selected = index === handIndex;          
          return (
            <div key={index} className="flex justify-center">
              {/* Generate Each hand*/}
              <Hand
                hand = {hand}
                selected={selected}
                result = {handResult.length ? handResult[index]:"L"}
              />

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerSection