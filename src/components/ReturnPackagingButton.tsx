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

interface ReturnPackagingButtonProps {
  onReturnSubmitted?: () => void;
}

const mockUser: UserInfo = {
  userId: '64e496b61c9b8df48ff1cb7e', // your working test userId
  pickupLocation: {
    address: '123 Test Street, Test City',
    pincode: '110001',
    lat: 28.6139,
    lon: 77.2090,
  },
};

const mockOrderItem: OrderItem = {
  packageId: 'PKG_TEST_001',
  orderId: 'ORD_TEST_001',
  productName: 'Eco-Friendly Cleaning Kit',
};

const BACKEND_API_URL = 'https://smartsho-1.onrender.com/api';

const ReturnPackagingButton: React.FC<ReturnPackagingButtonProps> = ({ onReturnSubmitted }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const showMessage = (success: boolean, msg: string) => {
    setIsSuccess(success);
    setMessage(msg);
    setLoading(false);
  };

  const handleReturnRequest = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API_URL}/returns/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: mockUser.userId,
          packageId: mockOrderItem.packageId,
          orderId: mockOrderItem.orderId,
          pickupLocation: mockUser.pickupLocation,
        }),
      });
      const data = await res.json();
      showMessage(res.ok, data.message || 'Return submitted.');
    } catch (err) {
      showMessage(false, 'Error submitting return request.');
    }
  };

  const handleSchedule = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API_URL}/admin/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: mockOrderItem.packageId,
          newStatus: 'scheduled',
        }),
      });
      const data = await res.json();
      showMessage(res.ok, data.message || 'Status updated.');
    } catch {
      showMessage(false, 'Error scheduling pickup.');
    }
  };

  const handleCollect = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API_URL}/admin/package-collected`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: mockOrderItem.packageId,
          deliveryPartnerId: 'DP_001',
          qualityVerified: true,
          verificationNotes: 'Package looks fine',
        }),
      });
      const data = await res.json();
      showMessage(res.ok, data.message || 'Marked collected.');
    } catch {
      showMessage(false, 'Error marking collected.');
    }
  };

  const handleRecycle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API_URL}/admin/package-recycled`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: mockOrderItem.packageId }),
      });
      const data = await res.json();
      showMessage(res.ok, data.message || 'Marked recycled.');
    } catch {
      showMessage(false, 'Error marking recycled.');
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
        className="mt-2 w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
      >
        Submit Return Request
      </button>

      <button
        onClick={handleSchedule}
        disabled={loading}
        className="mt-2 w-full px-4 py-2 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-700"
      >
        Schedule Pickup (Admin)
      </button>

      <button
        onClick={handleCollect}
        disabled={loading}
        className="mt-2 w-full px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700"
      >
        Mark as Collected (Admin)
      </button>

      <button
        onClick={handleRecycle}
        disabled={loading}
        className="mt-2 w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
      >
        Mark as Recycled (Admin)
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
