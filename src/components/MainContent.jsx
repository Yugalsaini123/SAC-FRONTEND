// src/components/MainContent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bgImage.jpeg';

const MainContent = () => {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/signup');
  };
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-0">
      <div className="relative w-full md:w-3/5 h-[calc(100vh-80px)] overflow-hidden">
        <img src={bgImage} alt="Background" className="w-[calc(100vh-80px)] h-[calc(100vh-80px)] object-cover object-left-top" />
      </div>
      <div className="w-full md:w-1/2 text-left justify-center items-center   ">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to ClubCon</h1>
        <p className="text-lg text-gray-600 mb-4">Join the community that's right for you.</p>
        <div className="flex gap-4 p-4 md:p-0">
          <button onClick={navigateToSignup} className="px-6 py-3 bg-gray-300 rounded hover:bg-gray-400">Create an Organisation</button>
          <button onClick={navigateToLogin} className="px-6 py-3 bg-gray-300 rounded hover:bg-gray-400">Login</button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
