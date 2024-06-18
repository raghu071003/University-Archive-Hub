import axios from 'axios';
import React from 'react';
import MyContext from './Context';
import { useContext } from 'react';
import { useState } from 'react';

function File({ name, fileId, id }) {
  const {admin} = useContext(MyContext)
  const [option, setOption] = useState(false);
  const toggleOptions = () => {
    console.log(admin);
    setOption(!option)
  }
  const downloadPdf = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/download/Files/${fileId}`, {
            responseType: 'blob', // Set the response type to blob
        });

        // Create a Blob object from the file response
        const blob = new Blob([res.data], { type: 'application/pdf' });

        // Create a temporary URL for the Blob object
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;

        // Set the download attribute with the file name
        link.setAttribute('download', `${name}.pdf`);

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click event on the link to start the download
        link.click();

        // Remove the link from the DOM
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
    setOption(false)
};

const deletePDf = () => {
    axios.delete(`http://localhost:5000/deleteFile/Files/${fileId}`)
    setOption(false)
    alert('Please Refresh the Page to See the new Content')
}

const closeMenu =()=>{
  setOption(false)
}

const filenames = name.split('_')
filenames.shift()
const fName=filenames.join(' ')

  return (
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
  <div className='relative flex flex-col items-center shadow-2xl rounded-2xl max-w-xs mx-auto w-full'>
    <img
      src="https://www.iconpacks.net/icons/2/free-pdf-icon-1512-thumb.png"
      alt=""
      className='mb-0 w-24 p-4 leading-3 cursor-pointer'
      onClick={toggleOptions}
    />
    <h1 className='text-sm text-wrap text-white font-bold p-4 mt-0'>{fName}</h1>
    {option && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white border border-gray-300 shadow-md rounded-md p-4 w-full max-w-md">
          <div className='m-3 items-center flex justify-center'>
            <img src="https://th.bing.com/th/id/R.71935f4e295b1a7c194205d6468a3e78?rik=iHjuFUP4Jrfvvw&pid=ImgRaw&r=0" alt="" width={50} height={50} />
          </div>
          
          <ul className="m-0 p-0 flex flex-col">
            <li className="hover:bg-gray-100 p-3 cursor-pointer" onClick={downloadPdf}>
              Download
            </li>
            {admin && (
              <li className="hover:bg-gray-100 p-3 cursor-pointer" onClick={deletePDf}>
                Delete
              </li>
            )}
            <li className="hover:bg-gray-100 p-3 cursor-pointer" onClick={closeMenu}>
              Cancel
            </li>
          </ul>
        </div>
      </div>
    )}
  </div>
</div>

  );
}

export default File;


// <div className='flex flex-col justify-center items-center hover:shadow-3xl cursor-pointer box-border' onClick={showOptions}>
//       <img src="https://www.iconpacks.net/icons/2/free-pdf-icon-1512-thumb.png" alt="" className=' mb-0 w-24 p-4 leading-3' />
//       <h1 className='text-xl text-white font-bold p-4 mt-0'>{name}</h1>
//       {option && 
       
//       <div className='  opt' >
//         <div className='mt-0 ml-2 z-10 bg-white border border-gray-300 shadow-md rounded-md p-10'>
//           <div className='mr-2 items-center flex justify-center' >
//             <img src="https://th.bing.com/th/id/R.71935f4e295b1a7c194205d6468a3e78?rik=iHjuFUP4Jrfvvw&pid=ImgRaw&r=0" alt="" width={40} height={40} />
//           </div>
//           <div className='absolute right-0 top-0 m-5 hover:bg-gray-100 p-3 cursor-pointer' onClick={closeMenu}>
//             <img src="https://cdn4.iconfinder.com/data/icons/core-ui-filled-1/32/filled_close-1024.png" alt="" width={20} height={20} />
//           </div>
//           <div className="mt-5">
//             <ul className="m-0 p-0 flex flex-row">
//               <li className="hover:bg-gray-100 p-3 cursor-pointer" onClick={downloadPdf}>
//                 Download
//               </li>
//               <li className="hover:bg-gray-100 p-3 cursor-pointer" onClick={deletePDf}>
//                 Delete
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>}
//     </div>