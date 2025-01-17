import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastName] = useState('')
  // const [captainData, setCaptainData] = useState({})

  const [vehicalColor, setVehicalColor] = useState('');
  const [vehicalPlate, setVehicalPlate] = useState('');
  const [vehicalCapacity, setVehicalCapacity] = useState('');
  const [vehicalType, setVehicalType] = useState('');

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  // Function to handle form submission of signup form:
  const submitHandler = async (e) => {
    console.log(captain)
    e.preventDefault();
    const captainData = ({
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehical: {
        color: vehicalColor,
        plate: vehicalPlate,
        capacity: vehicalCapacity,
        vehicalType: vehicalType
      }
    })
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if (response.status === 201) {
        const data = response.data;
        console.log(response)
        console.log(captain)
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        console.log('Captain Registerd Succesfully!')
        alert('Captain Registerd Succesfully!')
        navigate('/captain-home')
      }

    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert('Please fill in all required fields.');
        } else if (error.response.status === 409) {
          alert('Email already exists. Try another.');
        } else {
          alert('An unexpected error occurred. Try again later.');
        }
      } else {
        alert('Network error. Please check your connection.');
      }
    }

    setFirstname('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicalColor('')
    setVehicalPlate('')
    setVehicalCapacity('')
    setVehicalType('')
  }
  return (
    <>
      <div className='px-5 py-5 flex flex-col justify-between h-screen items-center '>
        <div>
          <img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="uber-logo" />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h1 className='mb-2 font-medium text-lg w-full'>Enter Captain's name:</h1>
            <div className="mb-7 flex gap-4 ">
              <input type="text" className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base' placeholder="First name" value={firstname} onChange={(e) => {
                setFirstname(e.target.value);
              }} required />
              <input type="text" className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base' placeholder="Last name" value={lastname} onChange={(e) => {
                setLastName(e.target.value);
              }} />
            </div>

            <h1 className='text-lg font-medium mb-2'>Enter Captain's email:</h1>
            <input type="text" className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' placeholder="example@gmail.com"
              required value={email} onChange={(e) => {
                setEmail(e.target.value);
              }} />

            <h1 className='font-medium text-lg mb-2'>Enter Captain's password:</h1>
            <input className='border text-lg px-4 w-full py-2 bg-[#eeeeee] mb-7 rounded ' type="password" placeholder="Password" required value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />

            <h1 className='font-medium text-lg mb-2'>Enter Vehical's Details:</h1>
            <div className='flex gap-4 mb-7 '>
              {/* <h1 className='font-medium text-lg mb-2'>Enter vehical's Color:</h1> */}
              <input type="text" className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base' placeholder="Vehical Color" required value={vehicalColor} onChange={(e) => {
                setVehicalColor(e.target.value);
              }} />

              {/* <h1 className='font-medium text-lg mb-2'>Enter Vehical's Plate Number:</h1> */}
              <input type="text" className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base' placeholder="Vehical Plate" required value={vehicalPlate} onChange={(e) => {
                setVehicalPlate(e.target.value);
              }} />
            </div>

            < div className="flex  gap-4 mb-7">
              {/* <h1 className='font-medium text-lg mb-2'>Enter Vehical's Capacity:</h1> */}
              <input type="number" className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base' placeholder="Vehical Capacity" required value={vehicalCapacity} onChange={(e) => {
                setVehicalCapacity(e.target.value);
              }} />

              {/* <h1 className='font-medium text-lg mb-2'>Select Vehical Type:</h1> */}
              <select className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base' required value={vehicalType} onChange={(e) => {
                setVehicalType(e.target.value);
              }}>
                <option value="" disabled >Vehical Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>


            <button className='py-2 px-4 bg-[#111] text-white  text-lg font-semibold w-full rounded-lg mb-3'>Create an account</button>
          </form >

          <p className='text-center'>Already have an account?
            <Link to="/captain-login" className='text-[#111] font-semibold underline '>Login</Link>
          </p>
        </div >
        <div>
          <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline font-bold' > Google Policy </span>and <span className='underline font-bold'>Terms of Service</span> apply.</p>
        </div>
      </div >
    </>
  )
}

export default CaptainSignup