import React from "react"

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

export default StandButton