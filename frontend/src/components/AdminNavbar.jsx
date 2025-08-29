import React from 'react'

const AdminNavbar = () => {
  return (
    <div className="navbar bg-yellowPastel w-100">
  <div className="flex-1">
    <a className="btn btn-ghost font-cotta text-2xl text-greenPastel" href='/'>just ramen</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 font-product">
      <li><a className='font-product text-greenPastel text-base' href='/dashboard'>Dashboard</a></li>
      <li><a className='font-product text-greenPastel text-base' href='/accounts'>Account</a></li>
      <li><a className='font-product text-greenPastel text-base' href='/menu'>Menu</a></li>
      <li><a className='font-product text-greenPastel text-base' href='/promo'>Promo</a></li>
      <li><a className='font-product text-greenPastel text-base' href="/stock">Stock</a></li>
      <li><a className='font-product text-greenPastel text-base' href="/inventory">Inventory</a></li>
    </ul>
  </div>
</div>
  )
}

export default AdminNavbar