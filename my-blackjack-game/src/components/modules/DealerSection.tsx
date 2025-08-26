import React from "react"
import Hand from "./playerHand"
import type{ displayHand } from "../../scripts/utils"

const DealerSection = (props:{dealerHand:Array<string>}) => {
  const { dealerHand } = props
  const dealerHandProp = {playerName:"DEALER",
    cards: dealerHand,
    handValue: 0,
    betValue: 0,
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <Hand
        hand={dealerHandProp}
        selected={false}
        result = {"L"}
      />
    </div>
  )
}

export default DealerSection