import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white overflow-hidden">
      
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Smart Shopping
              </h1>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Trusted by Millions
              </h2>
            </div>
            
            <p className="text-xl lg:text-2xl opacity-90 max-w-lg">
              Discover amazing products at unbeatable prices. Shop from millions of products across categories.
            </p>
            
            <button className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Shop Now
            </button>
            
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">10M+</div>
                <div className="text-sm opacity-80">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50L+</div>
                <div className="text-sm opacity-80">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm opacity-80">Suppliers</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Models */}
          <div className="relative">
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Fashion Model 1"
                  className="w-48 h-64 object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="relative mt-8">
                <img
                  src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Fashion Model 2"
                  className="w-48 h-64 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-semibold">50% OFF</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-semibold">Free Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;