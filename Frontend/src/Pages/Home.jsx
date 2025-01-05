import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='font-["Poppins"]'>
            <div className="bg-contain bg-no-repeat bg-top h-screen flex justify-between flex-col bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full pt-5">
                <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
                <div className='bg-white pb-7 py-4 px-4'>
                    <h1 className='text-black font-semibold text-3xl'>Get Started With Uber</h1>
                    <Link to='/login' className='flex justify-between bg-black text-white py-2 mt-5 w-full rounded '><h1 className='ml-28 text-2xl'>Continue</h1>
                        <i className="ri-arrow-right-line mr-4 text-3xl" />
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Home