// src/components/sstep1.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClubIcon from '../assets/ClubIcon.svg'; // Assuming ClubCon logo/icon
import bgImage from '../assets/bgImage.jpeg';
import ProfilePicture from '../assets/ProfilePicture.svg';

const SStep1 = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const [avatar] = useState(ProfilePicture); // Assuming a default avatar URL

  const handleContinue = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('api/user/create-or-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          avatar,
          contactNumber,
          designation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/sstep2'); // Navigate to the next step on success
      } else {
        setError(data.message || 'Failed to create or update profile');
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
        <form onSubmit={handleContinue} className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>
          
          <div className="mb-4">
            <label className="block text-left mb-2">Enter Your First Name:</label>
            <input 
              type="text" 
              placeholder="Enter your first name" 
              required 
              className="w-full p-2 border border-gray-300 rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-left mb-2">Enter Your Last Name:</label>
            <input 
              type="text" 
              placeholder="Enter your last name" 
              required 
              className="w-full p-2 border border-gray-300 rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-left mb-2">Enter Your Designation:</label>
            <input 
              type="text" 
              placeholder="Enter your designation" 
              required 
              className="w-full p-2 border border-gray-300 rounded"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-left mb-2">Enter Mobile No.:</label>
            <input 
              type="tel" 
              placeholder="Enter your mobile number" 
              required 
              className="w-full p-2 border border-gray-300 rounded"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <button type="submit" className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default SStep1;

