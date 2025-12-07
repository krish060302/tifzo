import { IndianRupee } from 'lucide-react'
import { Clock, Award, MapPin } from 'lucide-react'

export default function Advantages() {
  const advantages = [
    {
      icon: IndianRupee,
      title: 'Price',
      description:
        'Enjoy highly competitive pricing with a starting rate of just ₹25 for the first kilometer, followed by an affordable ₹6 per kilometer thereafter',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description:
        'We take full responsibility for your delivery—every order is delivered on time, every time',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      icon: Award,
      title: 'Trust',
      description:
        'Our values extend beyond our operations and are reflected in every delivery we make',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: MapPin,
      title: 'Tracking',
      description:
        'Stay informed at every step with our live-tracking facility, offering accurate real-time insights',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
  ]

  return (
    <section className='py-16 md:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
          Discover the Advantages
          <br />
          of Using <span className='text-blue-600'> Tifzo </span>
        </h2>
        <p className='text-gray-600 mb-12 text-lg max-w-2xl'>
          Experience fast, safe, and reliable food-only delivery every time
        </p>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <div
                key={index}
                className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1'
              >
                <div
                  className={`w-12 h-12 ${advantage.bgColor} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${advantage.iconColor}`} />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {advantage.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {advantage.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
