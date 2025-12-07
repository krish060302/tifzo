import { Phone, Mail, MapPin } from 'lucide-react'

interface ContactProps {
  onNavigate: (page: string) => void
}

export default function Contact({ onNavigate }: ContactProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold text-gray-900 mb-4'>Get inTouch</h1>
          <p className='text-gray-600 text-lg'>
            Have questions about our services?
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-12 mb-16'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-8'>
              Contact Information
            </h2>

            <div className='mb-8 p-6 bg-gray-50 rounded-lg'>
              <div className='flex items-start gap-4'>
                <Phone className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-semibold text-gray-900 mb-1'>
                    Phone Support
                  </h3>
                  <p className='text-gray-600 text-sm mb-2'>
                    Speak directly with our customer service team
                  </p>
                  <p className='text-blue-600 font-semibold'>+91 8888888888</p>
                  <p className='text-gray-500 text-sm mt-1'>
                    Monday - Sunday: 10AM - 9PM
                  </p>
                </div>
              </div>
            </div>

            <div className='mb-8 p-6 bg-gray-50 rounded-lg'>
              <div className='flex items-start gap-4'>
                <Mail className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-semibold text-gray-900 mb-1'>
                    Email Support
                  </h3>
                  <p className='text-gray-600 text-sm mb-2'>
                    Send us a message and we'll respond ASAP
                  </p>
                  <p className='text-blue-600 font-semibold'>
                    demo08062@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className='p-6 bg-gray-50 rounded-lg'>
              <div className='flex items-start gap-4'>
                <MapPin className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-semibold text-gray-900 mb-1'>Address</h3>
                  <p className='text-gray-600 text-sm mb-2'>
                    Building 01, Stellar Naga, Malad, Mumbai
                  </p>
                  <p className='text-gray-500 text-sm'>
                    Monday - Friday: 10AM - 9PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-8'>
              Send Us Message
            </h2>
            <p className='text-gray-600 mb-6'>
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    First Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50'
                    placeholder='First Name'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Last Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50'
                    placeholder='Last Name'
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email Address <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50'
                  placeholder='Email Address'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Phone Number <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='tel'
                  id='phone'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50'
                  placeholder='Phone Number'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Message <span style={{ color: 'red' }}>*</span>
                </label>
                <textarea
                  id='message'
                  rows={5}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50'
                  placeholder='Message'
                  required
                />
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
