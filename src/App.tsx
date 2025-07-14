import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { products, categories, featuredProducts, bestSellers } from './data/products';
import { ecoProducts } from './data/ecoProducts';
import GreenBharatSection from './components/GreenBharatSection';
import { Product } from './types';
import ChatbotSidebar from './components/ChatbotSidebar';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showGreenBharat, setShowGreenBharat] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 🚀 Scroll to Hero section if query param is set
 useEffect(() => {
  const params = new URLSearchParams(location.search);
  const shouldScroll = params.get('scrollTo') === 'hero';

  if (shouldScroll) {
    // Reset state before scrolling
    setSelectedCategory(null);
    setShowGreenBharat(false);

    // Delay scroll slightly so Hero renders
    setTimeout(() => {
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
        navigate('/', { replace: true }); // clean URL
      }
    }, 100); // wait for DOM update
  }
}, [location, navigate]);


  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowGreenBharat(false);
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCartClick = () => setIsCartOpen(true);

  const handleGreenBharatClick = () => {
    setShowGreenBharat(true);
    setSelectedCategory(null);
  };

  const resetCategory = () => {
    setSelectedCategory(null);
    setShowGreenBharat(false);
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
        
        {!selectedCategory && !showGreenBharat && (
          <>
            <Hero />
            <CategoryGrid categories={categories} onCategoryClick={handleCategoryClick} />
            <ProductGrid
              products={featuredProducts}
              title="Featured Products"
              onProductClick={handleProductClick}
            />
            <ProductGrid
              products={bestSellers}
              title="Best Sellers"
              onProductClick={handleProductClick}
            />
          </>
        )}

        {showGreenBharat && (
          <div>
            <div className="bg-white py-6 border-b">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-green-600">GreenBharat - Eco-Friendly Products</h1>
                  <button
                    onClick={resetCategory}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            </div>
            <GreenBharatSection
              products={ecoProducts}
              onProductClick={handleProductClick}
            />
          </div>
        )}

        {selectedCategory && (
          <div id="products">
            <div className="bg-white py-6 border-b">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-800">{selectedCategory}</h1>
                  <button
                    onClick={resetCategory}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
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
        )}

        <Footer />

        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
        />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />

        <ChatbotSidebar
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
