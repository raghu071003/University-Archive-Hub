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
    <div>
      <div className='  p-10 '>
        <form action="" onSubmit={handleSubmit}>
            <div className='flex flex-col h-96 justify-center items-center  '>
                <h1 className='text-2xl font-bold m-5'>Hey User, Please Register</h1>
            <input type="email" placeholder='Username'  id='username' className=' max-w-[300px] outline-none w-96 m-3 border-black bg-transparent p-3 text-black text-center font-semibold border-b-2 h-14 placeholder:text-black' onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type="password" placeholder='Password' id='password'className='max-w-[300px] outline-none w-96 border-black m-3 bg-transparent text-black text-center font-semibold  border-b-2 placeholder:text-black p-3' onChange={(e)=>{setPassword(e.target.value)}}/>
            <input type="password" placeholder='Re-Enter Password' id='password2'className='max-w-[300px] outline-none w-96 border-black m-3 bg-transparent text-black text-center font-semibold  border-b-2 placeholder:text-black p-3' onChange={(e)=>{setPass(e.target.value)}}/>
            <div className='flex gap-3 p-3'>
                <input type="checkbox" defaultChecked={isChecked} onChange={()=>setisChecked(!isChecked)} className='max-w-[300px] outline-none border-none cursor-pointer bg-white'/>
                <p>By clicking,You are accepting our terms & Conditions</p>
            </div>
            <button type='submit' className='max-w-[300px] border-2 font-bold p-3 m-4 w-fit rounded-xl border-black m-5'>Signup!</button>        
            <p className='text-center '>Aldready Have an Account? <Link to='/signup' className=' hover:text-white underline'>Sign In</Link></p>                                                           
            </div>
            
        </form>
      </div>
    </div>
  )
}

export default Signup
