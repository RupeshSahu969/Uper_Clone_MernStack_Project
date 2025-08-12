import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/captain/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);


        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        <div className='flex flex-col items-center mb-6'>
          <img
            className='w-16 mb-4'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s'
            alt='Uber logo'
          />
          <h2 className='text-2xl font-bold'>Captain Login</h2>
        </div>

        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-1 font-medium'>What's your email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm'
              type='email'
              placeholder='email@example.com'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 mb-1 font-medium'>Enter Password</label>
            <input
              required
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-base placeholder:text-sm'
              placeholder='password'
            />
          </div>

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-base mb-3 hover:bg-gray-800 transition'
          >
            Login
          </button>
        </form>

        <p className='text-center text-sm'>
          New here?{' '}
          <Link to='/signup' className='text-blue-600 hover:underline'>
            Create new account
          </Link>
        </p>

        <div className='mt-6'>
          <Link
            to='/login'
            className='bg-[#10b461] text-white font-semibold rounded-lg px-4 py-2 w-full block text-center text-base hover:bg-[#0f9e55] transition'
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};


export default CaptainLogin
