import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <nav>
                <h6 className="font-cotta text-3xl text-greenPastel">just ramen</h6>
                <h2 className='font-product text-blackPastel text-wrap text-justify'>a well known japanese restaurant in Bandung. <br />Specialized on ramen and any japanese foods.</h2>
            </nav>
            <nav>
                <h6 className="font-cotta text-xl text-greenPastel">Our Links</h6>
                <a className="font-product text-blackPastel link link-hover">Home</a>
                <a className="font-product text-blackPastel link link-hover">Menu</a>
                <a className="font-product text-blackPastel link link-hover">Promo</a>
                <a className="font-product text-blackPastel link link-hover">Login</a>
            </nav>
            <nav>
                <h6 className="font-cotta text-xl text-greenPastel">Social Media</h6>
                <a className="font-product text-blackPastel link link-hover">Twitter</a>
                <a className="font-product text-blackPastel link link-hover">Instagram</a>
                <a className="font-product text-blackPastel link link-hover">Facebook</a>
            </nav>
        </footer>
    </div>
  )
}

export default Footer
