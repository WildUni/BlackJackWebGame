import Hand from "./playerHand"

const DealerSection = (props:{dealerHand:Array<string>, dealerHandValue:number}) => {
  const { dealerHand, dealerHandValue } = props
  const dealerHandProp = {playerName:"DEALER",
    cards: dealerHand,
    handValue: dealerHandValue,
    betValue: 0,
  }
  // console.log(dealerHand, dealerHandValue)
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