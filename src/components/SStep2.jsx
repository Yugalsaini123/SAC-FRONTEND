// src/components/SignupPage.jsx
import React, { useState } from 'react';
import bgImage from '../assets/bgImage.jpeg';
import ClubIcon from '../assets/ClubIcon.svg'; 

const SignupPage = () => {
  const [formData, setFormData] = useState({
    organisationName: '',
    collegeAddress: '',
    pinCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    // Add your form submission logic here
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
            <label className="block text-left mb-2">Organisation Name:</label>
            <input
              type="text"
              name="organisationName"
              placeholder="Organisation Name"
              value={formData.organisationName}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            
            <label className="block text-left mb-2">Enter College Address:</label>
            <input
              type="text"
              name="collegeAddress"
              placeholder="Enter College Address"
              value={formData.collegeAddress}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
            />

            <label className="block text-left mb-2">Pin Code:</label>
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
            />

            <button type="submit" className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
