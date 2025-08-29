import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Sidebar from '../components/Sidebar';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';


const DashboardPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const res = await fetch('/api/accounts');
        if (!res.ok) throw new Error('Failed to fetch accounts');
        const data = await res.json();
        setAccounts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAccounts();
  }, []);

  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch('/api/menus');
        if (!res.ok) throw new Error('Failed to fetch menus');
        const data = await res.json();
        setMenus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMenus();
  }, []);

  useEffect(() => {
    async function fetchPromos() {
      try {
        const res = await fetch('/api/promos');
        if (!res.ok) throw new Error('Failed to fetch promos');
        const data = await res.json();
        setPromos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPromos();
  }, []);

  return (
    <div className='min-h-screen mx-auto bg-background'>
      <AdminNavbar />
      
      <h1 className='font-product text-dark font-bold text-3xl px-5 my-7'>Dashboard</h1>

    
      {/* card */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 '>
        <div className='bg-white p-5 rounded-lg shadow bg-light'>
          <h2 className='font-product text-blackPastel font-bold text-xl'>Total Accounts</h2>
          <p className='text-2xl'>{accounts.length}</p>
        </div>

        <div className='bg-white p-5 rounded-lg shadow bg-light'>
          <h2 className='font-product text-blackPastel font-bold text-xl'>Total Menus</h2>
          <p className='text-2xl'>{menus.length}</p>
        </div>

        <div className='bg-white p-5 rounded-lg shadow bg-light'>
          <h2 className='font-product text-blackPastel font-bold text-xl'>Total Promotions</h2>
          <p className='text-2xl'>{promos.length}</p>
        </div>
      </div>

      <div className='m-5 bg-light p-5 rounded-lg'>
        <h1 className='font-product text-blackPastel font-bold text-2xl'>Accounts</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : (
          
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, idx) => (
                <tr key={account._id || idx}>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.password ? '*'.repeat(account.password.length) : ''}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;