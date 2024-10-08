import React from 'react';
import ClubIcon from '../assets/ClubIcon.svg';
import ProfilePicture from '../assets/ProfilePicture.svg';

const DbHeader = () => {
    return (
        <header className="bg-gray-200 border-b border-gray-300 p-4 md:p-6 flex justify-between items-center">
          <div className="flex items-center text-2xl font-bold text-black">
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-2" />
            <i className="fa fa-university mr-0"></i>
            Rajasthan Technical University
          </div>
        
          <nav>
          <div className="flex space-x-4">
            <button className="bg-gray-300 text-black px-4 py-2 rounded-md">Add Admins</button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded-md">Add Club</button>
            <img src={ProfilePicture} alt="profile" className="w-10 h-10 rounded-full" />
          </div>
          </nav>
        </header>
    );
  };
  
  export default DbHeader;
  