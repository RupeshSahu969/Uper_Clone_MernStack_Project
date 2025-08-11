// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import UserSignup from './Pages/UserSignup';
import CaptainLogin from './Captain/CaptainLogin';
import CaptainRegister from './Captain/CaptainRegister';
import CaptainGetProfile from './Captain/CaptainGetProfile';

// import QuotePage from './components/QuotePage';

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainRegister />} />
      <Route path="/captain-profile" element={<CaptainGetProfile />} />
     </Routes>
    </>
  );
}

export default App;