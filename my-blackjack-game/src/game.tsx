import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import Header from './header'
import Table from './table'

// import Table from './components/Table' 
// import Hand from './components/Hand'

// For now, let's create simple placeholder components



// Create and export the main Game component
const Game = () => {
  return (
    <div>
      <Header />
      <Table />
    </div>
  )
}

export default Game