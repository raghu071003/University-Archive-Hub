import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600'>
      <div className='max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg'>
        <div className='text-center'>
          <p className='text-gray-800 font-extrabold text-4xl mb-6'>
            Welcome!
          </p>
          <p className='text-gray-700 text-lg mb-4'>
            Hey User! Please login to view your files.
          </p>
          <p className='text-gray-600 mb-6'>
            If you're already logged in, please{' '}
            <Link to='/folders' className='text-blue-500 font-semibold hover:underline'>
              Click Here
            </Link>{' '}
            to access your files.
          </p>
          <Link
            to='/login'
            className='inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300'
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
