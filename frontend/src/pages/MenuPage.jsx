import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const MenuPage = () => {

const [menus, setMenus] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [form, setForm] = useState({ name: '', price: '', description: '' });
const [submitting, setSubmitting] = useState(false);
const [editId, setEditId] = useState(null);

const fetchMenus = async () => {
  setLoading(true);
  try {
    const res = await fetch('/api/menus');
    if (!res.ok) throw new Error('Failed to fetch menus');
    const data = await res.json();
    setMenus(data);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchMenus();
}, []);

const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this menu?')) return;
  try {
    const res = await fetch(`/api/menus/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete menu');
    await fetchMenus();
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className='min-h-screen mx-auto bg-background'>
      <AdminNavbar />
            
      <h1 className='font-product text-dark font-bold text-3xl px-5 my-7'>Menu</h1>
      <div className='mx-5 bg-light p-5 rounded-lg'>
        <button
          className='btn bg-greenPastel text-light hover:bg-greenPastel border-0 mb-4'
          onClick={() => {
            setEditId(null);
            setForm({ name: '', price: '', description: '' });
            document.getElementById('modal_menu').showModal();
          }}
        >+ Add Menu</button>

        <dialog id="modal_menu" className="modal">
          <div className="modal-box bg-light">
            <h3 className="font-bold text-lg mb-5">{editId ? 'Edit Menu' : 'New Menu'}</h3>
            <form
              className='gap-2 flex flex-col'
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                try {
                  let res;
                  if (editId) {
                    res = await fetch(`/api/menus/${editId}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(form),
                    });
                    if (!res.ok) throw new Error('Failed to update menu');
                  } else {
                    res = await fetch('/api/menus', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(form),
                    });
                    if (!res.ok) throw new Error('Failed to create menu');
                  }
                  setForm({ name: '', price: '', description: '' });
                  setEditId(null);
                  document.getElementById('modal_menu').close();
                  await fetchMenus();
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
                  placeholder="Menu Name"
                  className="input input-bordered w-100"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className='grid mb-4'>
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-100"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
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
                <button type="button" className="btn bg-greyPastel hover:bg-greyPastel border-0 text-light" onClick={() => { setEditId(null); setForm({ name: '', price: '', description: '' }); document.getElementById('modal_menu').close(); }} disabled={submitting}>Close</button>
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
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, idx) => (
                <tr key={menu._id || idx}>
                  <td>{menu.name}</td>
                  <td>{menu.price}</td>
                  <td>{menu.description}</td>
                  <td className='gap-2 flex justify-center'>
                    <button
                      className='btn bg-orangePastel hover:bg-orangePastel border-0 text-light'
                      onClick={() => {
                        setEditId(menu._id);
                        setForm({ name: menu.name, price: menu.price, description: menu.description });
                        document.getElementById('modal_menu').showModal();
                      }}
                    >Edit</button>
                    <button
                      className='btn bg-redPastel hover:bg-redPastel border-0 text-light'
                      onClick={() => handleDelete(menu._id)}
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

export default MenuPage