import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gameConstants } from '../../scripts/utils'

const Header = (props: { roomID: string, numPlayers:number}) => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()
  const playerCount = props.numPlayers // This would come from props/state
  const maxPlayers = gameConstants.MAX_PLAYER_COUNT;

  const handleLeaveRoom = () => {
    if (confirm('Are you sure you want to leave the game?')) {
      navigate('/Home')
    }
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(props.roomID)
    // Could add a toast notification here
  }

  return (
    <header className='w-full py-3 md:py-4 px-4 md:px-6 fixed top-0 left-0 z-[1000] bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border-b border-slate-700/50 shadow-xl'>
      <div className='flex items-center justify-between max-w-7xl mx-auto w-full'>
        {/* Left - Logo & Title */}
        <div className='flex items-center gap-3'>
          <div className='flex-shrink-0 relative'>
            <div className='w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-slate-600'>
              <span className='text-xl md:text-2xl'>🃏</span>
            </div>
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse'></div>
          </div>
          <div>
            <h1 className='text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Blackjack
            </h1>
            <div className='flex items-center gap-2 text-xs md:text-sm text-slate-300'>
              <span className='w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full'></span>
              <span>{playerCount}/{maxPlayers} players</span>
            </div>
          </div>
        </div>

        {/* Right - Room ID & Menu */}
        <div className='flex items-center gap-3'>
          {/* Room ID - Always Visible */}
          <div className='bg-slate-700/60 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg border border-slate-600/50 flex items-center gap-2'>
            <div className='text-center'>
              <div className='text-slate-400 text-xs font-medium uppercase tracking-wider hidden md:block'>Room</div>
              <div className='text-white font-bold text-sm md:text-base'>{props.roomID}</div>
            </div>
            <button
              onClick={copyRoomId}
              className='p-1.5 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded transition-all duration-200'
              title='Copy Room ID'
            >
              <svg className='w-3 h-3 md:w-4 md:h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
              </svg>
            </button>
          </div>

          {/* Desktop Leave Button */}
          <button 
            onClick={handleLeaveRoom}
            className='hidden md:flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
            </svg>
            <span>Leave</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className='md:hidden p-2 text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 relative'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {showMobileMenu ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <>
          {/* Backdrop */}
          <div 
            className='md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm'
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Menu Panel */}
          <div className='md:hidden absolute top-full right-0 left-0 bg-slate-800/95 backdrop-blur-md border-b border-slate-700/50 shadow-xl'>
            <div className='p-4 space-y-4 max-w-sm mx-auto'>
              {/* Menu Header */}
              <div className='text-center pb-3 border-b border-slate-600/50'>
                <h3 className='text-white font-semibold text-lg'>Game Menu</h3>
                <p className='text-slate-400 text-sm'>Room: {props.roomID}</p>
              </div>

              {/* Quick Actions */}
              <div className='space-y-3'>
                <button
                  onClick={copyRoomId}
                  className='w-full flex items-center justify-center gap-3 bg-slate-700/60 hover:bg-slate-600/60 text-white py-3 px-4 rounded-lg transition-all duration-200'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                  </svg>
                  <span>Copy Room Code</span>
                </button>

                <button 
                  onClick={() => {
                    handleLeaveRoom()
                    setShowMobileMenu(false)
                  }}
                  className='w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg transition-all duration-200 shadow-lg'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                  </svg>
                  <span>Leave Game</span>
                </button>
              </div>

              {/* Game Stats */}
              <div className='pt-3 border-t border-slate-600/50'>
                <div className='bg-slate-700/40 rounded-lg p-3'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-slate-300'>Players Online:</span>
                    <span className='text-white font-semibold'>{playerCount}/{maxPlayers}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header