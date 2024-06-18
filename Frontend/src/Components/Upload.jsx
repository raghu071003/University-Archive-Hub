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
   
    <div className='absolute bottom-0 right-0'>
       {admin  && <div className='flex justify-center items-center'>
    <form action="" className='p-5 flex justify-center items-center' onSubmit={submitFile}>
      <div className='flex flex-col items-center'>
        <div className="file-upload m-4 p-2 border-2 border-dashed rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300">
          <label htmlFor='imgupload' className="cursor-pointer">
            <div className="image-upload-wrap">
              <input id='imgupload' type='file' required onChange={(e) => setters(e)} accept='application/pdf' className="hidden" />
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <p className="text-sm text-gray-600">Drag and drop files here or click to browse</p>
              </div>
            </div>
          </label>
        </div>
        <button type='submit' className='border-2 border-black rounded-lg font-bold px-6 py-3 mt-4 text-white bg-black hover:bg-gray-800 transition duration-300'>
          Upload Here
        </button>
      </div>
    </form>
  </div> }
  
</div>

  )
}

export default Upload
