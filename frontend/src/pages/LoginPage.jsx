import React from 'react'

const LoginPage = () => {
  return (
    <div className='mx-auto min-h-screen bg-yellowPastel'>
        <h1 className='font-cotta text-2xl text-center py-5 text-greenPastel'>just ramen</h1>

        <div className='flex items-center justify-center min-h-[calc(100vh-5rem)]'>

            <div className="card card-dash  w-96 mx-auto my-auto shadow-sm place-items-center">
                <div className="card-body px-5 py-10">
                    <h2 className="font-product text-4xl font-bold text-blackPastel">Login</h2>
                    <p className='font-product text-greyPastel'>This is a secure system and you will need to provide your login details to access the site.</p>
                    
                    <div>
                        <label className="input input-bordered border-greyPastel flex items-center gap-2 my-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Email" />
                        </label>
                                    
                        <label className="input input-bordered border-greyPastel flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow" value="password" />
                        </label>
                    </div>

                    <div className="card-actions justify-end my-3">
                        <button className="btn btn-primary bg-orangePastel border-orangePastel font-white px-10">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage