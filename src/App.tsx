import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Advantages from './components/Advantages'
import Vision from './components/Vision'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header currentPage={currentPage} onNavigate={handleNavigation} />
      {currentPage === 'home' ? (
        <>
          <Hero />
          <Services />
          <Advantages />
          <Vision />
        </>
      ) : currentPage === 'about' ? (
        <About onNavigate={handleNavigation} />
      ) : (
        <Contact onNavigate={handleNavigation} />
      )}
      <Footer onNavigate={handleNavigation} />
    </div>
  )
}

export default App
