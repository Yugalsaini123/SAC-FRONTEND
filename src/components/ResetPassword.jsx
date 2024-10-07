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
    <div className="w-full flex justify-center items-center h-screen ">
      <div className="w-4/5 bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>

        <h2 className="text-xl font-regular mb-2">Set new password</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Your new password must be different to <br></br>previously used passwords.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md "
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-left text-gray-700 mb-1">
              Confirm password:
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md "
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={navigateToresetsuccess}
            type="submit"
            className="w-full bg-gray-300 text-black py-2 rounded mt-4 hover:bg-gray-400"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;