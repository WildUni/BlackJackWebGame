import React from "react"
import Hand from "./playerHand"

const PlayerSection = (props: {
  playerID: string
  hands: Array<{
    playerName: string
    selected: boolean
    owns: boolean
    handValue: number
    betValue: number
  }>
  players?: Array<{
    playerName: string
    balance: number
    ready: boolean
  }>
}) => {
  const { hands, players } = props
  
  return (
    <div className="w-full">
      {/* Mobile: Stack vertically on small screens, flex on larger screens */}
      <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center w-full flex-wrap gap-3 md:gap-5">
        {hands.map((hand, index) => {
          // Find player ready status
          const player = players?.find(p => p.playerName === hand.playerName)
          const isReady = player?.ready || false
          
          return (
            <div key={index} className="flex justify-center">
              <Hand
                playerName={hand.playerName}
                selected={hand.selected}
                owns={hand.owns}
                handValue={hand.handValue}
                betValue={hand.betValue}
                isReady={isReady}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerSection