import React, { createContext, useState } from 'react';

// Create a context
const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username , setUsernameContext] = useState("")
  const [admin,setAdmin] = useState(false)

  return (
    <MyContext.Provider value={{ isLoggedIn, setIsLoggedIn,setUsernameContext,username,admin,setAdmin}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext; // You can choose either named or default export
