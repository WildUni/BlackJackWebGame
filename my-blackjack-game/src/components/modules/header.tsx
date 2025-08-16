import React from 'react'
import './style.css'

const Header = (props:{roomID:string}) => {
  return (
    <header className='header'>
      <div className='header-container'>
        {/* Left - Logo */}
        <div className='header-logo'>
          <img 
            src='assets/logo.png' 
            alt='logo' 
            className='logo-image'
          />
        </div>

        {/* Center - Game Title */}
        <div className='header-title'>
          <h1 className='game-title'>Blackjack</h1>
          <p className='game-subtitle'>Room: {props.roomID}</p>
        </div>

        {/* Right - Leave Room Button */}
        <div className='header-button'>
          <button className='leave-room-btn'>
            Leave Room
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header