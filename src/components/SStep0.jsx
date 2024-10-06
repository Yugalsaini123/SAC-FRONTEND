// src/components/SStep0.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg'; // Assuming ClubCon logo or icon
import bgImage from '../assets/bgImage.jpeg';

const LoginPage = () => {
  const navigate = useNavigate();
  const navigateToverifyemail = () => {
    navigate('/verify-email');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen justify-center items-center bg-gray-100">
      <div className="w-full md:w-1/2 bg-blue-100 flex justify-center items-center overflow-hidden">
        <img src={bgImage} alt="Background" className="w-4/5 max-w-md h-auto" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <h1 className="text-2xl font-bold mb-6"><i className="fa fa-university"></i> ClubCon</h1>
          <div className="mb-4">
            <label className="block text-left mb-2">Email id:</label>
            <input type="email" placeholder="Enter Id" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2">Password:</label>
            <input type="password" placeholder="Enter Password" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <p className="mb-4">Already Created? <a href="/login" className="text-blue-600 hover:underline">login</a></p>
          <button onClick={navigateToverifyemail} type="submit" className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
