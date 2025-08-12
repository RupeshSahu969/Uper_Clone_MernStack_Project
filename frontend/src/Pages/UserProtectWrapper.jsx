import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Use useEffect to perform redirection if token is not found
  useEffect(() => {
    if (!token) {
      navigate('/login');  // Navigate to login if token is missing
    }
  }, [token, navigate]);  // Re-run effect if token changes

  if (!token) {
    return null;  // Don't render anything while redirecting
  }

  return <div>{children}</div>;  // Render children if token is valid
};

export default UserProtectWrapper;
