import React, { useState } from 'react';


interface OrderItem {
  packageId: string;
  orderId: string;
  productName: string;
  // Add other relevant order/package details
}

interface UserInfo {
  userId: string;
  
  pickupLocation: {
    address: string;
    pincode: string;
    lat?: number; // Optional
    lon?: number; // Optional
  };
}

// Mock data for demonstration purposes
const mockUser: UserInfo = {
  userId: '60d0fe4f3b4d5a001c8e0d1d', // Example MongoDB ObjectId for a user
  pickupLocation: {
    address: '123 Main St, Anytown',
    pincode: '123456',
    lat: 28.6139, // Example Delhi latitude
    lon: 77.2090, // Example Delhi longitude
  },
};

const mockOrderItem: OrderItem = {
  packageId: 'PKG_ABC_12345', // Unique ID for the package
  orderId: 'ORD_XYZ_67890',   // Associated order ID
  productName: 'Eco-Friendly Cleaning Kit',
};

// Replace with your actual backend API URL
const BACKEND_API_URL = 'http://localhost:3000/api'; // Or your deployed backend URL

const ReturnPackagingButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReturnRequest = async () => {
    setLoading(true);
    setMessage(''); // Clear previous messages
    setIsSuccess(false);

    const apiUrl = `${BACKEND_API_URL}/returns/request`;
    console.log(`Attempting to fetch from: ${apiUrl}`); // Added for debugging

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If you implement authentication, you'd add an Authorization header here:
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
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
        console.log('Return request successful:', data);
      } else {
        setIsSuccess(false);
        setMessage(data.message || 'Failed to submit return request.');
        console.error('Return request failed:', data);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred while submitting the request.');
      console.error('Network or other error:', error);
      // Provide a more specific hint for common "Failed to fetch" issues
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setMessage('Could not connect to the backend server. Please ensure the backend is running and accessible at ' + BACKEND_API_URL);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-4 m-4">
      <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
      <p className="text-gray-600">Product: {mockOrderItem.productName}</p>
      <p className="text-gray-600">Order ID: {mockOrderItem.orderId}</p>
      <p className="text-gray-600">Package ID: {mockOrderItem.packageId}</p>

      <button
        onClick={handleReturnRequest}
        disabled={loading}
        className={`
          w-full px-4 py-2 rounded-lg font-bold text-white transition-colors duration-200
          ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
          shadow-md hover:shadow-lg
        `}
      >
        {loading ? 'Submitting...' : 'Return Packaging'}
      </button>

      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        * This button will trigger a request to return the packaging for the above item.
        The system will then check for 50+ returns in your area for pickup scheduling.
      </p>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <ReturnPackagingButton />
    </div>
  );
};

export default App;