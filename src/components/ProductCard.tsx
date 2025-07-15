import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { dispatch } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  const handleProductClick = () => {
    onProductClick(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
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
            <span className="text-white font-semibold">{t('product.outOfStock')}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>

        {/* Ratings + Sustainability */}
        <div className="flex flex-col gap-2 mb-2">
          {/* Ratings */}
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
          </div>

          {/* Sustainability Score */}
          {product.sustainabilityScore !== undefined && (
            <div>
              <span
                className={`inline-block px-2 py-1 rounded-full text-white text-xs font-semibold ${
                  product.sustainabilityScore >= 8
                    ? 'bg-green-600'
                    : product.sustainabilityScore >= 5
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              >
                Sustainability Score: {product.sustainabilityScore}/10
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Delivery */}
        <div className="text-xs text-gray-500 mb-3">
          <div>{t('product.delivery', { days: product.delivery.days })}</div>
          {product.delivery.cashOnDelivery && (
            <div className="text-green-600">{t('product.cod')}</div>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.inStock ? t('product.addToCart') : t('product.outOfStock')}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
