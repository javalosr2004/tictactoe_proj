import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ReactDOM } from 'react'
import Navbar from './components/Navbar'
import Board from './components/Board'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Board></Board>
    </div>
  )
}

export default App
