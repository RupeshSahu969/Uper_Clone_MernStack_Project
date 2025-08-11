import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainRegister = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    };

    try {
      const response = await axios.post('http://localhost:8080/captain/register', registrationData);
      if (response.status === 201 || response.status === 200) {
        setMessage('Registration successful! Redirecting to login...');
        setMessageType('success');

        setTimeout(() => {
          navigate('/captain-login');
        }, 2000);
      }
    } catch (error) {
      setMessage('Something went wrong during registration.');
      setMessageType('error');
      console.error('Registration failed:', error);
    }

    // Clear form fields
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        <div className='flex flex-col items-center mb-6'>
          <img
            className='w-16 mb-4'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s'
            alt='Uber logo'
          />
          <h2 className='text-2xl font-bold'>Create Captain Account</h2>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`text-sm px-4 py-2 rounded mb-4 ${
              messageType === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='w-full sm:w-1/2'>
              <label className='block text-gray-700 mb-1 font-medium'>First Name</label>
              <input
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full'
                type='text'
                placeholder='First Name'
              />
            </div>

            <div className='w-full sm:w-1/2'>
              <label className='block text-gray-700 mb-1 font-medium'>Last Name</label>
              <input
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full'
                type='text'
                placeholder='Last Name'
              />
            </div>
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-1 font-medium'>Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full'
              type='email'
              placeholder='email@example.com'
            />
          </div>

          {/* Password */}
          <div className='mb-6'>
            <label className='block text-gray-700 mb-1 font-medium'>Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full'
              type='password'
              placeholder='Password'
            />
          </div>

          {/* Vehicle Information */}
{/* Vehicle Information */}
<div className='mb-6 p-4 bg-gray-50 border rounded-lg'>
  <h3 className='text-lg font-semibold text-gray-800 mb-4'>Vehicle Information</h3>

  <div className='flex flex-col sm:flex-row gap-4 mb-4'>
    <div className='w-full sm:w-1/2'>
      <label className='block text-gray-700 mb-1 font-medium'>Vehicle Type</label>
      <input
        required
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full'
        type='text'
        placeholder='e.g. Car, Bike'
      />
    </div>

    <div className='w-full sm:w-1/2'>
      <label className='block text-gray-700 mb-1 font-medium'>Color</label>
      <input
        required
        value={vehicleColor}
        onChange={(e) => setVehicleColor(e.target.value)}
        className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full'
        type='text'
        placeholder='Vehicle Color'
      />
    </div>
  </div>

  <div className='flex flex-col sm:flex-row gap-4 mb-0'>
    <div className='w-full sm:w-1/2'>
      <label className='block text-gray-700 mb-1 font-medium'>License Plate</label>
      <input
        required
        value={vehiclePlate}
        onChange={(e) => setVehiclePlate(e.target.value)}
        className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full'
        type='text'
        placeholder='e.g. CG05 0464'
      />
    </div>

    <div className='w-full sm:w-1/2'>
      <label className='block text-gray-700 mb-1 font-medium'>Capacity</label>
      <input
        required
        value={vehicleCapacity}
        onChange={(e) => setVehicleCapacity(e.target.value)}
        className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full'
        type='number'
        placeholder='e.g. 4'
      />
    </div>
  </div>
</div>

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-base mb-3 hover:bg-gray-800 transition'
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className='text-center text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainRegister;
