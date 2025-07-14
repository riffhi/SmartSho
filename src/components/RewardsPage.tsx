import React from 'react';

const RewardsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">🎁 Meesho Rewards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img src="/giftcard.png" alt="Gift Card" className="mx-auto h-24 mb-4" />
          <h2 className="text-xl font-bold mb-2">Gift Card</h2>
          <p className="text-sm text-gray-600 mb-2">Use 75 GreenBits for ₹100 Meesho Gift Card.</p>
          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Redeem</button>
        </div>
        {/* Repeat for other rewards like Coupons, Free Shipping etc. */}
      </div>
    </div>
  );
};

export default RewardsPage;
