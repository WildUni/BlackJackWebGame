import React from "react"
import Hand from "./playerHand"

const DealerSection = (props: {
  hands: Array<{
    playerName: string
    selected: boolean
    owns: boolean
    handValue: number
    betValue: number
  }>
}) => {
  const { hands } = props
  return (
    <div className="flex flex-col items-center gap-4">
      {hands.map((hand, index) => (
        <Hand
          key={index}
          playerName={hand.playerName}
          selected={hand.selected}
          owns={hand.owns}
          handValue={hand.handValue}
          betValue={hand.betValue}
        />
      ))}
    </div>
  )
}

export default DealerSection