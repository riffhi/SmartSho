import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Leaf, Globe, Languages } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
  onGreenBharatClick: () => void;
  onSupplierClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onCartClick,
  onCategoryClick,
  onGreenBharatClick,
  onSupplierClick,
}) => {
  const { state } = useCart();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const categories = [
    'Women Ethnic', 'Women Western', 'Men', 'Kids',
    'Home & Kitchen', 'Beauty & Health', 'Jewellery & Accessories',
    'Bags & Footwear', 'Electronics', 'Sports & Fitness'
  ];

 const popularLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
];


useEffect(() => {
  // Only add the script if it doesn't exist
  if (!document.getElementById('gt-script')) {
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.id = 'gt-script';
    document.body.appendChild(script);
  }

  // Define the callback globally
  (window as any).googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ml,pa,or,as',
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      },
      'google_translate_element'
    );
  };
}, []);

 const triggerGoogleTranslate = (langCode: string) => {
  const trySetLanguage = (attempts = 0) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (!select) {
      if (attempts < 10) setTimeout(() => trySetLanguage(attempts + 1), 500);
      return;
    }
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  };
  trySetLanguage();
};

  const handleLanguageSelect = (langName: string) => {
    triggerGoogleTranslate(langName);
    localStorage.setItem('selected-language', langName);
    setShowLanguageModal(false);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span>📦 7 Days Easy Return</span>
              <span>💰 Cash on Delivery</span>
              <span>💸 Lowest Prices</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={onSupplierClick} className="hover:underline">Become a Supplier</button>
              <button className="hover:underline">Investor Relations</button>
              <button onClick={() => setShowLanguageModal(true)} className="hover:underline flex items-center gap-1">
                <Languages className="w-4 h-4" />
                Language
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-pink-600 mr-8">meesho</h1>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={onGreenBharatClick} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                <Leaf className="w-4 h-4" />
                <span className="font-semibold">{t('nav.greenBharat')}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-pink-600">
                <User className="w-5 h-5" />
                <span className="hidden md:block">{t('nav.profile')}</span>
              </button>
              <button onClick={onCartClick} className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:block">{t('nav.cart')}</span>
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </button>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Category Nav */}
        <nav className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-8 py-3 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryClick(cat)}
                  className="whitespace-nowrap text-gray-700 hover:text-pink-600 font-medium"
                >
                  {t(`categories.${cat.toLowerCase().replace(/\s+/g, '')}`)}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-2 space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryClick(cat);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-pink-600"
              >
                {t(`categories.${cat.toLowerCase().replace(/\s+/g, '')}`)}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Choose Your Language</h2>
              <button onClick={() => setShowLanguageModal(false)}>✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {popularLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="border rounded p-3 flex items-center gap-2 hover:bg-pink-50"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="google_translate_element" style={{ display: 'none' }} />
    </>
  );
};

export default Header;
