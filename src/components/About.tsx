import { MessageCircle } from 'lucide-react'

interface AboutProps {
  onNavigate: (page: string) => void
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-5xl font-bold text-center text-gray-900 mb-4'>
          About <span className='text-blue-600'>Tifzo</span>
        </h1>
        <p className='text-center text-gray-600 mb-20 max-w-2xl mx-auto leading-relaxed'>
          At <span className='text-blue-700 font-bold'>Tifzo</span>, we focus on
          one simple mission — making food delivery safer and more dependable
          for everyone. Whether it's a Tiffin, home-cooked meals, snacks, or
          restaurant meals, we ensure hygiene, safety, and timely delivery.
          Discover how it's quickly how it may impact to unmatched fresh,
          import, and on time.
        </p>

        <div className='mb-16'>
          <div className='flex items-center gap-2 mb-6'>
            <div className='w-1 h-6 bg-blue-600'></div>
            <h2 className='text-2xl font-bold text-gray-900'>Our Story</h2>
          </div>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div>
              <p className='text-gray-700 leading-relaxed mb-4'>
                <span className='text-blue-600 font-bold'>Tifzo</span> began
                with a simple vision — to solve a common problem. We noticed
                that people couldn't find a reliable, trustworthy way to send
                home-cooked meals, tiffins to their loved ones, snacks, sweets,
                and local food businesses.
              </p>
              <p className='text-gray-700 leading-relaxed mb-4'>
                We realized people needed a hassle-free platform to send food
                safely, deliver home-cooked meals to loved ones, send tiffins to
                schools and offices, and deliver snacks or daily.
              </p>
              <p className='text-gray-700 leading-relaxed'>
                That's why Tifzo was created — a dedicated, food-only delivery
                service designed with safety, hygiene, and trust at its core.
              </p>
            </div>
            <div className='  flex items-center justify-center'>
              <img
                src='/assets/about_us.png'
                alt='about-us image'
                className='h-full w-full object-cover rounded-2xl'
              />
            </div>
          </div>
        </div>

        <div className='mb-16'>
          <h2 className='text-4xl font-bold text-center text-gray-900 mb-8'>
            Our Mission
          </h2>
          <p className='text-center text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto'>
            We aim to create the most safe, transparent, and reliable
            food-delivery network for families, homies, students, working
            professionals, and small businesses.
          </p>
        </div>

        <div className='bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 md:p-12 text-center'>
          <h3 className='text-2xl font-bold text-white mb-2'>
            WANT TO DELIVER A FOOD PARCEL TODAY ?
          </h3>
          <button
            onClick={() => onNavigate('home')}
            className='bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2 mt-6'
          >
            <MessageCircle className='w-5 h-5 text-green-600' />
            Schedule a Pickup
          </button>
        </div>
      </div>
    </div>
  )
}
