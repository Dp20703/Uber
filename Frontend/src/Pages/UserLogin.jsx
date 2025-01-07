import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [UserData, setUserData] = useState({})

  //It will submit the form and set the email and password to the UserData state:
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email: email, password: password })
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen items-center '>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h1 className='text-lg font-medium mb-2'>Enter your email:</h1>
          <input type="text" className='bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' placeholder="example@gmail.com"
            value={email} onChange={(e) => {
              setEmail(e.target.value);
            }} required />

          <h1 className='font-medium text-lg mb-2'>Enter your password:</h1>
          <input className='border text-lg px-4 w-full py-2 bg-[#eeeeee] mb-6 rounded ' type="password" placeholder="Password" required value={password} onChange={(e) => {
            setPassword(e.target.value);
          }} />
          <button className='py-2 px-4 bg-[#111] text-white mb-6 text-lg font-semibold w-full rounded-lg'>Login</button>
        </form>
        <p className='text-center'>Don't have an account?
          <Link to="/signup" className='text-[#111] font-semibold underline'> Sign up</Link>
        </p>
      </div>
      <div className='w-full'>
        <Link to='/captain-login'
          className='bg-[#111] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin