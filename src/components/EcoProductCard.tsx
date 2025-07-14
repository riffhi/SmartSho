import React from 'react';
import { Star, Heart, ShoppingCart, Leaf } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface EcoProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const EcoProductCard: React.FC<EcoProductCardProps> = ({ product, onProductClick }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  const handleProductClick = () => {
    onProductClick(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-green-100"
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.discount && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {product.discount}% OFF
          </div>
        )}
        
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
            BESTSELLER
          </span>
        </div>
        
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-3 text-sm group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
        
        {/* Eco-friendly badges */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-xs text-green-600">
            <Leaf className="w-3 h-3 mr-1" />
            <span>{product.carbonReduction}% Less Carbon Emission</span>
          </div>
          <div className="flex items-center text-xs text-green-600">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Eco-Friendly Badge</span>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm font-semibold"
        >
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};

export default EcoProductCard;