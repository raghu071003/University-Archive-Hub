import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyContext from './Context';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUsernameContext, setAdmin } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const res = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        if (res.data.data.admin) {
          setAdmin(res.data.data.admin);
        }
        setIsLoggedIn(true);
        setUsernameContext(username);
        localStorage.setItem('token', res.data.token);
        navigate('/folders');
      } else {
        setError('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Error occurred while submitting form:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96'>
        <h1 className='text-2xl font-bold text-center mb-6'>Welcome Back!</h1>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-4'>
            <input
              type='text'
              placeholder='Username'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300'
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className='text-center mt-4'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Create Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
