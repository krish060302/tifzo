import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (page: string) => {
    onNavigate(page)
    setIsMenuOpen(false)
  }

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <button
            onClick={() => handleNavClick('home')}
            className='text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors'
          >
            <img
              src='/assets/header_logo.png'
              alt='tifzo logo'
              className='h-20 w-auto'
            />
          </button>

          <nav className='hidden md:flex space-x-8'>
            <button
              onClick={() => handleNavClick('home')}
              className={`font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`font-medium transition-colors ${
                currentPage === 'contact'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </button>
            <button className='bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors'>
              Become A Rider
            </button>
          </nav>

          <button
            className='md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <X className='h-6 w-6 text-gray-700' />
            ) : (
              <Menu className='h-6 w-6 text-gray-700' />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className='md:hidden pb-4'>
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left py-2 font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`block w-full text-left py-2 font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`block w-full text-left py-2 font-medium transition-colors ${
                currentPage === 'contact'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </button>
            <button className='block w-full text-left bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-2'>
              Become A Rider
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
