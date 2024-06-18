import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
  <div className='max-w-lg mx-auto px-4 py-8 sm:px-6 lg:px-8'>
    <div className='text-center'>
      <p className='text-black font-extrabold text-3xl mb-4'>
        Hey User! Please Login to view Files
      </p>
      <p className='text-black'>
        If you are already logged in, Please <Link to='/folders' className='underline'>Click Here</Link>
      </p>
    </div>
  </div>
</div>

  )
}

export default Home
 