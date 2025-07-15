import React, { useState, useEffect } from 'react';
import { 
  getCacheStats, 
  clearExpiredCache, 
  clearAllCache, 
  precomputeScores,
  getAllCachedScores 
} from '../utils/generateSustainabilityScores';

const CacheManager = () => {
  const [stats, setStats] = useState({ totalEntries: 0, validEntries: 0, expiredEntries: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const commonProducts = [
    'Smartphone', 'Laptop computer', 'LED TV', 'Wireless headphones', 'Tablet',
    'Cotton t-shirt', 'Organic cotton t-shirt', 'Polyester shirt', 'Denim jeans',
    'Stainless steel water bottle', 'Plastic water bottle', 'Glass water bottle',
    'Bamboo toothbrush', 'Plastic toothbrush', 'Electric toothbrush',
    'Electric car', 'Gasoline car', 'Hybrid car', 'Bicycle', 'Electric scooter',
    'Organic vegetables', 'Conventional vegetables', 'Plant-based protein',
    'Rechargeable batteries', 'Disposable batteries', 'Solar charger',
    'Recycled paper', 'Regular paper', 'Refillable pen', 'Disposable pen',
    'Organic fertilizer', 'Chemical fertilizer', 'Solar garden lights'
  ];

  const updateStats = () => {
    const newStats = getCacheStats();
    setStats(newStats);
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-9), `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    updateStats();
  }, []);

  const handlePrecompute = async () => {
    setIsLoading(true);
    setProgress(0);
    addLog('Starting pre-computation...');
    
    try {
      const scores = await precomputeScores(commonProducts);
      addLog(`Pre-computed ${scores.length} product scores`);
      updateStats();
      setProgress(100);
    } catch (error) {
      addLog(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearExpired = () => {
    const removed = clearExpiredCache();
    addLog(`Cleared ${removed} expired entries`);
    updateStats();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all cached scores?')) {
      clearAllCache();
      addLog('Cleared all cached scores');
      updateStats();
    }
  };

  const handleExportCache = () => {
    const cache = getAllCachedScores();
    const dataStr = JSON.stringify(cache, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `sustainability_cache_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    addLog('Cache exported to file');
  };

  const getCacheAge = () => {
    const cache = getAllCachedScores();
    const entries = Object.values(cache);
    if (entries.length === 0) return 'No cache';
    
    const oldestEntry = Math.min(...entries.map(e => e.timestamp));
    const newestEntry = Math.max(...entries.map(e => e.timestamp));
    
    const oldestAge = Math.floor((Date.now() - oldestEntry) / (1000 * 60 * 60));
    const newestAge = Math.floor((Date.now() - newestEntry) / (1000 * 60 * 60));
    
    return `${newestAge}h - ${oldestAge}h old`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Sustainability Score Cache Manager</h2>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-700">Total Entries</h3>
          <p className="text-2xl font-bold text-blue-900">{stats.totalEntries}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-700">Valid Entries</h3>
          <p className="text-2xl font-bold text-green-900">{stats.validEntries}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-700">Expired Entries</h3>
          <p className="text-2xl font-bold text-yellow-900">{stats.expiredEntries}</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Cache Age:</strong> {getCacheAge()} | 
          <strong> Cache Hit Rate:</strong> {stats.totalEntries > 0 ? Math.round((stats.validEntries / stats.totalEntries) * 100) : 0}%
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handlePrecompute}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Pre-computing...' : 'Pre-compute Common Products'}
        </button>
        
        <button
          onClick={updateStats}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Refresh Stats
        </button>
        
        <button
          onClick={handleClearExpired}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Clear Expired
        </button>
        
        <button
          onClick={handleExportCache}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Export Cache
        </button>
        
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Clear All
        </button>
      </div>

      {/* Progress Bar */}
      {isLoading && (
        <div className="mb-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Logs Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Activity Log</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-48 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500">No activity yet...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">{log}</div>
            ))
          )}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-700 mb-2">Usage Instructions:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click "Pre-compute Common Products" to populate cache with common sustainability scores</li>
          <li>• Cached scores are valid for 24 hours to avoid unnecessary API calls</li>
          <li>• Use "Clear Expired" to remove old entries and free up space</li>
          <li>• Export cache to backup your computed scores</li>
          <li>• The cache will automatically load from localStorage on page refresh</li>
        </ul>
      </div>
    </div>
  );
};

export default CacheManager;