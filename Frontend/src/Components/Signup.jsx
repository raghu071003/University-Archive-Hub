import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [isChecked,setisChecked] = useState(false)
    const [pass,setPass] = useState("")
    const handleSubmit =async(e)=>{
        const form = new FormData();
        e.preventDefault()
        if(!isChecked){
            alert("Please accept terms and conditions")
        }
        else if(pass !== password){
            alert("Password does not match")
        }
        else{
            form.append('username',username)
            form.append('password',password)
            const res = await axios.post('http://localhost:5000/register',form,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
            })
            if(res.status === 200){
                alert("Registration Successful, Please login")
            }
            if(res.status === 201){
                alert("User Exisits, Please login")
            }
        }
        
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
  <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-6'>
    <form onSubmit={handleSubmit} className='space-y-6'>
      <h2 className='text-2xl font-bold text-center'>Register</h2>
      <input
        type='email'
        placeholder='Username'
        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='password'
        placeholder='Confirm Password'
        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={(e) => setPass(e.target.value)}
      />
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={() => setisChecked(!isChecked)}
          className='text-blue-500 focus:ring-blue-500'
        />
        <span className='ml-2 text-gray-600'>Accept Terms & Conditions</span>
      </div>
      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
      >
        Sign Up
      </button>
      <p className='text-center'>
        Already have an account?{' '}
        <Link to='/login' className='text-blue-500 hover:underline'>
          Sign In
        </Link>
      </p>
    </form>
  </div>
</div>

  )
}

export default Signup
