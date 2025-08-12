import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
            console.log('No token found');
            return;  // Stop the logout process if no token is available
        }

        try {
            const res = await axios.get("http://localhost:8080/user/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (res.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                console.log('Logout failed', res);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserLogout;
