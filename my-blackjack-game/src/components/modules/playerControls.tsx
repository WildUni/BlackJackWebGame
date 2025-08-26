import React from "react"
import BettingArea from "./bettingArea"
import { useGameSocket } from '../client-socket'



const PlayerControls = (props: {
  playerName: string
  gameState: string
  roomId: string,
}) => {
  const { playerName, gameState, roomId} = props
      const controlTypes = [StandButton, HitButton, SplitButton]
      return (
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-wrap justify-center items-center w-full px-2">
          <div className="flex gap-2 md:gap-3">
            {controlTypes.map((ControlComponent, index) => (
              <ControlComponent
                key={index}
                roomId={roomId}
              />
            ))}
          </div>
        </div>
      )
}

export const DoubleButton = (props: {
  gameState: string
  playerName: string
  roomId: string
}) => {
  const {playerAction} = useGameSocket();
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:from-yellow-600 hover:to-yellow-500 hover:transform hover:-translate-y-0.5 active:scale-95'
    onClick={() => {
      playerAction(props.roomId , "DOUBLE");
    }}>
      Double
    </button>
  )
}

const HitButton = (props: {
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

const SplitButton = (props: {
  roomId: string
}) => {
  const {playerAction} = useGameSocket();
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:from-yellow-600 hover:to-yellow-500 hover:transform hover:-translate-y-0.5 active:scale-95'
    onClick={() => {
      playerAction(props.roomId , "SPLIT");
    }}>
      Split
    </button>
  )
}


export default PlayerControls