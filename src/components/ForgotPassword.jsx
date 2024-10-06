import React, { useState } from 'react';
import ClubIcon from '../assets/ClubIcon.svg';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to handle email submission and send the 6-digit code
    console.log("6-digit code sent to:", email);
  };

  const navigateToverify = () => {
    navigate('/otp-verify');
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
      <div class="flex items justify-center text-2xl font-bold text-black">
        <img src={ClubIcon} alt="icon" class="h-8" />
        ClubCon
      </div>
        <h2 className="text-2xl font-regular mb-4 mt-8">Reset Password</h2>
        <p className="text-gray-600 mb-6">Forgot your password? Please enter your email and we’ll send you a 6-digit code.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={navigateToverify}
            type="submit"
            className="bg-customGray text-white py-3 rounded-lg hover:bg-Gray-200 transition duration-300"
          >
            Get 6-digit code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
