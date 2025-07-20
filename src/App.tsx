import React, { useState, useMemo, useEffect } from 'react';
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
import SupplierPage from './components/SupplierPage';
import BuyerChatbot from './components/BuyerChatbot';
import SellerLogin from './components/SellerLogin';
import SellerSignup from './components/SellerSignup';
import SellerChatbot from './components/SellerChatbot';
import { Product } from './types';
import MyReturnsPage from './components/MyReturnPage';
import RewardsPage from './components/RewardsPage';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [showGreenBharat, setShowGreenBharat] = useState(false);
  const [showSupplierPage, setShowSupplierPage] = useState(false);
  const [showSellerLogin, setShowSellerLogin] = useState(false);
  const [showSellerSignup, setShowSellerSignup] = useState(false);
  const [showRewardsPage, setShowRewardsPage] = useState(false);
  const [showMyReturnsPage, setShowMyReturnsPage] = useState(false);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);

  // Check if seller is already logged in on component mount
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'seller') {
      setIsSellerLoggedIn(true);
    } else {
      setIsSellerLoggedIn(false);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    resetPageStates();
    setTimeout(() => setSelectedCategory(category), 0);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleGreenBharatClick = () => {
    resetPageStates();
    setTimeout(() => setShowGreenBharat(true), 0);
  };

  const handleSupplierClick = () => {
    resetPageStates();
    setTimeout(() => setShowSupplierPage(true), 0);
  };

  const handleMyReturnsClick = () => {
    resetPageStates();
    setTimeout(() => setShowMyReturnsPage(true), 0);
  };

  const resetPageStates = () => {
    setShowGreenBharat(false);
    setShowSupplierPage(false);
    setShowSellerLogin(false);
    setShowSellerSignup(false);
    setShowRewardsPage(false);
    setShowMyReturnsPage(false);
    setSelectedCategory(null);
  };

  const handleSellerLoginSuccess = () => {
    localStorage.setItem('userRole', 'seller');
    setIsSellerLoggedIn(true);
    setShowSellerLogin(false);
    setShowSellerSignup(false);
    setShowSupplierPage(true);
  };

  const handleSellerSignupSuccess = () => {
    localStorage.setItem('userRole', 'seller');
    setIsSellerLoggedIn(true);
    setShowSellerSignup(false);
    setShowSellerLogin(false);
    setShowSupplierPage(true);
  };

  const handleSwitchToSignup = () => {
    setShowSellerLogin(false);
    setShowSellerSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSellerSignup(false);
    setShowSellerLogin(true);
  };

  const handleSellerLogout = () => {
    localStorage.removeItem('userRole');
    setIsSellerLoggedIn(false);
    resetPageStates();
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={handleCartClick}
          onCategoryClick={handleCategoryClick}
          onGreenBharatClick={handleGreenBharatClick}
          onSupplierClick={handleSupplierClick}
        />

        {showSellerLogin ? (
          <SellerLogin 
            onLoginSuccess={handleSellerLoginSuccess} 
            onSwitchToSignup={handleSwitchToSignup}
          />
        ) : showSellerSignup ? (
          <SellerSignup 
            onSignupSuccess={handleSellerSignupSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        ) : showSupplierPage ? (
          <SupplierPage 
            onSellerLoginClick={() => setShowSellerLogin(true)}
            onLogout={handleSellerLogout}
          />
        ) : showMyReturnsPage ? (
          <>
            <MyReturnsPage />
            <div className="text-center py-4">
              <button
                onClick={resetPageStates}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </>
        ) : showRewardsPage ? (
          <>
            <RewardsPage onReturnClick={handleMyReturnsClick} />
            <div className="text-center py-4">
              <button
                onClick={resetPageStates}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </>
        ) : showGreenBharat ? (
          <div>
            <div className="bg-white py-6 border-b">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-green-600">GreenBharat - Eco-Friendly Products</h1>
                  <button
                    onClick={resetPageStates}
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
              onGreenBitsClick={() => {
                setShowRewardsPage(true);
                setShowGreenBharat(false);
              }}
            />
          </div>
        ) : selectedCategory ? (
          <div id="products">
            <div className="bg-white py-6 border-b">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-800">{selectedCategory}</h1>
                  <button
                    onClick={resetPageStates}
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
        ) : (
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

        <Footer />

        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
        />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Fixed chatbot rendering logic */}
        {isSellerLoggedIn && showSupplierPage ? (
          <SellerChatbot />
        ) : (
          !showSupplierPage && !showSellerLogin && !showSellerSignup && !showRewardsPage && !showMyReturnsPage && <BuyerChatbot />
        )}
      </div>
    </CartProvider>
  );
}

export default App;