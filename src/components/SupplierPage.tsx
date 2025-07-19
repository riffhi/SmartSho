import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, TrendingUp, Users, Package, Zap } from 'lucide-react';
import SellerChatbot from './SellerChatbot';

interface SupplierPageProps {
  onSellerLoginClick: () => void;
  onLogout: () => void;
}

const SupplierPage: React.FC<SupplierPageProps> = ({ onSellerLoginClick, onLogout }) => {
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const userRole = localStorage.getItem('userRole');
      const isLoggedIn = loginStatus && userRole === 'seller';
      
      // Debug logging - remove in production
      console.log('Login Status Check:', {
        loginStatus,
        userRole,
        isLoggedIn
      });
      
      setIsSellerLoggedIn(isLoggedIn);
    };

    // Check initial status
    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);

    // Listen for custom login/logout events
    window.addEventListener('userLogin', checkLoginStatus);
    window.addEventListener('userLogout', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('userLogin', checkLoginStatus);
      window.removeEventListener('userLogout', checkLoginStatus);
    };
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    console.log('Logout clicked'); // Debug log
    
    // Clear all login-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    
    // Update local state immediately
    setIsSellerLoggedIn(false);
    
    // Dispatch custom event to notify chatbot and other components
    window.dispatchEvent(new Event('userLogout'));
    
    // Call the parent logout handler
    if (onLogout) {
      onLogout();
    }
  };

  const handleLogin = () => {
    console.log('Login clicked'); // Debug log
    if (onSellerLoginClick) {
      onSellerLoginClick();
    }
  };

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      title: "Lakhs of",
      subtitle: "Sellers trust Meesho to grow their business across India",
      color: "text-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-pink-500" />,
      title: "Crores of",
      subtitle: "Customers buying from Meesho sellers every month",
      color: "text-pink-500"
    },
    {
      icon: <Package className="w-8 h-8 text-pink-500" />,
      title: "Thousands of",
      subtitle: "Serviceable pincodes across India for delivery",
      color: "text-pink-500"
    },
    {
      icon: <Zap className="w-8 h-8 text-pink-500" />,
      title: "Hundreds of",
      subtitle: "Categories to sell in from fashion to electronics",
      color: "text-pink-500"
    }
  ];

  const features = [
    {
      title: "Zero Commission",
      description: "Start selling with 0% commission on most categories",
      icon: "💰"
    },
    {
      title: "Easy Registration",
      description: "Simple 3-step registration process to start selling",
      icon: "📝"
    },
    {
      title: "Pan India Reach",
      description: "Sell to customers across 26,000+ pincodes in India",
      icon: "🌍"
    },
    {
      title: "Quick Payments",
      description: "Get paid within 7 days of order delivery",
      icon: "⚡"
    },
    {
      title: "Marketing Support",
      description: "Free marketing and promotional support for your products",
      icon: "📢"
    },
    {
      title: "24/7 Support",
      description: "Dedicated seller support team to help you grow",
      icon: "🎧"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Register",
      description: "Sign up with basic details and documents"
    },
    {
      step: "2",
      title: "List Products",
      description: "Upload your products with photos and descriptions"
    },
    {
      step: "3",
      title: "Start Selling",
      description: "Receive orders and start earning money"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-pink-600">meesho</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-pink-600">Sell Online</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">How it works</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Pricing & Commission</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Shipping & Returns</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Grow Business</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Don't have GST?</a>
            </nav>
            <div className="flex space-x-4">
              {/* Debug info - remove in production */}
              <span className="text-xs text-gray-500">
                Status: {isSellerLoggedIn ? 'Logged In' : 'Logged Out'}
              </span>
              
              {!isSellerLoggedIn ? (
                <button 
                  onClick={handleLogin}
                  className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50"
                >
                  Login
                </button>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Sell online to <span className="text-pink-500">Crores of Customers</span>
                </h1>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mt-4">
                  at <span className="text-pink-500">0% Commission</span>
                </h2>
              </div>
              
              <p className="text-xl text-gray-600 max-w-lg">
                Become a Meesho seller and grow your business across India
              </p>
              
              <div className="bg-pink-100 p-4 rounded-lg inline-block">
                <div className="flex items-center space-x-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded font-bold">NEW</span>
                  <span className="text-gray-700">Don't have a GSTIN? You can still sell on Meesho.</span>
                  <button className="text-pink-500 font-semibold hover:underline">Know more</button>
                </div>
              </div>
              
              <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <span>Start Selling</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Happy seller with packages"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-yellow-200 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className={`text-3xl font-bold ${benefit.color} mb-2`}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {benefit.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Meesho for Selling?
            </h2>
            <p className="text-xl text-gray-600">
              Join millions of sellers who trust Meesho to grow their business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How to Start Selling in 3 Easy Steps
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes and start earning today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors">
              Start Your Selling Journey
            </button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Success Stories from Our Sellers
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real sellers who grew their business with Meesho
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt="Seller"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Priya Sharma</h4>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Meesho helped me turn my hobby into a profitable business. I now earn ₹50,000+ monthly selling handmade products!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Selling Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join lakhs of sellers who are already earning with Meesho
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Selling Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Download Seller App
            </button>
          </div>
        </div>
      </section>

      {/* Seller Chatbot - Always visible */}
      <SellerChatbot key={isSellerLoggedIn ? 'logged-in' : 'logged-out'} />
    </div>
  );
};

export default SupplierPage;