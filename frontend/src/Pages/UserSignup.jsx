import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserSignup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

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
    };

    try {
      const response = await axios.post('http://localhost:8080/user/register', registrationData);
      if (response.status === 201 || response.status === 200) {
        setMessage('Registration successful! Redirecting to login...');
        setMessageType('success');

        setTimeout(() => {
          navigate('/login');
        }, 2000); // wait before redirect
      }
    } catch (error) {
      setMessage('Something went wrong during registration.');
      setMessageType('error');
      console.error('Registration failed:', error);
    }

    // Clear form
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
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
          <h2 className='text-2xl font-bold'>Create Account</h2>
        </div>

        {/* ✅ Show Message */}
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

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-base mb-3 hover:bg-gray-800 transition'
          >
            Sign Up
          </button>
        </form>

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

export default UserSignup;
