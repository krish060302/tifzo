import { MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-200">
              <b>India's #1 Door-To-Door Food Only Delivery Service</b>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Safe Food Delivery,
              <br />
              Made Simple
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
             Trusted pickup & drop for any food parcel, with real-time WhatsApp updates.
            </p>
            
            <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
              <MessageCircle className="w-5 h-5 text-green-600" />
              Schedule a Pickup
            </button>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Delivery person on motorcycle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
