import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg';

const ResetSuccessPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to login page or dashboard
    navigate('/login');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4">
        <div className="text-center">
        <div class="flex items justify-center text-2xl font-bold text-black">
        <img src={ClubIcon} alt="icon" class="h-8" />
        ClubCon
      </div>
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4 mt-6">
          <path d="M48.0623 14.5267C43.5979 11.5332 38.2268 9.78711 32.4479 9.78711C16.9436 9.78711 4.375 22.3558 4.375 37.86C4.375 53.3642 16.9436 65.9329 32.4479 65.9329C47.9522 65.9329 60.5208 53.3642 60.5208 37.86C60.5208 35.88 60.3159 33.9478 59.9259 32.0836" stroke="#34A853" stroke-width="5" stroke-linecap="round"/>
          <path d="M23.6973 35.9367L30.3904 42.6299C31.8142 44.0537 34.1226 44.0537 35.5464 42.6299L67.0827 11.0938" stroke="#34A853" stroke-width="5" stroke-linecap="round"/>
          </svg>
          {/* <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" /> */}
          
          <h2 className="text-xl font-medium mb-2">Password reset</h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset.<br />
            Click below to login directly.
          </p>
          
          <button
            onClick={handleContinue}
            className="w-full bg-customGray text-white py-2 px-4 rounded-md hover:bg-customGray-700 transition duration-300 mb-4"
          >
            Continue
          </button>
          
          <button
            onClick={handleBackToLogin}
            className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccessPage;