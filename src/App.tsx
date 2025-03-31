/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import './utils/OwnerDisplay'
import OwnerDisplay from './utils/OwnerDisplay'
import Header from './utils/Header'
import Interact from './utils/Interact'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Information from './utils/Information'



function App() {
  



  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Router>
      <Header/>
      <OwnerDisplay/>
      <Routes>
          <Route path="/" element={<Interact />} />
          <Route path="/info" element={<Information />} />
        </Routes>
      
      
      </Router>
    </div>
    
  )
}

export default App
