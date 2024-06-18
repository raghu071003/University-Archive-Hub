import React, { useEffect, useState } from 'react';
import './Breadcrum.css';

function Breadcrum({ path }) {
  const [pathArray, setPathArray] = useState([]);

  useEffect(() => {
    setPathArray(path.split('/'));
  }, [path]);

  return (
    <div className='breadcrum shadow-2xl mt-20 rounded-md' id='box'>
      {pathArray.map((folder, index) => (
        <React.Fragment key={index}>
          {index > 0 && <img src='https://icon-library.com/images/right-arrow-icon/right-arrow-icon-18.jpg' width={10} height={10} alt=">" />}
          <p className='text-gray-700'>{folder}</p>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrum;
