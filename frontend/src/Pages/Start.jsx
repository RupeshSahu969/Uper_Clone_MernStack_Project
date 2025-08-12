import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-4 sm:pt-6 flex justify-between flex-col w-full bg-black bg-opacity-30'>
        <img 
          className='w-16 sm:w-24 md:w-32 lg:w-40 ml-8 mb-8' 
          src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417" 
          alt="Logo" 
        />
        <div className='bg-white pb-8 py-4 px-4 sm:px-8'>
          <h2 className='text-[30px] sm:text-[36px] md:text-[40px] font-semibold'>
            Get Started with Uber
          </h2>
          <Link 
            to='/login' 
            className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5 sm:mt-6 md:mt-8 hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black'
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
