import React from "react"
import Hand from "./playerHand"
import type { displayData } from "../../scripts/utils"
import { usePlayer } from "../player-context"

const PlayerSection = (props: {
  players: Array<{playerName: string, balance: number, ready: boolean}>,
  hands: Array<{playerName: string, cards: Array<string>, handValue: number, betValue: number}>, 
  handIndex: number,
  gameState?: string,
  handResult?: Array<string>  // Changed from winningHandIndex to handResult
}) => {
  
  const { hands, players, handIndex, gameState, handResult } = props  // Changed here too
  const { playerName } = usePlayer();
  
  return (
    <div className="w-full">
      {/* Mobile: Stack vertically on small screens, flex on larger screens */}
      <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center w-full flex-wrap gap-3 md:gap-5">
        {hands.map((hand, index) => {
          // Find player ready status
          const player = players?.find(p => p.playerName === hand.playerName)
          const isReady = player?.ready || false
          const selected = index === handIndex;
          const owns = hand.playerName === playerName;
          
          // Check hand result during revealing state - UPDATED LOGIC
          const handResultValue = gameState === 'REVEALING' && handResult ? handResult[index] : undefined;
          const isWinner = handResultValue === "W";
          const isTie = handResultValue === "T";
          
          return (
            <div key={index} className="flex justify-center">
              <Hand
                playerName={hand.playerName}
                selected={selected}
                owns={owns}
                handValue={hand.handValue}
                betValue={hand.betValue}
                isReady={isReady}
                isWinner={isWinner}
                isTie={isTie}  // Added this prop
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerSection