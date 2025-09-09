import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-yellowPastel w-100">
  <div className="flex-1">
    <a className="font-cotta text-2xl text-greenPastel" href='/'>just ramen</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 font-product">
      <li><a className='font-product text-greenPastel text-base' href='/menu'>Menu</a></li>
      <li><a className='font-product text-greenPastel text-base' href='/promo'>Promo</a></li>
      <li><a className='font-product text-greenPastel text-base' href='/login'>Login</a></li>
    </ul>
  </div>
</div>
  )
}

export default Navbar