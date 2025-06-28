import React from 'react'
import './style.css'

const Header = () => {
  const GameCode = "1234"; // generate it dynamically
  
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
          <p className='game-subtitle'>Room: {GameCode}</p>
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