import React, { useState } from 'react';
import { X, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded border-2 overflow-hidden ${
                        selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>

                <div className="flex flex-col gap-2 mb-4">
                  {/* Ratings */}
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                    <span className="ml-1 text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  {/* Sustainability Score */}
                  {product.sustainabilityScore !== undefined && (
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
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
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-800">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Free delivery in {product.delivery.days} days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">7 days easy return</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Cash on delivery available</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Seller Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.seller.name}</p>
                      <p className="text-sm text-gray-600">{product.seller.location}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{product.seller.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
