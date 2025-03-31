import { useState } from 'react'
import './App.css'
import './utils/OwnerDisplay'
import OwnerDisplay from './utils/OwnerDisplay'
import Header from './utils/Header'

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header/>
      <OwnerDisplay/>

    </div>
    
  )
}

export default App
