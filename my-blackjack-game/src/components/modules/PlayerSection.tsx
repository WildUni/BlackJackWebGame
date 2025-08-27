import Hand from "./playerHand"
import type {displayHand } from "../../scripts/utils"

/**
 * Represents the row that displays the hands currently in play.
 * The row high lights the current hand in play.
 * @param props an array of hands that stores information abt each corresponding hand, the handindex which represents the 
 * index of the current hand in play, and an array representing the result of the each hand.
 * @returns 
 */
const PlayerSection = (props: {
  hands: Array<displayHand>, 
  handIndex: number,
  handResult: Array<"W"|"T"|"L">
}) => {
  
  const { hands, handIndex, handResult } = props  
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
                //defaults to L bc it doesnt have special borders
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