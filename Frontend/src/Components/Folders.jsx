import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import File from './File';
import Upload from './Upload';
import Breadcrum from './Breadcrum';
import { useNavigate } from 'react-router-dom';
import MyContext from './Context';

function Folders() {
  const navigate = useNavigate();
  const { isLoggedIn, admin } = useContext(MyContext);
  const [path, setPath] = useState('/');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, [path]);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/files${path}`);
      setFiles(response.data.fileList);
    } catch (err) {
      setError('Error fetching files. Please try again later.');
      console.error('Error fetching files:', err);
    }
    setLoading(false);
  };

  const openFolder = (name) => {
    setPath(`${path}${name}/`);
  };

  const back = () => {
    let p = path.split('/');
    p.pop();
    if (p.pop() !== '') {
      p.push('');
    }
    setPath(p.join('/'));
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="relative top-0 left-0 p-4   ">
          <div className="flex items-center mb-4 p-3">
            <div>
            <Breadcrum path={path} onBack={back}/>
            </div>
            
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center my-4">
              {error}
            </div>
          ) : (
            <ul className="flex flex-wrap justify-center">
              {files.map((file) => (
                <li key={file.name} className="m-2">
                  {file.type === 'folder' ? (
                    <div
                      className="flex flex-col justify-center items-center shadow-lg rounded-lg cursor-pointer w-48 sm:w-36 hover:shadow-2xl transition-shadow duration-300"
                      onClick={() => openFolder(file.name)}
                    >
                      <img
                        src="https://static-00.iconduck.com/assets.00/folder-icon-2048x1638-vinzc398.png"
                        alt={`Folder icon for ${file.name}`}
                        className="w-24 p-4"
                      />
                      <p className="text-lg text-black font-bold p-4 mt-0">
                        {file.name}
                      </p>
                    </div>
                  ) : (
                    <File name={file.name} fileId={`${path}/${file.name}`} />
                  )}
                </li>
              ))}
            </ul>
          )}
          
          <Upload path={path} onUploadSuccess={fetchFiles} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold text-3xl h-screen">
          <p className="mb-4">Please log in to view folders.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}

export default Folders;