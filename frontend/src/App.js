// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import UserSignup from './Pages/UserSignup';
import CaptainLogin from './Captain/CaptainLogin';
import CaptainRegister from './Captain/CaptainRegister';
import CaptainGetProfile from './Captain/CaptainGetProfile';
import Start from './Pages/Start';
import UserProtectWrapper from './Pages/UserProtectWrapper';
import UserLogout from './Pages/UserLogout';
import CaptainHome from './Captain/CaptainHome';
import CaptainProtectWrapper from './Captain/CaptainProtecetWrapper';

// import QuotePage from './components/QuotePage';

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainRegister />} />
      <Route path="/captain-profile" element={<CaptainGetProfile />} />
      <Route path="/logout" element={<UserLogout />} />
     
     <Route path="/home" element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
 <Route path="/logout" element={<UserLogout />} />
     <Route path="/captain-home" element={<CaptainProtectWrapper>
<CaptainHome />
     </CaptainProtectWrapper>} />
     </Routes>
    </>
  );
}

export default App;