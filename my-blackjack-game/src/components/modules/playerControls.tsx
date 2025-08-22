import React from "react"
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
const DoubleButton = (props: {
  gameState: string
  playerName: string
}) => {
  return (
    <button className='py-2 px-4 border-none rounded-md text-xs font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[70px] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:from-yellow-600 hover:to-yellow-500 hover:transform hover:-translate-y-0.5'>
      Double
    </button>
  )
}


const HitButton = (props: {
  playerName: string
  gameState: string
}) => {
  return (
    <button className='py-2 px-4 border-none rounded-md text-xs font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[70px] bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 hover:transform hover:-translate-y-0.5'>
      Hit
    </button>
  )
}

const StandButton = (props: {
  playerName: string
  gameState: string
}) => {
  return (
    <button className='py-2 px-4 border-none rounded-md text-xs font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[70px] bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 hover:transform hover:-translate-y-0.5'>
      Stand
    </button>
  )
}


export default PlayerControls