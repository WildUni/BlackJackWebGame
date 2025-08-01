import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import Header from './header'
import Table from './table'

// import Table from './components/Table' 
// import Hand from './components/Hand'

// For now, let's create simple placeholder components

// Remove the misplaced interface and fix the props
interface GameProps {
  gameCode: string
  isHost: boolean
}

// Accept props in the Game component
const Game: React.FC<GameProps> = ({ gameCode, isHost }) => {
  return (
    <div>
      <Header />
      <Table />
    </div>
  )
}

export default Game