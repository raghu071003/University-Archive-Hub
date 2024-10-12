import React, { useEffect, useState } from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import './Breadcrum.css';

function Breadcrum({ path, onNavigate, onBack }) {
  const [pathArray, setPathArray] = useState([]);

  useEffect(() => {
    const paths = path.split('/').filter(folder => folder !== '');
    setPathArray(paths);
  }, [path]);

  const handleClick = (index) => {
    const newPath = '/' + pathArray.slice(0, index + 1).join('/');
    onNavigate(newPath);
  };

  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
    } else {
      // Default back behavior if onBack is not provided
      const newPath = path === '/' ? '/' : path.split('/').slice(0, -1).join('/') || '/';
      onNavigate(newPath);
    }
  };

  return (
    <nav className="breadcrum flex items-center shadow-md rounded-md px-4 py-2 bg-white">
      {path !== '/' && (
        <button 
          className="text-gray-600 hover:text-gray-800 flex items-center mr-4" 
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span className="text-sm">Back</span>
        </button>
      )}
      
      <div className="flex items-center overflow-x-auto whitespace-nowrap">
        <button 
          className="text-gray-600 hover:text-gray-800 flex items-center" 
          onClick={() => onNavigate('/')}
          aria-label="Go to home"
        >
          <Home size={16} className="mr-1" />
          <span className="text-sm">Home</span>
        </button>
        
        {pathArray.map((folder, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <button
              className="text-gray-600 hover:text-blue-500 text-sm"
              onClick={() => handleClick(index)}
            >
              {folder}
            </button>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}

export default Breadcrum;