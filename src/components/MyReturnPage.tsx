import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReturnPackagingButton from '../components/ReturnPackagingButton';

const mockReturnedPackages = [
  { id: 'pkg001', orderId: 'ORD-12345', date: '2023-03-10', status: 'Recycled', greenBits: 10 },
  { id: 'pkg002', orderId: 'ORD-67890', date: '2023-03-15', status: 'Collected', greenBits: 0 },
  { id: 'pkg003', orderId: 'ORD-11223', date: '2023-03-20', status: 'Scheduled for Pickup', greenBits: 0 },
];

const MyReturnsPage: React.FC = () => {
  const navigate = useNavigate();
  const totalGreenBitsEarned = mockReturnedPackages.reduce((sum, pkg) => sum + pkg.greenBits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white font-sans flex flex-col">
      <main className="flex-grow max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

        {/* 🔁 Return Submission Section */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            ♻️ Return Packaging
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Help reduce waste by returning packaging of eligible products.
          </p>
          <ReturnPackagingButton />
        </div>

        {/* 🌱 Summary + History */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border border-gray-200">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">📦 Your Returned Packages</h2>
          <p className="text-lg text-gray-600 text-center mb-6">
            Track your eco-friendly contributions and GreenBits earned.
          </p>
          <div className="text-center text-2xl font-bold text-green-700">
            Total GreenBits Earned: {totalGreenBitsEarned} 🌱
          </div>
        </div>

        {/* 🧾 Return History Table */}
        <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Return History</h3>

          {mockReturnedPackages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Package ID</th>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">GreenBits</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {mockReturnedPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{pkg.id}</td>
                      <td className="px-6 py-4 text-gray-600">{pkg.orderId}</td>
                      <td className="px-6 py-4 text-gray-600">{pkg.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            pkg.status === 'Recycled'
                              ? 'bg-green-100 text-green-800'
                              : pkg.status === 'Collected'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {pkg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-green-600">{pkg.greenBits}</td>
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
      </main>
    </div>
  );
};

export default MyReturnsPage;
