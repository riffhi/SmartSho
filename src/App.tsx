import React, { useState, useMemo } from 'react';
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
import { Product } from './types';

// ✅ Dummy RewardsPage component
const RewardsPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center p-8">
    <h1 className="text-4xl font-bold text-yellow-600 mb-4">🎉 Your GreenBits Rewards</h1>
    <p className="text-xl text-gray-700 mb-6">
      You have <span className="font-bold text-yellow-700">142</span> GreenBits.
    </p>
    <p className="text-md text-gray-600 max-w-xl mb-8">
      GreenBits are loyalty points earned by purchasing eco-friendly products.
      Redeem them soon for exclusive discounts and special products.
    </p>
  </div>
);

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showGreenBharat, setShowGreenBharat] = useState(false);
  const [showSupplierPage, setShowSupplierPage] = useState(false);
  const [showSellerLogin, setShowSellerLogin] = useState(false);
  const [showRewardsPage, setShowRewardsPage] = useState(false); // ✅ New state

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

  const resetPageStates = () => {
    setShowGreenBharat(false);
    setShowSupplierPage(false);
    setShowSellerLogin(false);
    setShowRewardsPage(false);
    setSelectedCategory(null);
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
            onLoginSuccess={() => {
              localStorage.setItem('userRole', 'seller');
              setShowSellerLogin(false);
              setShowSupplierPage(true);
            }}
          />
        ) : showSupplierPage ? (
          <SupplierPage onSellerLoginClick={() => setShowSellerLogin(true)} />
        ) : showRewardsPage ? (
          <>
            <RewardsPage />
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

        {!showSupplierPage && !showSellerLogin && !showRewardsPage && <BuyerChatbot />}
      </div>
    </CartProvider>
  );
}

export default App;
