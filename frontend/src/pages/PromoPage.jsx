import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import AdminNavbar from '../components/AdminNavbar.jsx';

const PromoPage = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', discount: '' });
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/promos');
      if (!res.ok) throw new Error('Failed to fetch promos');
      const data = await res.json();
      setPromos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this promo?')) return;
    try {
      const res = await fetch(`/api/promos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete promo');
      await fetchPromos();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='min-h-screen mx-auto bg-background'>
      <AdminNavbar/>
      <h1 className='font-product text-3xl font-bold p-4'>Promo</h1>

      <div className='mx-5 bg-light p-5 rounded-lg'>
        <button
          className='btn bg-greenPastel text-light hover:bg-greenPastel border-0 mb-4'
          onClick={() => {
            setEditId(null);
            setForm({ title: '', description: '', discount: '' });
            document.getElementById('modal_promo').showModal();
          }}
        >+ Add Promo</button>

        <dialog id="modal_promo" className="modal">
          <div className="modal-box bg-light">
            <h3 className="font-bold text-lg mb-5">{editId ? 'Edit Promo' : 'New Promo'}</h3>
            <form
              className='gap-2 flex flex-col'
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                try {
                  let res;
                  if (editId) {
                    res = await fetch(`/api/promos/${editId}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(form),
                    });
                    if (!res.ok) throw new Error('Failed to update promo');
                  } else {
                    res = await fetch('/api/promos', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(form),
                    });
                    if (!res.ok) throw new Error('Failed to create promo');
                  }
                  setForm({ title: '', description: '', discount: '' });
                  setEditId(null);
                  document.getElementById('modal_promo').close();
                  await fetchPromos();
                } catch (err) {
                  alert(err.message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className='grid mb-4'>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Promo Title"
                  className="input input-bordered w-100"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div className='grid mb-4'>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="input input-bordered w-100"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>
              <div className="modal-action gap-2 flex">
                <button type="button" className="btn bg-greyPastel hover:bg-greyPastel border-0 text-light" onClick={() => { setEditId(null); setForm({ title: '', description: '', discount: '' }); document.getElementById('modal_promo').close(); }} disabled={submitting}>Close</button>
                <button type="submit" className="btn bg-greenPastel hover:bg-greenPastel border-0 text-light" disabled={submitting}>{submitting ? (editId ? 'Saving...' : 'Creating...') : (editId ? 'Save' : 'Create')}</button>
              </div>
            </form>
          </div>
        </dialog>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo, idx) => (
                <tr key={promo._id || idx}>
                  <td>{promo.title}</td>
                  <td>{promo.description}</td>
                  <td>{promo.discount}</td>
                  <td className='gap-2 flex justify-center'>
                    <button
                      className='btn bg-orangePastel hover:bg-orangePastel border-0 text-light'
                      onClick={() => {
                        setEditId(promo._id);
                        setForm({ title: promo.title, description: promo.description, discount: promo.discount });
                        document.getElementById('modal_promo').showModal();
                      }}
                    >Edit</button>
                    <button
                      className='btn bg-redPastel hover:bg-redPastel border-0 text-light'
                      onClick={() => handleDelete(promo._id)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PromoPage;