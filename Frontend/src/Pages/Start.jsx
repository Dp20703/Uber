import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div className='font-["Poppins"] '>
            <div className=" w-full pt-5 bg-cover bg-no-repeat bg-center h-screen flex justify-between flex-col bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
                <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
                <div className='bg-white  py-4 px-4'>
                    <h1 className='text-black font-semibold text-[30px]'>Get Started With Uber</h1>
                    <Link to='/login' className='flex justify-between bg-black text-white py-2 mt-5 w-full rounded-lg '><h1 className='ml-28 text-2xl'>Continue</h1>
                        <i className="ri-arrow-right-line mr-4 text-3xl" />
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Start