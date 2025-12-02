import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/Abou'
import Courses from './components/Courses'
import Enroll from './pages/Enroll'
import Footer from './components/Footer'
import MarkAttendanceModal from "./components/MarkAttendanceModal";
import './index.css'

function App() {

  return <div>
    <Header />
    <Hero />
    <About />
    <Courses />
    <Footer />
  </div>
}

export default App
