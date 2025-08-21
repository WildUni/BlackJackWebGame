import React from 'react'

const Header = (props: { roomID: string }) => {
  const playerCount = 3 // This would come from props/state
  const maxPlayers = 3

  return (
    <header className='w-full py-3 px-6 fixed top-0 left-0 z-[1000] bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border-b border-slate-700/50 shadow-xl'>
      <div className='flex items-center justify-between max-w-7xl mx-auto w-full'>
        {/* Left - Logo & Game Info */}
        <div className='flex items-center gap-4'>
          <div className='flex-shrink-0 relative'>
            <div className='w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-slate-600'>
              <span className='text-2xl'>🃏</span>
            </div>
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse'></div>
          </div>
          <div className='hidden sm:block'>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent'>
              Blackjack
            </h1>
            <div className='flex items-center gap-2 text-sm text-slate-300'>
              <span className='w-2 h-2 bg-green-500 rounded-full'></span>
              <span>{playerCount}/{maxPlayers} players</span>
            </div>
          </div>
        </div>

        {/* Center - Room Info */}
        <div className='absolute left-1/2 transform -translate-x-1/2'>
          <div className='bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600/50 flex items-center gap-3'>
            <div className='text-center'>
              <div className='text-slate-400 text-xs font-medium uppercase tracking-wider'>Room</div>
              <div className='text-white font-bold text-lg'>{props.roomID}</div>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(props.roomID)}
              className='p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all duration-200'
              title='Copy Room ID'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
              </svg>
            </button>
          </div>
        </div>

        {/* Right - Leave Button */}
        <div className='flex items-center'>
          {/* Leave Room Button */}
          <button className='group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'>
            <span className='flex items-center gap-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
              </svg>
              <span className='hidden sm:inline'>Leave</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Game Title */}
      <div className='sm:hidden mt-2 text-center'>
        <h1 className='text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent'>
          Blackjack
        </h1>
      </div>
    </header>
  )
}

export default Header