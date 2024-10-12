import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import MyContext from './Context';
import Logout from './Logout';

function Navbar() {
  const { isLoggedIn, username } = useContext(MyContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-4 rounded-lg transition duration-200 ${
      isActive ? 'bg-white text-blue-600' : 'text-white'
    } hover:bg-blue-700`;

  return (
    <nav className='bg-blue-600 text-white shadow-md w-full z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex-shrink-0 text-2xl font-bold'>MyApp</div>
          <div className='hidden lg:flex lg:items-center lg:w-auto'>
            <ul className='flex space-x-4'>
              <li>
                <NavLink end to='/' className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              {!isLoggedIn && (
                <>
                  <li>
                    <NavLink to='/login' className={navLinkClass}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/signup' className={navLinkClass}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <ul className='flex items-center justify-center gap-2'>
                  <li >
                    <span className='text-gray-200 '>Logged in as {username}</span>
                  </li>
                  <li>
                    <Logout />
                  </li>
                </ul>
              )}
            </ul>
          </div>
          <button
            className='lg:hidden text-white'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              ></path>
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden`}>
          <ul className='pt-2 pb-4 space-y-2'>
            <li>
              <NavLink end to='/' className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to='/login' className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/signup' className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <ul className='flex items-center justify-center'>
                <li className='text-gray-200'>
                  Logged in as {username}
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;