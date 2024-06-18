import React from 'react'
import axios from 'axios';

function Logout() {
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
                console.error('No token found');
                return;
            }
            await axios.post('http://localhost:5000/logout', null, {
                headers: {
                    Authorization: `${token}` // Include the token in the request headers
                }
            });
            // After successful logout, remove token from local storage
            localStorage.removeItem('token');
            window.location.href = '/'; // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}
export default Logout
