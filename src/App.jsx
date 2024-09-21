import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRouter from './router/Router'
import axios from 'axios'
import StickyHeader from './components/common/StickyHeader'
import ParticlesDemo from './components/common/ParticlesDemo'
import FancyParticles from './components/common/FancyParticles'

function App() {
  const [count, setCount] = useState(0)
  //axios.defaults.baseURL = 'http://localhost:3001'
  axios.defaults.baseURL = 'https://portfolio-mng-backend.onrender.com'
  const url = window.location.href
  console.log('url', url)

  return (
    <>
    {/* <FancyParticles/> */}
    <MainRouter/>
    </>
  )
}

export default App
