import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg'; // Assuming ClubCon logo/icon
import bgImage from '../assets/bgImage.jpeg';

const SStep1 = () => {
  const navigate = useNavigate();
  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/sstep2');
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-0">
      <div className="relative w-full md:w-3/5 h-[calc(100vh-80px)] overflow-hidden">
        <img src={bgImage} alt="Background" className="w-[calc(100vh-80px)] h-[calc(100vh-80px)] object-cover object-left-top" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>
          
          <div className="mb-4">
            <label className="block text-left mb-2">Enter Your Name:</label>
            <input type="text" placeholder="Enter your name" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          
          <div className="mb-4">
            <label className="block text-left mb-2">Enter Your Designation:</label>
            <input type="text" placeholder="Enter your designation" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          
          <div className="mb-4">
            <label className="block text-left mb-2">Enter Mobile No.:</label>
            <input type="tel" placeholder="Enter your mobile number" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          
          <button onClick={handleContinue} className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default SStep1;
