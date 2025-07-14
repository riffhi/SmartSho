import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ChatbotSidebar from './components/ChatbotSidebar';
import GreenBharatSection from './components/GreenBharatSection';
import RewardsPage from './components/RewardsPage';

import { CartProvider } from './context/CartContext';
import { products, categories, featuredProducts, bestSellers } from './data/products';
import { ecoProducts } from './data/ecoProducts';
import { Product } from './types';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate('/category');
  };

  const handleCartClick = () => setIsCartOpen(true);
  const handleGreenBharatClick = () => {
    setSelectedCategory(null);
    navigate('/greenbharat');
  };

  const resetCategory = () => {
    setSelectedCategory(null);
    navigate('/');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={handleCartClick}
          onCategoryClick={handleCategoryClick}
          onGreenBharatClick={handleGreenBharatClick}
          onChatClick={() => setIsChatOpen(true)}
        />

        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CategoryGrid categories={categories} onCategoryClick={handleCategoryClick} />
                <ProductGrid products={featuredProducts} title="Featured Products" onProductClick={handleProductClick} />
                <ProductGrid products={bestSellers} title="Best Sellers" onProductClick={handleProductClick} />
              </>
            }
          />

          {/* GreenBharat */}
          <Route
            path="/greenbharat"
            element={
              <>
                <div className="bg-white py-6 border-b">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-green-600">GreenBharat - Eco-Friendly Products</h1>
                      <button onClick={resetCategory} className="text-pink-600 hover:text-pink-700 font-medium">
                        ← Back to Home
                      </button>
                    </div>
                  </div>
                </div>
                <GreenBharatSection products={ecoProducts} onProductClick={handleProductClick} />
              </>
            }
          />

          {/* Rewards */}
          <Route path="/rewards" element={<RewardsPage />} />

          {/* Category View */}
          <Route
            path="/category"
            element={
              <>
                <div id="products">
                  <div className="bg-white py-6 border-b">
                    <div className="max-w-7xl mx-auto px-4">
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">{selectedCategory}</h1>
                        <button onClick={resetCategory} className="text-pink-600 hover:text-pink-700 font-medium">
                          ← Back to Home
                        </button>
                      </div>
                    </div>
                  </div>
                  <ProductGrid
                    products={filteredProducts}
                    title={`${selectedCategory} Products`}
                    onProductClick={handleProductClick}
                  />
                </div>
              </>
            }
          />
        </Routes>

        <Footer />

        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
        />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <ChatbotSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default App;
