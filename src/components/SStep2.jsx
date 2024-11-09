// src/components/SStep2.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bgImage.jpeg';
import ClubIcon from '../assets/ClubIcon.svg';
import AuthContext from '../context/OrganisationContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { token, setUserProfile } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // First API call to create organization
      const orgResponse = await fetch('api/organization/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!orgResponse.ok) {
        const errorData = await orgResponse.json();
        throw new Error(errorData.message || 'Failed to create organisation');
      }

      const orgData = await orgResponse.json();

      // Second API call to get updated user profile
      const profileResponse = await fetch('api/user/getUserProfile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch updated user profile');
      }

      const profileData = await profileResponse.json();

      // Update the context with the new user profile data
      setUserProfile(profileData.data);

      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-0">
      {/* Left side - Background Image */}
      <div className="relative w-full md:w-3/5 h-[calc(100vh-80px)] overflow-hidden">
        <img 
          src={bgImage} 
          alt="Background" 
          className="w-[calc(100vh-80px)] h-[calc(100vh-80px)] object-cover object-left-top" 
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Logo and Title */}
            <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">
              <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0" />
              <i className="fa fa-university mr-0"></i>
              ClubCon
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            {/* Organization Name Field */}
            <div className="mb-4">
              <label className="block text-left mb-2 text-gray-700">
                Organisation Name:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Organisation Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label className="block text-left mb-2 text-gray-700">
                Description:
              </label>
              <textarea
                name="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500 min-h-[100px]"
                required
              />
            </div>

            {/* Address Field */}
            <div className="mb-6">
              <label className="block text-left mb-2 text-gray-700">
                College Address:
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter College Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded transition-colors duration-200 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {isLoading ? 'Creating Organization...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;