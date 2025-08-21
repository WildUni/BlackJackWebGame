import React from "react"

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

export default HitButton