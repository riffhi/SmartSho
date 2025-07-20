import React from 'react';
import { Leaf, Coins } from 'lucide-react';
import { Product } from '../types';
import EcoProductCard from './EcoProductCard';


interface GreenBharatSectionProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onGreenBitsClick: () => void;
}

const GreenBharatSection: React.FC<GreenBharatSectionProps> = ({ products, onProductClick, onGreenBitsClick }) => {
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-green-50 py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white p-4 rounded-full shadow-lg mr-4">
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-5xl font-bold text-gray-800">
                <span className="text-green-600">ECO-</span>
                <span className="text-gray-600">FRIENDLY</span>
              </h1>
              <div className="ml-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                Products displaying an eco-friendly badge are certified as environmentally friendly, 
                with various certificates tailored to specific product categories. Learn More in Educational Section
              </p>
            </div>
          </div>

          {/* Coin Button */}
          <div className="absolute top-6 right-6">
           <button
          onClick={onGreenBitsClick}
           className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full shadow-md transition-colors"
>
            <Coins className="w-5 h-5" />
            <span className="font-semibold">GreenBits</span>
</button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <EcoProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No eco-friendly products found</p>
            </div>
          )}
        </div>
      </section>

      {/* Educational Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Eco-Friendly Products?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Reduce Carbon Footprint</h3>
                <p className="text-gray-600">Our eco-friendly products help reduce carbon emissions by up to 80% compared to traditional alternatives.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainable Materials</h3>
                <p className="text-gray-600">Made from renewable resources like bamboo, jute, and recycled materials for a sustainable future.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Certified Quality</h3>
                <p className="text-gray-600">All products are certified by environmental agencies ensuring quality and sustainability standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GreenBharatSection;
