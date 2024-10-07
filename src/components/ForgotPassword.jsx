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
    <div className="w-full flex justify-center items-center h-screen ">
      <div className="w-4/5 bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>
        <h2 className="text-xl font-regular mb-4 mt-6">Reset Password</h2>
        <p className="text-gray-600 mb-6 text-sm">Forgot your password? Please enter your registered email and we’ll send you a 6-digit code.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            onClick={navigateToverify}
            type="submit"
            className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Get 6-digit code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
