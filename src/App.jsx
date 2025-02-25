import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Cards from './components/Cards';
import ImgSetup from './components/ImgSetup';

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Slider/>
        <Cards/>
        <ImgSetup/>
      </div>
    </>
  )
}

export default App
