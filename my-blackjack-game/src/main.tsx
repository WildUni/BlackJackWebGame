import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import Game from './game.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)