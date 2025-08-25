import React from "react"
import BettingArea from "./bettingArea"
import { useGameSocket } from '../client-socket'



const PlayerControls = (props: {
  playerName: string
  gameState: string
  roomId: string
}) => {
  const { playerName, gameState, roomId } = props

  switch (gameState) {
    case "BETTING":
      return (
        <div className="w-full flex justify-center px-2">
          <BettingArea
            gameState={gameState}
            roomId={roomId}
          />
        </div>
      )
    case "ACTING":
      const controlTypes = [StandButton, HitButton, DoubleButton]
      
      return (
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-wrap justify-center items-center w-full px-2">
          <div className="flex gap-2 md:gap-3">
            {controlTypes.map((ControlComponent, index) => (
              <ControlComponent
                key={index}
                playerName={playerName}
                gameState={gameState}
                roomId={roomId}
              />
            ))}
          </div>
        </div>
      )
    case "REVEAL":
      return (
        <div className="text-white text-center text-sm md:text-base px-4">
          <p>The Host is revealing their cards!</p>
        </div>
      )
    default:
      return (<div className="text-red-500 p-4">
        Unknown gameState: "{gameState}" (Type: {typeof gameState})
      </div>)
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
  roomId: string
}) => {
  const {playerAction} = useGameSocket();
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 hover:transform hover:-translate-y-0.5 active:scale-95'
    onClick={() => {
      playerAction(props.roomId , "HIT");
    }}>
      Hit
    </button>
  )
}

const StandButton = (props: {
  playerName: string
  gameState: string
  roomId: string
}) => {
  const {playerAction} = useGameSocket();
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 hover:transform hover:-translate-y-0.5 active:scale-95'
      onClick={() => {
        console.log(props.roomId)
      playerAction(props.roomId , "STAND");
    }}>
      Stand
    </button>
  )
}

export default PlayerControls