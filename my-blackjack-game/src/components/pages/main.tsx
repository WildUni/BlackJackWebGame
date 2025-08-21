// main.tsx - UPDATED
import React from 'react'
import ReactDOM from 'react-dom/client'
// import the correct export from server-sockets
import Index from './index'
import '../modules/style.css'
  
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
)