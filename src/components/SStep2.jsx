// src/components/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bgImage.jpeg';
import ClubIcon from '../assets/ClubIcon.svg'; 

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const token = localStorage.getItem('token'); // Retrieve token from local storage (if stored after login)
  
    try {
      const response = await fetch('api/organization/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization header if needed
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Organisation created successfully', data);
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create organisation. Please try again.');
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
        <div className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">
              <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
              <i className="fa fa-university mr-0"></i>
              ClubCon
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <label className="block text-left mb-2">Organisation Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Organisation Name"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
              required
            />

            <label className="block text-left mb-2">Description:</label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
              required
            />
            
            <label className="block text-left mb-2">Enter College Address:</label>
            <input
              type="text"
              name="address"
              placeholder="Enter College Address"
              value={formData.address}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
              required
            />

            <button type="submit" className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;