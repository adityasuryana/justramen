import React, {useEffect, useState} from 'react'
import AdminNavbar from '../components/AdminNavbar.jsx'

const AccountPage = () => {

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

    // Reusable fetch function
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/accounts');
        if (!res.ok) throw new Error('Failed to fetch accounts');
        const data = await res.json();
        setAccounts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Delete account function
    const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this account?')) return;
      try {
        const res = await fetch(`/api/accounts/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete account');
        await fetchAccounts();
      } catch (err) {
        alert(err.message);
      }
    };
    
    useEffect(() => {
      fetchAccounts();
    }, []);


  return (
    <div className='min-h-screen mx-auto bg-background'>
        <AdminNavbar />

        <div className='mx-5 my-5'>
            <h1 className='font-product text-dark font-bold text-3xl my-3'>Accounts</h1>
            <button onClick={()=>document.getElementById('modal_add').showModal()} className='btn bg-greenPastel text-light hover:bg-greenPastel border-0'>+ Add Account</button>
        </div>

        <dialog id="modal_add" className="modal">
            <div className="modal-box bg-light">
                <h3 className="font-bold text-lg mb-5">{editId ? 'Edit Account' : 'New Account'}</h3>
                <form
                  className='gap-2 flex flex-col'
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmitting(true);
                    try {
                      let res;
                      if (editId) {
                        res = await fetch(`/api/accounts/${editId}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(form),
                        });
                        if (!res.ok) throw new Error('Failed to update account');
                      } else {
                        res = await fetch('/api/accounts', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(form),
                        });
                        if (!res.ok) throw new Error('Failed to create account');
                      }
                      setForm({ name: '', email: '', password: '' });
                      setEditId(null);
                      document.getElementById('modal_add').close();
                      await fetchAccounts();
                    } catch (err) {
                      alert(err.message);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  <div className='grid mb-4'>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="input input-bordered w-100"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className='grid mb-4'>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="your@mail.com"
                      className="input input-bordered w-100"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className='grid mb-4'>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-100"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="modal-action gap-2 flex">
                    <button type="button" className="btn bg-greyPastel hover:bg-greyPastel border-0 text-light" onClick={() => { setEditId(null); setForm({ name: '', email: '', password: '' }); document.getElementById('modal_add').close(); }} disabled={submitting}>Close</button>
                    <button type="submit" className="btn bg-greenPastel hover:bg-greenPastel border-0 text-light" disabled={submitting}>{submitting ? (editId ? 'Saving...' : 'Creating...') : (editId ? 'Save' : 'Create')}</button>
                  </div>
                </form>
            </div>
        </dialog>

    <div className='mx-5 bg-light p-5 rounded-lg'>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='text-redPastel'>{error}</div>
        ) : (
          
          <table className='table'>
            <thead>
              <tr>
                <th className='text-base font-product'>Name</th>
                <th className='text-base font-product'>Email</th>
                <th className='text-base font-product'>Password</th>
                <th className='text-base font-product'></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, idx) => (
                <tr key={account._id || idx}>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.password ? '*'.repeat(account.password.length) : ''}</td>
                  <td className='gap-2 flex justify-center'>
                    <button
                      className='btn bg-orangePastel hover:bg-orangePastel border-0 text-light'
                      onClick={() => {
                        setEditId(account._id);
                        setForm({ name: account.name, email: account.email, password: '' });
                        document.getElementById('modal_add').showModal();
                      }}
                    >Edit</button>
                    <button
                      className='btn bg-redPastel hover:bg-redPastel border-0 text-light'
                      onClick={() => handleDelete(account._id)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AccountPage;