import React, { useEffect, useState,useContext  } from 'react'
import axios from 'axios'

import MyContext from './Context';
function Upload({path}) {

  const {username,admin} = useContext(MyContext)
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [UploadUser,setUploadUser] = useState("");

  const submitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append('uploaded by',UploadUser)
    const result = await axios.post(`http://localhost:5000/uploadFiles/${path}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    

    if (result.data.status === "ok") {
      alert("File Uploaded, Please Refresh the page to see the Updated Content.")
    }
  }

   const setters = (e) => {
    setTitle(e.target.files[0].name)
    setFile(e.target.files[0])
    setUploadUser(username)
  }
  // useEffect(() => {
  //   $('#Upload').click(function () { $('#imgupload').trigger('click'); });
  // }, []);

  return (
   
    <div className='flex justify-center items-center p-4'>
  {admin && (
    <div className='w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
      <form onSubmit={submitFile} className='p-6 space-y-4'>
        <h2 className='text-xl font-semibold text-center'>Upload a File</h2>
        <div className='border-2 border-dashed rounded-lg bg-gray-50 p-4 hover:bg-gray-100 transition duration-300'>
          <label htmlFor='imgupload' className='block cursor-pointer'>
            <input
              id='imgupload'
              type='file'
              required
              onChange={setters}
              accept='application/pdf'
              className='hidden'
            />
            <div className='text-center'>
              <svg
                className='w-12 h-12 mx-auto mb-2 text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
              </svg>
              <p className='text-sm text-gray-600'>Click or drag files to upload</p>
            </div>
          </label>
        </div>
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition duration-300'
        >
          Upload
        </button>
      </form>
    </div>
  )}
</div>


  )
}

export default Upload
