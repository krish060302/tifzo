import { Calculator } from 'lucide-react'

interface RateCalculatorProps {
  onNavigate: (page: string) => void
}

export default function RateCalculator({ onNavigate }: RateCalculatorProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-3'>
            Calculate Your Price
          </h1>
          <p className='text-gray-600 text-lg'>Get price within seconds</p>
        </div>

        <div className='grid md:grid-cols-2 gap-12 items-center mb-20'>
          <div className='order-2 md:order-1'>
            <div className='bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 rounded-3xl p-8 h-96 flex items-center justify-center relative overflow-hidden'>
              <div className='absolute inset-0 opacity-10'>
                <div className='absolute top-4 right-4 w-24 h-24 bg-white rounded-full'></div>
                <div className='absolute bottom-4 left-4 w-32 h-32 bg-white rounded-full'></div>
              </div>
              <div className='relative z-10'>
                <Calculator className='w-32 h-32 text-white mx-auto mb-4' />
                <div className='bg-white rounded-lg p-4 shadow-lg text-center'>
                  <div className='text-2xl font-bold text-blue-600'>₹50.00</div>
                  <div className='text-xs text-gray-600 mt-1'>
                    Estimated Price
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='order-1 md:order-2'>
            <form
              onSubmit={handleSubmit}
              className='space-y-6 bg-gray-50 p-8 rounded-lg'
            >
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='pickupPincode'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Pickup Pincode <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type='text'
                    id='pickupPincode'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white'
                    placeholder='Enter pincode'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='dropPincode'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Drop Pincode <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type='text'
                    id='dropPincode'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white'
                    placeholder='Enter pincode'
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='weight'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Enter Weight (in grams){' '}
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type='number'
                  id='weight'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white'
                  placeholder='Enter weight'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='paymentMode'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Payment Mode <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id='paymentMode'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white'
                >
                  <option value=''>Select payment mode</option>
                  <option value='cod'>Cash on Delivery</option>
                  <option value='prepaid'>Prepaid</option>
                </select>
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
