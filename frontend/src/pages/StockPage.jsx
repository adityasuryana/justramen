
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const StockPage = () => {
	const [stocks, setStocks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [form, setForm] = useState({ name: '', quantity: '', unit: '' });
	const [submitting, setSubmitting] = useState(false);
	const [editId, setEditId] = useState(null);

	const fetchStocks = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/stocks');
			if (!res.ok) throw new Error('Failed to fetch stocks');
			const data = await res.json();
			setStocks(data);
			setError(null);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStocks();
	}, []);

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this stock item?')) return;
		try {
			const res = await fetch(`/api/stocks/${id}`, {
				method: 'DELETE',
			});
			if (!res.ok) throw new Error('Failed to delete stock item');
			await fetchStocks();
		} catch (err) {
			alert(err.message);
		}
	};

	return (
		<div className='min-h-screen mx-auto bg-background'>
			<AdminNavbar />
			<h1 className='font-product text-dark font-bold text-3xl px-5 my-7'>Stock</h1>
			<div className='mx-5 bg-light p-5 rounded-lg'>
				<button
					className='btn bg-greenPastel text-light hover:bg-greenPastel border-0 mb-4'
					onClick={() => {
						setEditId(null);
						setForm({ name: '', quantity: '', unit: '' });
						document.getElementById('modal_stock').showModal();
					}}
				>+ Add Stock</button>

				<dialog id="modal_stock" className="modal">
					<div className="modal-box bg-light">
						<h3 className="font-bold text-lg mb-5">{editId ? 'Edit Stock' : 'New Stock'}</h3>
						<form
							className='gap-2 flex flex-col'
							onSubmit={async (e) => {
								e.preventDefault();
								setSubmitting(true);
								try {
									let res;
									if (editId) {
										res = await fetch(`/api/stocks/${editId}`, {
											method: 'PUT',
											headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify(form),
										});
										if (!res.ok) throw new Error('Failed to update stock item');
									} else {
										res = await fetch('/api/stocks', {
											method: 'POST',
											headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify(form),
										});
										if (!res.ok) throw new Error('Failed to create stock item');
									}
									setForm({ name: '', quantity: '', unit: '' });
									setEditId(null);
									document.getElementById('modal_stock').close();
									await fetchStocks();
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
									placeholder="Stock Name"
									className="input input-bordered w-100"
									value={form.name}
									onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
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
								<label>Unit</label>
								<input
									type="text"
									placeholder="Unit (e.g. kg, pcs)"
									className="input input-bordered w-100"
									value={form.unit}
									onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
									required
								/>
							</div>
							<div className="modal-action gap-2 flex">
								<button type="button" className="btn bg-greyPastel hover:bg-greyPastel border-0 text-light" onClick={() => { setEditId(null); setForm({ name: '', quantity: '', unit: '' }); document.getElementById('modal_stock').close(); }} disabled={submitting}>Close</button>
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
								<th>Quantity</th>
								<th>Unit</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{stocks.map((stock, idx) => (
								<tr key={stock._id || idx}>
									<td>{stock.name}</td>
									<td>{stock.quantity}</td>
									<td>{stock.unit}</td>
									<td className='gap-2 flex justify-center'>
										<button
											className='btn bg-orangePastel hover:bg-orangePastel border-0 text-light'
											onClick={() => {
												setEditId(stock._id);
												setForm({ name: stock.name, quantity: stock.quantity, unit: stock.unit });
												document.getElementById('modal_stock').showModal();
											}}
										>Edit</button>
										<button
											className='btn bg-redPastel hover:bg-redPastel border-0 text-light'
											onClick={() => handleDelete(stock._id)}
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

export default StockPage;
