import React from 'react'
import ReactDOM from 'react-dom/client'
import '../modules/style.css'
import Game from './game.tsx'
import Index from './index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)