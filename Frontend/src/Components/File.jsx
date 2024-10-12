import axios from 'axios';
import React, { useState, useContext, useEffect, useRef } from 'react';
import MyContext from './Context';
import { Download } from 'lucide-react';

function File({ name, fileId }) {
  const { admin } = useContext(MyContext);
  const [option, setOption] = useState(false);
  const [error, setError] = useState(null);
  const optionsRef = useRef(null);

  const toggleOptions = () => {
    setOption(!option);
    setError(null);
  };

  const downloadPdf = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/download/Files/${fileId}`, {
        responseType: 'blob', // Set the response type to blob
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Error downloading file. Please try again later.');
      console.error('Error downloading file:', err);
    }
    setOption(false);
  };

  const deletePdf = async () => {
    try {
      await axios.delete(`http://localhost:5000/deleteFile/Files/${fileId}`);
      alert('File deleted. Please refresh the page to see the updated content.');
    } catch (err) {
      setError('Error deleting file. Please try again later.');
      console.error('Error deleting file:', err);
    }
    setOption(false);
  };

  const closeMenu = () => {
    setOption(false);
    setError(null);
  };

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filenames = name.split('_');
  filenames.shift();
  const fName = filenames.join(' ');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="relative flex flex-col items-center shadow-lg rounded-lg max-w-xs mx-auto w-full">
        <img
          src="https://www.iconpacks.net/icons/2/free-pdf-icon-1512-thumb.png"
          alt="PDF File Icon"
          className="mb-0 w-24 p-4 cursor-pointer"
          onClick={toggleOptions}
        />
        <h1 className="text-sm text-wrap text-black font-bold p-4 mt-0">{fName}</h1>

        {option && (
          <div
            ref={optionsRef}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          >
            <div className="bg-white border border-gray-300 shadow-md rounded-md p-4 w-full max-w-md">
              <div className="m-3 items-center flex justify-center">
                <img
                  src="https://th.bing.com/th/id/R.71935f4e295b1a7c194205d6468a3e78?rik=iHjuFUP4Jrfvvw&pid=ImgRaw&r=0"
                  alt="File Options"
                  width={50}
                  height={50}
                />
              </div>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <ul className="m-0 p-0 flex flex-col">
                <div className='flex items-center'>
                <li
                  className="hover:bg-gray-100 p-3 cursor-pointer"
                  onClick={downloadPdf}
                >
                  Download
                </li>
                <Download />
                </div>
                {admin && (
                  <li
                    className="hover:bg-gray-100 p-3 cursor-pointer"
                    onClick={deletePdf}
                  >
                    Delete
                  </li>
                )}
                <li
                  className="hover:bg-gray-100 p-3 cursor-pointer"
                  onClick={closeMenu}
                >
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
