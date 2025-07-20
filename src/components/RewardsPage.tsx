// import React from 'react';

// // Define the structure for a reward item
// interface Reward {
//   id: string;
//   image: string; // Placeholder image URL or SVG representation
//   title: string;
//   description: string;
//   greenBitsRequired: number;
// }

// // Props interface for RewardsPage
// interface RewardsPageProps {
//   onReturnClick?: () => void;
// }

// // Mock data for the rewards based on the provided image
// const rewardsData: Reward[] = [
//   {
//     id: '1',
//     image: 'https://placehold.co/100x60/FF69B4/ffffff?text=Gift+Card', // Pink placeholder for Meesho theme
//     title: 'Meesho Gift Card', // Changed from SmartSho
//     description: 'A ₹100 gift card to use on Meesho.com.', // Changed from SmartSho
//     greenBitsRequired: 75,
//   },
//   {
//     id: '2',
//     image: 'https://placehold.co/100x60/FF69B4/ffffff?text=Coupon', // Pink placeholder
//     title: 'Discount Coupon',
//     description: 'Get 20% off on your next Greenovation purchase.',
//     greenBitsRequired: 100,
//   },
//   {
//     id: '3',
//     image: 'https://placehold.co/100x60/FF69B4/ffffff?text=Shipping', // Pink placeholder
//     title: 'Free Shipping',
//     description: 'Enjoy free shipping on your next Meesho order.', // Changed from SmartSho
//     greenBitsRequired: 25,
//   },
//   {
//     id: '4',
//     image: 'https://placehold.co/100x60/FF69B4/ffffff?text=Membership', // Pink placeholder
//     title: 'Meesho Premium Membership', // Changed from SmartSho
//     description: 'Get a one-month Meesho Premium membership.', // Changed from SmartSho
//     greenBitsRequired: 150,
//   },
// ];

// // RewardCard Component
// const RewardCard: React.FC<{ reward: Reward }> = ({ reward }) => {
//   const handleRedeem = () => {
//     // In a real application, this would trigger an API call
//     // to redeem the reward and deduct GreenBits from the user's balance.
//     // Replaced alert with a more user-friendly message box or modal in a real app.
//     console.log(`Attempting to redeem "${reward.title}" for ${reward.greenBitsRequired} GreenBits.`);
//     alert(`Redeem functionality for "${reward.title}" is under development.`); // Using alert for now as per previous context
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center transform hover:-translate-y-1">
//       <img src={reward.image} alt={reward.title} className="mb-4 rounded-md border border-gray-200 p-2" />
//       <h3 className="text-xl font-semibold text-gray-800 mb-2">{reward.title}</h3>
//       <p className="text-sm text-gray-600 mb-4 flex-grow">{reward.description}</p>
//       <div className="text-lg font-bold text-green-600 mb-4">
//         GreenBits Required: {reward.greenBitsRequired}
//       </div>
//       <button
//         onClick={handleRedeem}
//         className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transform hover:scale-105"
//       >
//         Redeem
//       </button>
//     </div>
//   );
// };

// // Main RewardsPage Component
// const RewardsPage: React.FC<RewardsPageProps> = ({ onReturnClick }) => {
//   return (
//     <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
//       {/* Pink Header */}
//       <header className="bg-gradient-to-r from-pink-600 to-pink-700 text-white p-4 shadow-lg">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-3xl font-extrabold tracking-tight">Meesho</h1> {/* Meesho Logo/Text */}
//           <nav>
//             <ul className="flex space-x-6 text-lg">
//               <li><a href="#" className="hover:text-pink-200 transition-colors duration-200">Home</a></li>
//               <li><a href="#" className="hover:text-pink-200 transition-colors duration-200">My Orders</a></li>
//               {onReturnClick && (
//                 <li>
//                   <button 
//                     onClick={onReturnClick}
//                     className="hover:text-pink-200 transition-colors duration-200 font-medium"
//                   >
//                     📦 My Returns
//                   </button>
//                 </li>
//               )}
//               <li><a href="#" className="hover:text-pink-200 transition-colors duration-200">Account</a></li>
//               <li><a href="#" className="hover:text-pink-200 transition-colors duration-200">Help</a></li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
       

//         <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border border-pink-200">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center leading-tight">
//             <span role="img" aria-label="crown" className="mr-3 text-yellow-500 text-5xl">👑</span> Meesho Rewards
//           </h2>
//           <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
//             Unlock exclusive benefits and claim exciting shopping rewards with your GreenBits!
//           </p>
//         </div>

