import React from "react"
import Hand from "./playerHand"

const DealerSection = (props:{dealerHand:Array<string>}) => {
  const { dealerHand } = props
  return (
    <div className="flex flex-col items-center gap-4">
      {dealerHand.map((dealerHand, index) => (
        <Hand
          key={index}
          playerName={"DEALER"}
          selected={false}
          owns={false}
          handValue={0}
          betValue={0}
        />
      ))}
    </div>
  )
}

export default DealerSection