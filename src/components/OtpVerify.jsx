import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg';

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(""));
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const navigateToresetpassword = () => {
    navigate('/reset-password');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    console.log("Verification Code:", code);
    // Add your verification logic here
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-4/5 max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>
        <p className="text-sm text-gray-600 mb-2">Please check your email</p>
        <p className="text-sm text-gray-600 mb-4">We've sent a code to <strong>abc@university.com</strong></p>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex justify-between mb-4">
            {verificationCode.map((value, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={value}
                maxLength="1"
                onChange={(e) => handleInputChange(e, index)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            onClick={navigateToresetpassword}
            type="submit"
            className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Verify
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Didn't receive an email? <a href="#" className="text-blue-600 hover:underline">Resend</a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;