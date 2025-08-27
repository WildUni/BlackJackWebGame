import { useGameSocket } from '../client-socket'

/**
 * The module should only be displayed during the action phase!
 * The module should only be displayed if the current hand inplay belongs to the player
 * Picking any action should emit a message to the game server with the game roomId, using the game sockets for the client
 * @param props contains a string representing the roomId of the game room
 * @returns a player controls module with 3 buttons: Hit, stand, and split
 */
const PlayerControls = (props: {
  roomId: string,
}) => {

  const {roomId} = props

  //Different Button types
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


/**
 * This button should only be displayed during the dealing phase, after the player receives the initial two cards.
 * This button should not take effet if the first two cards results in 21
 * This button can only be pressed onced during the betting phase
 * @param props contains a string representing the roomId of the game room
 * @returns a double down button
 */
export const DoubleButton = (props: {
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

/**
 * This button should only be accessible during the acting phase, and if the hand inplay belongs to the player
 * Emits a hit message to the server
 * @param props contains a string representing the roomId of the game room
 * @returns a hit button
 */
const HitButton = (props: {
  roomId: string
}) => {
  const {playerAction} = useGameSocket();
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 hover:transform hover:-translate-y-0.5 active:scale-95'
      onClick={() => playerAction(props.roomId , "HIT")}>
      Hit
    </button>
  )
}

/**
 * This button should only be accessible during the acting phase, and if the hand inplay belongs to the player
 * Emits a stand message to the server
 * @param props contains a string representing the roomId of the game room
 * @returns a stand button
 */
const StandButton = (props: {
  roomId: string
}) => {
  const {playerAction} = useGameSocket();
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 hover:transform hover:-translate-y-0.5 active:scale-95'
      onClick={() => playerAction(props.roomId , "STAND")}>
      Stand
    </button>
  )
}


/**
 * This button should only be accessuble during the acting phase, and if the hand inplay belongs to the player
 * This button only works if the hand contains a pair!
 * Emits a split message to the server
 * @param props contains a string representing the roomId of the game room
 * @returns a split button
 */
const SplitButton = (props: {
  roomId: string
}) => {
  const {playerAction} = useGameSocket();
  return (
    <button className='py-2 md:py-3 px-3 md:px-4 border-none rounded-md text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider min-w-[60px] md:min-w-[70px] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:from-yellow-600 hover:to-yellow-500 hover:transform hover:-translate-y-0.5 active:scale-95'
    onClick={() => playerAction(props.roomId , "SPLIT")}>
      Split
    </button>
  )
}

export default PlayerControls