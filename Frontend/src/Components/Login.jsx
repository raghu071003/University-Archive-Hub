import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { useContext } from 'react'
import MyContext from './Context'


function Login() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn,setUsernameContext,setAdmin } = useContext(MyContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming `username` and `password` are variables holding form field values
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
    
        try {
            // Sending form data to the server
            const res = await axios.post('http://localhost:5000/login', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            
            );
            if(res.status === 200){
                console.log(res.data);
                if(res.data.data.admin){
                    console.log(res.data.admin);
                    setAdmin(res.data.data.admin)
                }
                setIsLoggedIn(true);
                setUsernameContext(username);
                navigate('/folders'); // Navigate to home page
                localStorage.setItem('token', res.data.token);
            } // Assuming the response contains relevant data
        } catch (error) {
            console.error('Error occurred while submitting form:', error);
        }
    };

  return (
    <div>
         {isLoggedIn && currentLocation === '/login' && currentLocation === undefined? alert('Please log Out') : 
         <div className='login'>
         <form action="" onSubmit={handleSubmit}>
             <div className='flex flex-col h-96 justify-center items-center'>
                 <h1 className='text-2xl font-bold'>Hey User, Please Sign In</h1>
                 <input type="text" placeholder='Username ' id='username' className='outline-none max-w-[300px] w-96 m-3 border-black bg-transparent text-black text-center font-semibold border-b-2 h-14 placeholder:text-black' onChange={(e) => { setUsername(e.target.value) }} />
                 <input type="password" placeholder='Password' id='password' className='outline-none max-w-[300px] w-96 border-black m-3 bg-transparent text-black text-center font-semibold border-b-2 placeholder:text-black p-3' onChange={(e) => { setPassword(e.target.value) }} />
                 <button type='submit' className='border-2 font-bold p-3 w-fit max-w-[300px] rounded-xl border-black m-5'>Login!</button>
                 <p className='text-center'>Donot Have an Account? <Link to='/signup' className='hover:text-white underline'>Create Now</Link></p>
             </div>
         </form>
     </div>}
        
    </div>
   
  )
}

export default Login
