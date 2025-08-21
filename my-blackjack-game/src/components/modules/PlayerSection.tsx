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
    <div className="flex justify-around items-center w-full flex-wrap gap-5">
      {hands.map((hand, index) => {
        // Find player ready status
        const player = players?.find(p => p.playerName === hand.playerName)
        const isReady = player?.ready || false
        
        return (
          <Hand
            key={index}
            playerName={hand.playerName}
            selected={hand.selected}
            owns={hand.owns}
            handValue={hand.handValue}
            betValue={hand.betValue}
            isReady={isReady}
          />
        )
      })}
    </div>
  )
}

export default PlayerSection