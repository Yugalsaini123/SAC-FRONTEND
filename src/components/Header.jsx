// src/components/Header.jsx
import React from 'react';
import ClubIcon from '../assets/ClubIcon.svg';
import Support from '../assets/Support.svg';

const Header = () => {
  return (
    <header className="bg-gray-200 border-b border-gray-300 p-4 md:p-6 flex justify-between items-center">
      <div className="flex items-center text-2xl font-bold text-black">
        <a href="/" className="flex items-center">
        <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
          <i className="fa fa-university mr-0"></i>
          ClubCon
        </a>
      </div>

      <nav>
        <ul className="flex space-x-4 text-gray-700 font-medium">
          <li>
            <a href="#" className="hover:text-blue-500 transition duration-300">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500 transition duration-300">
              Review
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:text-blue-500 transition duration-300">
              Support <img src={Support} alt="support" className="ml-2 w-5 h-auto" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
