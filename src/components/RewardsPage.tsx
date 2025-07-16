import React from 'react';

// Define the structure for a reward item
interface Reward {
  id: string;
  image: string; // Placeholder image URL or SVG representation
  title: string;
  description: string;
  greenBitsRequired: number;
}

// Mock data for the rewards based on the provided image
const rewardsData: Reward[] = [
  {
    id: '1',
    image: 'https://placehold.co/100x60/FF69B4/ffffff?text=Gift+Card', // Pink placeholder for Meesho theme
    title: 'Meesho Gift Card', // Changed from SmartSho
    description: 'A ₹100 gift card to use on Meesho.com.', // Changed from SmartSho
    greenBitsRequired: 75,
  },
  {
    id: '2',
    image: 'https://placehold.co/100x60/FF69B4/ffffff?text=Coupon', // Pink placeholder
    title: 'Discount Coupon',
    description: 'Get 20% off on your next Greenovation purchase.',
    greenBitsRequired: 100,
  },
  {
    id: '3',
    image: 'https://placehold.co/100x60/FF69B4/ffffff?text=Shipping', // Pink placeholder
    title: 'Free Shipping',
    description: 'Enjoy free shipping on your next Meesho order.', // Changed from SmartSho
    greenBitsRequired: 25,
  },
  {
    id: '4',
    image: 'https://placehold.co/100x60/FF69B4/ffffff?text=Membership', // Pink placeholder
    title: 'Meesho Premium Membership', // Changed from SmartSho
    description: 'Get a one-month Meesho Premium membership.', // Changed from SmartSho
    greenBitsRequired: 150,
  },
];

// RewardCard Component
const RewardCard: React.FC<{ reward: Reward }> = ({ reward }) => {
  const handleRedeem = () => {
    // In a real application, this would trigger an API call
    // to redeem the reward and deduct GreenBits from the user's balance.
    // Replaced alert with a more user-friendly message box or modal in a real app.
    console.log(`Attempting to redeem "${reward.title}" for ${reward.greenBitsRequired} GreenBits.`);
    alert(`Redeem functionality for "${reward.title}" is under development.`); // Using alert for now as per previous context
  };

  return (
    <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center transform hover:-translate-y-1">
      <img src={reward.image} alt={reward.title} className="mb-4 rounded-md border border-gray-200 p-2" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{reward.title}</h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">{reward.description}</p>
      <div className="text-lg font-bold text-green-600 mb-4">
        GreenBits Required: {reward.greenBitsRequired}
      </div>
      <button
        onClick={handleRedeem}
        className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transform hover:scale-105"
      >
        Redeem
      </button>
    </div>
  );
};

// Main RewardsPage Component
const RewardsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* Pink Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Meesho</h1> {/* Meesho Logo/Text */}
          <nav>
            <ul className="flex space-x-6 text-lg">
              <li><a href="#" className="hover:text-pink-200 transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:text-pink-200 transition-colors duration-200">My Orders</a></li>
              <li><a href="#" className="hover:text-pink-200 transition-colors duration-200">Account</a></li>
              <li><a href="#" className="hover:text-pink-200 transition-colors duration-200">Help</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border border-pink-200">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center leading-tight">
            <span role="img" aria-label="crown" className="mr-3 text-yellow-500 text-5xl">👑</span> Meesho Rewards
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Unlock exclusive benefits and claim exciting shopping rewards with your GreenBits!
          </p>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewardsData.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Get to Know Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition-colors">About Meesho</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Press Releases</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Meesho Cares</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Gift a Smile</a></li>
            </ul>
          </div>

          {/* Column 2: Connect with us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect with us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">LinkedIn</a></li>
            </ul>
          </div>

          {/* Column 3: Make Money with Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Sell on Meesho</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Sell under Meesho Accelerator</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Meesho Global Selling</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Become an Affiliate</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Advertise Your Products</a></li>
            </ul>
          </div>

          {/* Column 4: Let Us Help You */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition-colors">COVID-19 and Meesho</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Your Account</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Returns Centre</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">100% Purchase Protection</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Meesho App Download</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Help</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
          <p>&copy; {new Date().getFullYear()} Meesho. All rights reserved.</p> {/* Changed from SmartSho */}
        </div>
      </footer>
    </div>
  );
};

export default RewardsPage;