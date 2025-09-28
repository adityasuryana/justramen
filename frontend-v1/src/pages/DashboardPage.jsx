
import React, { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch total accounts
  const fetchTotalAccounts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/accounts');
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response received:', text.substring(0, 200));
        throw new Error('Server returned non-JSON response. Backend may not be running.');
      }

      const accounts = await response.json();
      setTotalAccounts(Array.isArray(accounts) ? accounts.length : 0);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setTotalAccounts('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalAccounts();
  }, []);

  return (
    <div className="">
      <h1 className="font-product text-3xl font-bold tracking-wider">Dashboard</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="card bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Accounts</h2>
          <p className="text-2xl">
            {loading ? 'Loading...' : (totalAccounts === 'Error' ? 'Server Error' : totalAccounts)}
          </p>
          {totalAccounts === 'Error' && (
            <p className="text-sm text-red-500 mt-1">Backend server may not be running</p>
          )}
        </div>

        <div className="card bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Menu</h2>
          <p className="text-2xl">$12,345</p>
        </div>

        <div className="card bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-2xl">$12,345</p>
        </div>
      </div>
    </div>
  )
}
