import React from "react"
import Hand from "./playerHand"

const DealerSection = (props:{dealerHand:Array<string>}) => {
  const { dealerHand } = props
  return (
    <div className="flex flex-col items-center gap-4">
      <Hand
        key="dealer-hand"
        playerName={"DEALER"}
        selected={false}
        handValue={0} // You might want to calculate this based on dealerHand
        betValue={0}
        // If your Hand component expects individual cards, you might need to modify how you pass them
        // OR render the cards directly in this component instead of using Hand
      />
    </div>
  )
}

export default DealerSection