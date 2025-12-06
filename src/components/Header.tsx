import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = ['Home', 'Services', 'About', 'Contact']

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <img
            src='/assets/header_logo.png'
            alt='tifzo logo'
            className='h-20 w-auto'
          />

          <nav className='hidden md:flex space-x-8'>
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
              >
                {link}
              </a>
            ))}
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
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className='block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium'
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
