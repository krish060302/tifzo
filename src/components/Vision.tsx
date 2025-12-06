export default function Vision() {
  return (
    <section id='vision' className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl overflow-hidden shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12'>
            <div>
              <img
                src='/public/assets/vision_image.png'
                alt='Our Vision'
                className='w-full h-90 rounded-lg'
              />
            </div>
            <div className='text-white text-center'>
              <h2 className='text-4xl font-bold mb-6'>Our Vision</h2>
              <p className='text-lg leading-relaxed opacity-95'>
                To build India's most trusted food-only delivery network that
                ensures every meal — from home kitchens to local food
                businesses, cloud kitchens, and with complete care. We aim to
                make Tifzo the simplest, most reliable way for anyone to send or
                receive hot food anytime anywhere in the city.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
