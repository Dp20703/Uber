import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastName, setlastName] = useState('')
  const [userData, setUserData] = useState({})

  // Function to handle form submission of signup form:
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstname: firstname,
        lastName: lastName
      },
      email: email,
      password: password,
    })
    setFirstname('');
    setlastName('');
    setEmail('');
    setPassword('');
  }
  return (
    <>
      <div className='p-7 flex flex-col justify-between h-screen items-center '>
        <div>
          <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h1 className='mb-2 font-medium text-lg'>Enter your name:</h1>
            <div className="mb-6 flex gap-4 ">
              <input type="text" className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' placeholder="First name" value={firstname} onChange={(e) => {
                setFirstname(e.target.value);
              }} required />
              <input type="text" className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' placeholder="Last name" value={lastName} onChange={(e) => {
                setlastName(e.target.value);
              }} />
            </div>
            <h1 className='text-lg font-medium mb-2'>Enter your email:</h1>
            <input type="text" className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' placeholder="example@gmail.com"
              required value={email} onChange={(e) => {
                setEmail(e.target.value);
              }} />

            <h1 className='font-medium text-lg mb-2'>Enter your password:</h1>
            <input className='border text-lg px-4 w-full py-2 bg-[#eeeeee] mb-6 rounded ' type="password" placeholder="Password" required value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
            <button className='py-2 px-4 bg-[#111] text-white mb-6 text-lg font-semibold w-full rounded-lg'>Login</button>
          </form>
          <p className='text-center'>Already have an account?
            <Link to="/login" className='text-[#111] font-semibold underline'>Login</Link>
          </p>
        </div>
        <div className='w-full'>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline font-bold' > Google Policy </span>and <span className='underline font-bold'>Terms of Service</span> apply.</p>
        </div>
      </div>
    </>
  )
}

export default UserSignup