// src/components/SStep0.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg';
import bgImage from '../assets/bgImage.jpeg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('api/auth/registerSuperAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (response.ok) {
        localStorage.setItem('registrationEmail', email); // Add this line
        navigate('/verify-email', { state: { email } });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-0">
      <div className="relative w-full md:w-3/5 h-[calc(100vh-80px)] overflow-hidden">
        <img src={bgImage} alt="Background" className="w-[calc(100vh-80px)] h-[calc(100vh-80px)] object-cover object-left-top" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form onSubmit={handleSubmit} className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-left mb-2">Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2">Email id:</label>
            <input
              type="email"
              placeholder="Enter Id"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2">Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              required
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-600 mb-4">Already Created? <a href="/login" className="text-blue-600 hover:underline">login</a></p>
          <button type="submit" className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
