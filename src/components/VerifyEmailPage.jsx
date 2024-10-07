// src/components/VerifyEmailPage.jsx
import React, { useState } from 'react';
import ClubIcon from '../assets/ClubIcon.svg'; 
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(""));

  // Handle input change
  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move to next input if available
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const navigate = useNavigate();
  const navigateTosstep1 = () => {
    navigate('/sstep1');
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    console.log("Verification Code:", code);
    // Add your verification logic here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="flex justify-center items-center text-2xl font-bold text-black mb-4">
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>
        <p className="mb-2">Please check your email</p>
        <p className="mb-4">We’ve sent a code to <strong>abc@university.com</strong></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between space-x-2">
            {verificationCode.map((value, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={value}
                maxLength="1"
                onChange={(e) => handleInputChange(e, index)}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>

          <button onClick={navigateTosstep1} type="submit" className="w-full py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Verify</button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Didn’t receive an email? <a href="#" className="text-blue-600 hover:underline">Resend</a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

