import React from "react"

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

export default DoubleButton