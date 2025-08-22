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
        <div className="w-full flex justify-center px-2">
          <BettingArea
            playerName={playerName}
            owns={owns}
            gameState={gameState}
          />
        </div>
      )
    case "CIRCULATING":
      const controlTypes = [StandButton, HitButton, DoubleButton]
      
      return owns ? (
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-wrap justify-center items-center w-full px-2">
          <div className="flex gap-2 md:gap-3">
            {controlTypes.map((ControlComponent, index) => (
              <ControlComponent
                key={index}
                playerName={playerName}
                gameState={gameState}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-white text-center text-sm md:text-base px-4">
          <p>Waiting for {playerName} to take their turn</p>
        </div>
      )
    case "REVEAL":
      return (
        <div className="text-white text-center text-sm md:text-base px-4">
          <p>The Host is revealing their cards!</p>
        </div>
      )
    default:
      return null
  }
}

const DoubleButton = (props: {
  gameState: string
  playerName: string
}) => {
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:from-yellow-600 hover:to-yellow-500 hover:transform hover:-translate-y-0.5 active:scale-95'>
      Double
    </button>
  )
}

const HitButton = (props: {
  playerName: string
  gameState: string
}) => {
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 hover:transform hover:-translate-y-0.5 active:scale-95'>
      Hit
    </button>
  )
}

const StandButton = (props: {
  playerName: string
  gameState: string
}) => {
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 hover:transform hover:-translate-y-0.5 active:scale-95'>
      Stand
    </button>
  )
}

export default PlayerControls