import React from "react"
import StandButton from "./standButton"
import HitButton from "./hitButton"
import DoubleButton from "./doubleDown"
import BettingArea from "./bettingArea"

const PlayerControls = (props: {
  playerName: string
  owns: boolean
  gameState: string
}) => {
  const { playerName, owns, gameState } = props
  
  switch (gameState) {
    case "BETTING":
      return (
        <BettingArea
          playerName={playerName}
          owns={owns}
          gameState={gameState}
        />
      )
    case "CIRCULATING":
      const controlTypes = [StandButton, HitButton, DoubleButton]
      
      return owns ? (
        <div className="flex gap-3 flex-wrap justify-center">
          {controlTypes.map((ControlComponent, index) => (
            <ControlComponent
              key={index}
              playerName={playerName}
              gameState={gameState}
            />
          ))}
        </div>
      ) : (
        <p className="text-white text-center">Waiting for {playerName} to take their turn</p>
      )
    case "REVEAL":
      return <p className="text-white text-center">The Host is revealing their cards!</p>
    default:
      return null
  }
}

export default PlayerControls