import React from "react"
import Hand from "./playerHand"
import type { displayData } from "../../scripts/utils"
import { usePlayer } from "../player-context"

const PlayerSection = (props: {
  players: Array<{playerName: string, balance: number, ready: boolean}>,
  hands: Array<{playerName: string, cards: Array<string>, handValue: number, betValue: number}>, 
  handIndex: number,
  gameState?: string,
  winningHandIndex?: Array<number>
}) => {
  
  const { hands, players, handIndex, gameState, winningHandIndex } = props
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
          
          // Check if this hand is a winner during revealing state
          const isWinner = gameState === 'REVEALING' && 
                          winningHandIndex && 
                          winningHandIndex.includes(index);
          
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
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerSection