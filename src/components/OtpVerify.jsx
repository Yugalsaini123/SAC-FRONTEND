import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl mb-4"><i className="fa fa-university"></i> ClubCon</h1>
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
            className="w-full py-2 px-4 bg-gray-300 text-white rounded-md hover:bg-gray-400 transition duration-300"
          >
            Verify
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Didn't receive an email? <a href="#" className="font-bold text-black hover:underline">Resend</a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;