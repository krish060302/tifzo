export default function Services() {
  const services = [
    'Home Cooked Meals',
    'Tiffins',
    'Fruits',
    'Vegetables',
    'Cakes & Pastries',
    'Food Packets/Parcel',
    'Bakery Items',
    'Meal Boxes',
    'Catering Mini Orders',
    'Snacks & Dry Food',
    'Homemade Sweets',
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What <span className="text-blue-600">Tifzo</span> Delivers ?
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Safe and reliable door-to-door delivery for all types of eatable food items.
        </p>

        <div className="flex flex-wrap gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all cursor-pointer hover:scale-105 shadow-sm hover:shadow-md"
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
