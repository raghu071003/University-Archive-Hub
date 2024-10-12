import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-8 mt-10">
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="md:flex md:justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="https://www.schools360.in/wp-content/uploads/2017/05/rgukt.png"
                className="mr-3 h-20"
                alt="Logo"
              />
              <div>
                <p className="text-white font-bold uppercase text-xl">RGUKT</p>
                <p className="text-gray-300 text-sm">Basar</p>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Resources</h2>
              <ul>
                <li className="mb-2">
                  <Link to="/" className="hover:text-gray-300 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gray-300 transition-colors duration-300">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Follow us</h2>
              <ul>
                <li className="mb-2">
                  <a
                    href="https://github.com/"
                    className="hover:text-gray-300 transition-colors duration-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <Link to="/discord" className="hover:text-gray-300 transition-colors duration-300">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Legal</h2>
              <ul>
                <li className="mb-2">
                  <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-gray-300 transition-colors duration-300">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-500" />
        <div className="text-center">
          <span className="text-sm">
            © 2024 Sai Raghu Vamshi. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
