// src/components/VerifyEmailPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg';

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract email from the location state (passed from the registration page)
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // If email is not in location state, try to get it from localStorage
      const storedEmail = localStorage.getItem('registrationEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        setError("Email information not found. Please try registering again.");
      }
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
        body: JSON.stringify({ 
          token: code,
          email: email // Include email in verification request
        }),
      });

      if (response.ok) {
        setMessage("Email verified successfully!");
        localStorage.removeItem('registrationEmail'); // Clean up stored email
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
    if (!email) {
      setError("Email address is missing. Please try registering again.");
      return;
    }

    setError("");
    setMessage("");
    setIsResending(true);

    try {
      const response = await fetch('api/auth/resendVerifyMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email // Ensure email is included in the payload
        }),
      });

      if (response.ok) {
        setMessage("Verification email resent successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to resend verification email. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsResending(false);
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
        {email ? (
          <p className="mb-4">We've sent a verification mail, click the link in it to verify your e-mail <strong>{email}</strong></p>
        ) : (
          <p className="text-red-500 mb-4">Email address not found. Please try registering again.</p>
        )}
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        
        <p className="mt-4 text-sm text-gray-600">
          Didn't receive verification email?{' '}
          <button 
            onClick={handleResendEmail} 
            className={`text-blue-600 hover:underline ${isResending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isResending || !email}
          >
            {isResending ? 'Resending...' : 'Resend'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;