import React from 'react'
import Navbar from '../components/Navbar'
import leftRoundedArrow from '../assets/icon/left-rounded-arrow.svg';
import phone from '../assets/icon/phone-rounded.svg';
import location from '../assets/icon/location-rounded.svg';
import clock from '../assets/icon/clock-rounded.svg';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className='p-4 mx-auto min-h-screen bg-yellowPastel'>
        <Navbar />

        <div className='grid grid-cols-2 mt-4 p-4 py-10'>
          <div className='m-auto'>
            <h1 className='font-cotta text-6xl text-greenPastel'>Enjoy hot and fresh made ramen at just ramen</h1>
            <p className='font-product text-blackPastel text-xl my-5'>Taste the best foods of japan, we deliver authentic and delicious ramen in Indonesia</p>
            <div className='w-100'>
                <a href="" className='font-cotta text-orangePastel text-2xl hover:underline flex'>explore ramen! <img className='ml-4' src={leftRoundedArrow} alt="" /></a>
            </div>
          </div>
          <div className='mx-auto'>
            <img className='w-80' src="../src/assets/img/ramen-head.svg" alt="Delicious Ramen" />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2 p-4 mx-auto'>
            <div className="card bg-base-500 shadow-sm">
                <div className="card-body mx-auto">
                    <p className='mx-auto'><img src={clock} alt="" /></p>
                    <p className='font-product text-blackPastel text-center font-bold'>10:00 am - 8:00 pm</p>
                    <p className='font-product text-greyPastel text-center'>Monday to Sunday</p>
                </div>
            </div>

            <div className="card bg-base-500 shadow-sm">
                <div className="card-body mx-auto">
                    <p className='mx-auto'><img src={location} alt="" /></p>
                    <p className='font-product text-blackPastel font-bold text-center'>Bahureksa 10, Bandung</p>
                    <a href="" className='font-product text-center text-greyPastel hover:underline'>Get directions</a>
                </div>
            </div>

            <div className="card bg-base-500 shadow-sm">
                <div className="card-body mx-auto">
                    <p className='mx-auto'><img src={phone} alt="" /></p>
                    <p className='font-product text-blackPastel font-bold text-center'>+62 888 909 767</p>
                    <p className='font-product text-greyPastel text-center'>Reservation</p>
                </div>
            </div>
        </div>

        <div className='block'>
            <h4 className='font-product text-greyPastel text-xl text-center'>Menu</h4>
            <h2 className='font-cotta text-greenPastel text-3xl text-center mt-3'>Explore Our Best Menu</h2>

        </div>

        <Footer />
    </div>
  )
}

export default LandingPage