import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <footer className="bg-transparent backdrop-blur-sm border-t border-gray-300 bottom-0">
  <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0">
        <Link to="/" className="flex items-center">
          <img
            src="https://www.schools360.in/wp-content/uploads/2017/05/rgukt.png"
            className="mr-3 h-20"
            alt="Logo"
          />
          <div>
            <p className='text-black font-bold uppercase text-xl leading-5'>RGUKT</p>
            <p className='text-black text-sm'>Basar</p>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <h2 className="mb-4 text-sm font-semibold text-black uppercase">Resources</h2>
          <ul className="text-black font-medium">
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
          <ul className="text-black font-medium">
            <li className="mb-2">
              <a
                href="https://github.com/"
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <Link to="/discord" className="hover:underline">
                Discord
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
          <ul className="text-black font-medium">
            <li className="mb-2">
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
    <div className="flex items-center justify-center">
      <span className="text-sm text-black text-center">
        © 2024 Jacinth Boddukolla. All Rights Reserved.
      </span>
    </div>
  </div>
</footer>

  )
}

export default Footer
