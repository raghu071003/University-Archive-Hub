import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import MyContext from './Context';
import { useLocation } from 'react-router-dom';
import Logout from './Logout';
function Navbar() {
    const { isLoggedIn, username } = useContext(MyContext)
    const location = useLocation();
    const currentLocation = location.pathname
    return (
        <div className="">
            <div className="bg-transparent border-b-2 z-40 flex flex-col lg:flex-row justify-between">
                <ul className='flex flex-col lg:flex-row mt-4 lg:mt-0 lg:space-x-8 justify-center text-xl lg:text-2xl p-4 font-semibold'>
                    <li>
                        <NavLink exact to="/" className={({ isActive }) =>

                            `${isActive ? 'text-black' : 'text-white'}
block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#e3e3e3] lg:p-0`}>
                            Home
                        </NavLink>
                    </li>
                    {!isLoggedIn && (
                        <>
                            <li>
                                <NavLink to="/login" className={({ isActive }) =>

                                    `${isActive ? 'text-black' : 'text-white'}
block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#e3e3e3] lg:p-0`}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup" className={({ isActive }) =>

                                    `${isActive ? 'text-black' : 'text-white'}
block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#e3e3e3] lg:p-0`}>
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <ul className='flex flex-col lg:flex-row mt-4 lg:mt-0 lg:space-x-8 justify-center text-xl lg:text-2xl p-4 font-semibold'>
                    {isLoggedIn && currentLocation === '/folders' && (
                        <>
                            <li className={

                            `
             block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#e3e3e3] lg:p-0`}>
                                Logged in as {username}
                            </li>
                            <li className={({ isActive }) =>

                            `${isActive ? 'text-black' : 'text-white'}
             block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#e3e3e3] lg:p-0`}>
                                <Logout />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>

    );
}

export default Navbar;
