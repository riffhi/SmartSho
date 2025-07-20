import React, { useState } from 'react';

interface OrderItem {
  packageId: string;
  orderId: string;
  productName: string;
}

interface UserInfo {
  userId: string;
  pickupLocation: {
    address: string;
    pincode: string;
    lat?: number;
    lon?: number;
  };
}

const mockUser: UserInfo = {
  userId: '60d0fe4f3b4d5a001c8e0d1d',
  pickupLocation: {
    address: '123 Main St, Anytown',
    pincode: '123456',
    lat: 28.6139,
    lon: 77.2090,
  },
};

const mockOrderItem: OrderItem = {
  packageId: 'PKG_ABC_12345',
  orderId: 'ORD_XYZ_67890',
  productName: 'Eco-Friendly Cleaning Kit',
};

const BACKEND_API_URL = 'http://localhost:5000/api';

const ReturnPackagingButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReturnRequest = async () => {
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch(`${BACKEND_API_URL}/returns/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: mockUser.userId,
          packageId: mockOrderItem.packageId,
          orderId: mockOrderItem.orderId,
          pickupLocation: mockUser.pickupLocation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Return request submitted successfully!');
      } else {
        setIsSuccess(false);
        setMessage(data.message || 'Failed to submit return request.');
      }
    } catch (error: any) {
      console.error(error);
      setIsSuccess(false);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setMessage('Could not connect to backend. Make sure it is running.');
      } else {
        setMessage('An error occurred while submitting the request.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow mb-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Return Your Packaging 📦</h2>
      <p className="text-gray-600 mb-2">Product: {mockOrderItem.productName}</p>
      <p className="text-gray-600 mb-2">Order ID: {mockOrderItem.orderId}</p>

      <button
        onClick={handleReturnRequest}
        disabled={loading}
        className={`mt-4 w-full px-4 py-2 rounded-lg font-bold text-white transition ${
          loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Submitting...' : 'Submit Return Request'}
      </button>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${
            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ReturnPackagingButton;
