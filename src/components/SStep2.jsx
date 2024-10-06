// src/components/SignupPage.jsx
import React, { useState } from 'react';
import bgImage from '../assets/bgImage.jpeg';

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
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/2 bg-blue-100 flex justify-center items-center overflow-hidden">
        <img src={bgImage} alt="Background" className="w-4/5 max-w-md h-auto" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="mb-2">Organisation Name:</label>
            <input
              type="text"
              name="organisationName"
              placeholder="Organisation Name"
              value={formData.organisationName}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            
            <label className="mb-2">Enter College Address:</label>
            <input
              type="text"
              name="collegeAddress"
              placeholder="Enter College Address"
              value={formData.collegeAddress}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
            />

            <label className="mb-2">Pin Code:</label>
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded"
            />

            <button type="submit" className="bg-gray-300 py-2 rounded hover:bg-gray-400">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
