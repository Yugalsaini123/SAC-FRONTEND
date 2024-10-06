import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const navigateToresetsuccess = () => {
    navigate('/reset-success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    // Here you would typically call an API to reset the password
    console.log('Password reset successfully');
    navigate('/reset-success'); // Navigate to success page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <div class="flex items justify-center text-2xl font-bold text-black">
          <img src={ClubIcon} alt="icon" class="h-8" />
          ClubCon
          </div>
        </div>

        <h2 className="text-xl font-medium mb-2">Set new password</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Your new password must be different to <br></br>previously used passwords.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={navigateToresetsuccess}
            type="submit"
            className="w-full bg-gray-300 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;