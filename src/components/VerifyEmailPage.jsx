// src/components/VerifyEmailPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg';

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract email from the location state (passed from the registration page)
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    setError("");
    setMessage("");

    try {
      const response = await fetch('api/auth/verifyUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: code }),
      });

      if (response.ok) {
        setMessage("Email verified successfully!");
        // Navigate to the next step after a short delay
        setTimeout(() => navigate('/sstep1'), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleResendEmail = async () => {
    setError("");
    setMessage("");

    try {
      const response = await fetch('api/resendVerifyMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Verification email resent successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to resend verification email. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
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
        <p className="mb-4">We've sent a verification mail, click the link in it to verify your e-mail <strong>{email}</strong></p>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}

        {/* <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <button type="submit" className="w-full py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
            Verify
          </button>
        </form> */}
        
        <p className="mt-4 text-sm text-gray-600">
          Didn't receive verification email? <button onClick={handleResendEmail} className="text-blue-600 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
