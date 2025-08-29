import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar.jsx';

const InventoryPage = () => {
	const [inventories, setInventories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
		const [form, setForm] = useState({ item: '', quantity: '', description: '' });
	const [submitting, setSubmitting] = useState(false);
	const [editId, setEditId] = useState(null);

	// Fetch inventories
	const fetchInventories = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/inventories');
			if (!res.ok) throw new Error('Failed to fetch inventories');
			const data = await res.json();
			setInventories(data);
			setError(null);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Delete inventory
	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this inventory?')) return;
		try {
			const res = await fetch(`/api/inventories/${id}`, {
				method: 'DELETE',
			});
			if (!res.ok) throw new Error('Failed to delete inventory');
			await fetchInventories();
		} catch (err) {
			alert(err.message);
		}
	};

	useEffect(() => {
		fetchInventories();
	}, []);

	return (
		<div className='min-h-screen mx-auto bg-background'>
			<AdminNavbar />

			<div className='mx-5 my-5'>
				<h1 className='font-product text-dark font-bold text-3xl my-3'>Inventories</h1>
				<button onClick={() => document.getElementById('modal_add').showModal()} className='btn bg-greenPastel text-light hover:bg-greenPastel border-0'>+ Add Inventory</button>
			</div>

			<dialog id="modal_add" className="modal">
				<div className="modal-box bg-light">
					<h3 className="font-bold text-lg mb-5">{editId ? 'Edit Inventory' : 'New Inventory'}</h3>
					<form
						className='gap-2 flex flex-col'
						onSubmit={async (e) => {
							e.preventDefault();
							setSubmitting(true);
							try {
								let res;
								if (editId) {
									res = await fetch(`/api/inventories/${editId}`, {
										method: 'PUT',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify(form),
									});
									if (!res.ok) throw new Error('Failed to update inventory');
								} else {
									res = await fetch('/api/inventories', {
										method: 'POST',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify(form),
									});
									if (!res.ok) throw new Error('Failed to create inventory');
								}
								setForm({ item: '', quantity: '', description: '' });
								setEditId(null);
								document.getElementById('modal_add').close();
								await fetchInventories();
							} catch (err) {
								alert(err.message);
							} finally {
								setSubmitting(false);
							}
						}}
					>
									<div className='grid mb-4'>
										<label>Item</label>
										<input
											type="text"
											placeholder="Item Name"
											className="input input-bordered w-100"
											value={form.item}
											onChange={e => setForm(f => ({ ...f, item: e.target.value }))}
											required
										/>
									</div>
									<div className='grid mb-4'>
										<label>Quantity</label>
										<input
											type="number"
											placeholder="Quantity"
											className="input input-bordered w-100"
											value={form.quantity}
											onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
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
							  <button type="button" className="btn bg-greyPastel hover:bg-greyPastel border-0 text-light" onClick={() => { setEditId(null); setForm({ item: '', quantity: '', description: '' }); document.getElementById('modal_add').close(); }} disabled={submitting}>Close</button>
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
								<th className='text-base font-product'>Item</th>
								<th className='text-base font-product'>Quantity</th>
								<th className='text-base font-product'>Description</th>
								<th className='text-base font-product'></th>
							</tr>
						</thead>
						<tbody>
											{inventories.map((inventory, idx) => (
												<tr key={inventory._id || idx}>
													<td>{inventory.item}</td>
													<td>{inventory.quantity}</td>
													<td>{inventory.description}</td>
													<td className='gap-2 flex justify-center'>
														<button
															className='btn bg-orangePastel hover:bg-orangePastel border-0 text-light'
															onClick={() => {
																setEditId(inventory._id);
																setForm({ item: inventory.item, quantity: inventory.quantity, description: inventory.description });
																document.getElementById('modal_add').showModal();
															}}
														>Edit</button>
														<button
															className='btn bg-redPastel hover:bg-redPastel border-0 text-light'
															onClick={() => handleDelete(inventory._id)}
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

export default InventoryPage;
