import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
  onGreenBharatClick: () => void;
  onChatClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onCategoryClick, onGreenBharatClick, onChatClick }) => {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Women Ethnic', 'Women Western', 'Men', 'Kids', 
    'Home & Kitchen', 'Beauty & Health', 'Jewellery & Accessories', 
    'Bags & Footwear', 'Electronics', 'Sports & Fitness'
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">📦 7 Days Easy Return</span>
            <span className="flex items-center">💰 Cash on Delivery</span>
            <span className="flex items-center">💸 Lowest Prices</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:underline">Become a Supplier</button>
            <button className="hover:underline">Investor Relations</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-pink-600 mr-8">meesho</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Try Saree, Kurti or Search by Product Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={onGreenBharatClick}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Leaf className="w-4 h-4" />
              <span className="font-semibold">GreenBharat</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-700 hover:text-pink-600">
              <User className="w-5 h-5" />
              <span className="hidden md:block">Profile</span>
            </button>
            
            <button 
              onClick={onCartClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:block">Cart</span>
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </button>

            <button 
  onClick={onChatClick}
  className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
>
  <img 
    src="/chatbot.png" // ✅ Replace with your image file name
    alt="Chat Icon"
    className="w-10 h-8"
  />
  <span className="hidden md:block">AI Agent</span>
</button>


            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className="whitespace-nowrap text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryClick(category);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-pink-600"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;