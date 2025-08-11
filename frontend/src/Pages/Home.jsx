import React from 'react'
// import LiveTracking from './LiveTracking'; // Uncomment if LiveTracking is a component you have

const Home = () => {
  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        className='w-16 absolute left-5 top-5'
        src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
        alt='Uber Logo'
      />

      <div className='h-screen w-screen'>
        {/* Replace with your actual LiveTracking component */}
        {/* <LiveTracking /> */}
        <div className='absolute bottom-20 left-5'>
          <h2 className='text-xl font-bold'>Get Started with Uber</h2>
          <button className='bg-black text-white px-4 py-2 rounded mt-2'>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Home