//         {/* Rewards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {rewardsData.map((reward) => (
//             <RewardCard key={reward.id} reward={reward} />
//           ))}
//         </div>
//       </main>

//       {/* Enhanced Footer */}
      
//     </div>
//   );
// };

// export default RewardsPage;



import React, { useState, useEffect } from 'react';
import { Gift, Leaf, ShoppingBag, Coffee, Zap } from 'lucide-react';
import GreenBitsService from './GreenBitsService';

interface RewardsPageProps {
  onReturnClick: () => void;
}

interface Reward {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
}

const rewards: Reward[] = [
  {
    id: 'discount-10',
    name: '10% Discount Coupon',
    cost: 50,
    description: 'Get 10% off on your next purchase',
    icon: ShoppingBag,
    category: 'Shopping'
  },
  {
    id: 'coffee-voucher',
    name: 'Free Coffee Voucher',
    cost: 30,
    description: 'Enjoy a free coffee at partner cafes',
    icon: Coffee,
    category: 'Food & Beverage'
  },
  {
    id: 'plant-kit',
    name: 'Mini Plant Kit',
    cost: 100,
    description: 'Grow your own herbs at home',
    icon: Leaf,
    category: 'Eco-Friendly'
  },
  {
    id: 'energy-credit',
    name: 'Energy Bill Credit',
    cost: 200,
    description: '₹50 credit towards your electricity bill',
    icon: Zap,
    category: 'Utilities'
  }
];

const RewardsPage: React.FC<RewardsPageProps> = ({ onReturnClick }) => {
  const [greenBitsBalance, setGreenBitsBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // const userId = '60d0fe4f3b4d5a001c8e0d1d'; 
 const userId = '64e496b61c9b8df48ff1cb7e';


  useEffect(() => {
    fetchGreenBitsBalance();
  }, []);

  const fetchGreenBitsBalance = async () => {
    try {
      setLoading(true);
      const data = await GreenBitsService.getUserGreenBits(userId);
      setGreenBitsBalance(data.balance);
    } catch (error) {
      console.error('Error fetching GreenBits balance:', error);
      setMessage({ text: 'Could not load GreenBits balance. Make sure backend is running.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (reward: Reward) => {
    if (greenBitsBalance < reward.cost) {
      setMessage({ text: 'Insufficient GreenBits balance!', type: 'error' });
      return;
    }

    try {
      setRedeeming(reward.id);
      setMessage(null);

      await GreenBitsService.redeemGreenBits(userId, reward.cost, reward.name);
      
      setGreenBitsBalance(prev => prev - reward.cost);
      setMessage({ text: `Successfully redeemed ${reward.name}!`, type: 'success' });
    } catch (error) {
      console.error('Error redeeming reward:', error);
      setMessage({ text: 'Failed to redeem reward. Please try again.', type: 'error' });
    } finally {
      setRedeeming(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🌱 GreenBits Rewards</h1>
          <p className="text-lg text-gray-600 mb-6">
            Redeem your eco-friendly actions for amazing rewards!
          </p>
          
          {/* Balance Display */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto mb-6">
            <div className="flex items-center justify-center mb-2">
              <Leaf className="w-8 h-8 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Your GreenBits</span>
            </div>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-24 mx-auto"></div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-green-600">{greenBitsBalance}</div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={onReturnClick}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Return Packaging to Earn More
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`max-w-md mx-auto mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rewards.map((reward) => {
            const IconComponent = reward.icon;
            const canAfford = greenBitsBalance >= reward.cost;
            const isRedeeming = redeeming === reward.id;

            return (
              <div
                key={reward.id}
                className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
                  canAfford ? 'hover:shadow-xl hover:scale-105' : 'opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    canAfford ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      canAfford ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{reward.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                  
                  <div className="flex items-center justify-center mb-4">
                    <Leaf className="w-4 h-4 text-green-600 mr-1" />
                    <span className="font-bold text-green-600">{reward.cost}</span>
                  </div>
                  
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford || isRedeeming}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      canAfford && !isRedeeming
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isRedeeming ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Redeeming...
                      </div>
                    ) : canAfford ? (
                      'Redeem'
                    ) : (
                      'Insufficient GreenBits'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* How to Earn More */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Earn More GreenBits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Return Packaging</h3>
              <p className="text-sm text-gray-600">Return product packaging to earn 10-50 GreenBits per item</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Eco-Friendly Purchases</h3>
              <p className="text-sm text-gray-600">Buy sustainable products to earn bonus GreenBits</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Referrals</h3>
              <p className="text-sm text-gray-600">Invite friends to join and earn GreenBits for each referral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;