import React, { useState, useEffect } from 'react';
import ReturnPackagingButton from './ReturnPackagingButton';

interface ReturnedPackage {
  _id: string;
  packageId: string;
  orderId: string;
  requestTimestamp: string;
  status: string;
  greenBitsEarned: number;
}

interface GreenBitsHistory {
  _id: string;
  userId: string;
  type: 'earned' | 'spent';
  amount: number;
  referenceId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface GreenBitsData {
  balance: number;
  history: GreenBitsHistory[];
}

const MyReturnsPage: React.FC = () => {
  const [returnedPackages, setReturnedPackages] = useState<ReturnedPackage[]>([]);
  const [greenBitsData, setGreenBitsData] = useState<GreenBitsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [greenBitsLoading, setGreenBitsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [greenBitsError, setGreenBitsError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState('');

  const userId = '64bdf7e5615f4e4ec6d098a3'; // Replace with real userId when auth available
  const greenBitsUserId = '64e496b61c9b8df48ff1cb7e'; // Your GreenBits API userId

  const fetchReturnedPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://smartsho-1.onrender.com/api/returns/history/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch return history');
      const data = await response.json();
      
      if (data.success) {
        setReturnedPackages(data.returns || []);
      } else {
        throw new Error(data.message || 'Failed to fetch return history');
      }
    } catch (err) {
      console.error('Error fetching returns:', err);
      setError('Could not connect to backend. Make sure it is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGreenBitsData = async () => {
    try {
      setGreenBitsLoading(true);
      const response = await fetch(`https://smartsho-1.onrender.com/api/greenbits/${greenBitsUserId}`);
      if (!response.ok) throw new Error('Failed to fetch GreenBits data');
      const data = await response.json();
      if (data.success) {
        setGreenBitsData(data.data);
      } else {
        throw new Error('GreenBits API returned error');
      }
    } catch (err) {
      console.error('Error fetching GreenBits:', err);
      setGreenBitsError('Could not fetch GreenBits data.');
    } finally {
      setGreenBitsLoading(false);
    }
  };

  useEffect(() => {
    fetchReturnedPackages();
    fetchGreenBitsData();
  }, []);

  const handleReturnSubmitted = () => {
    fetchReturnedPackages();
    fetchGreenBitsData(); // Refresh GreenBits data when new return is submitted
  };

  const handleAdminAction = async (packageId: string, action: 'schedule' | 'collect' | 'recycle') => {
    let endpoint = '';
    let payload: any = { packageId };

    switch (action) {
      case 'schedule':
        endpoint = '/admin/update-status';
        payload.newStatus = 'scheduled';
        break;
      case 'collect':
        endpoint = '/admin/package-collected';
        payload = {
          packageId,
          deliveryPartnerId: 'DP_001',
          qualityVerified: true,
          verificationNotes: 'Verified via frontend',
        };
        break;
      case 'recycle':
        endpoint = '/admin/package-recycled';
        break;
    }

    try {
      const res = await fetch(`https://smartsho-1.onrender.com/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(data.message || 'Action successful.');
        fetchReturnedPackages();
        fetchGreenBitsData(); // Refresh GreenBits data after admin actions
      } else {
        setActionMessage(data.message || 'Action failed.');
      }
    } catch (err) {
      setActionMessage('Failed to connect to server.');
    }
  };

  const renderStatusBadge = (status: string) => {
    let colorClass = 'bg-gray-100 text-gray-800';
    if (status === 'recycled') colorClass = 'bg-green-100 text-green-800';
    else if (status === 'collected') colorClass = 'bg-blue-100 text-blue-800';
    else if (status === 'scheduled') colorClass = 'bg-yellow-100 text-yellow-800';
    else if (status === 'requested') colorClass = 'bg-purple-100 text-purple-800';

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
        {status}
      </span>
    );
  };

  const renderGreenBitsTypeBadge = (type: 'earned' | 'spent') => {
    const colorClass = type === 'earned' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
    
    return (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
        {type === 'earned' ? '+ Earned' : '- Spent'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white font-sans flex flex-col">
      <main className="flex-grow max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

        {/* 🔁 Return Submission Section */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">♻️ Return Packaging</h2>
          <p className="text-gray-600 mb-4 text-sm">Help reduce waste by returning packaging of eligible products.</p>
          <ReturnPackagingButton onReturnSubmitted={handleReturnSubmitted} />
        </div>

        {/* 🌱 GreenBits Balance */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">🌱 Your GreenBits Balance</h2>
          {greenBitsLoading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Loading GreenBits...</p>
            </div>
          ) : greenBitsError ? (
            <div className="text-center">
              <p className="text-red-600 mb-4">{greenBitsError}</p>
              <button
                onClick={fetchGreenBitsData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="text-center text-3xl font-bold text-green-700">
              Current Balance: {greenBitsData?.balance || 0} GreenBits 🌱
            </div>
          )}
          {actionMessage && (
            <div className="mt-4 text-center text-sm text-blue-700 bg-blue-50 rounded-lg p-2">{actionMessage}</div>
          )}
        </div>

        {/* 📦 Return History Table */}
        <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Return History</h3>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Loading return history...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchReturnedPackages}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Retry
              </button>
            </div>
          ) : returnedPackages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Package ID</th>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">GreenBits</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {returnedPackages.map((pkg) => (
                    <tr key={pkg._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{pkg.packageId || pkg._id}</td>
                      <td className="px-6 py-4 text-gray-600">{pkg.orderId}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(pkg.requestTimestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{renderStatusBadge(pkg.status)}</td>
                      <td className="px-6 py-4 font-bold text-green-600">{pkg.greenBitsEarned || 0}</td>
                      <td className="px-6 py-4 space-x-1 text-xs">
                        <button
                          onClick={() => handleAdminAction(pkg.packageId || pkg._id, 'schedule')}
                          className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-300"
                        >
                          Schedule
                        </button>
                        <button
                          onClick={() => handleAdminAction(pkg.packageId || pkg._id, 'collect')}
                          className="bg-blue-200 text-blue-800 px-2 py-1 rounded hover:bg-blue-300"
                        >
                          Collect
                        </button>
                        <button
                          onClick={() => handleAdminAction(pkg.packageId || pkg._id, 'recycle')}
                          className="bg-green-200 text-green-800 px-2 py-1 rounded hover:bg-green-300"
                        >
                          Recycle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No packages returned yet. Start recycling to earn GreenBits!
            </p>
          )}
        </div>

        {/* 🧾 GreenBits History Table */}
        <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">GreenBits Transaction History</h3>

          {greenBitsLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Loading transaction history...</p>
            </div>
          ) : greenBitsError ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{greenBitsError}</p>
              <button
                onClick={fetchGreenBitsData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Retry
              </button>
            </div>
          ) : greenBitsData?.history && greenBitsData.history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Reference</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {greenBitsData.history.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{renderGreenBitsTypeBadge(transaction.type)}</td>
                      <td className="px-6 py-4 font-bold">
                        <span className={transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'}>
                          {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-800">{transaction.description}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{transaction.referenceId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No GreenBits transactions yet. Start recycling to earn your first GreenBits!
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyReturnsPage;