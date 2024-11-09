// src/components/EditProfile.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../assets/HomeIcon.svg';
import AboutIcon from '../assets/AboutIcon.svg';
import ContactIcon from '../assets/ContactIcon.svg';
import FaqIcon from '../assets/FaqIcon.svg';
import ProfilePicture from '../assets/ProfilePicture.svg';
import LogoutIcon from '../assets/LogoutIcon.svg';
import AuthContext from '../context/OrganisationContext';

const EditProfile = () => {
  const { setToken, setUserProfile, userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Form state with split name fields
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    designation: '',
    avatar: null
  });

  const [orgDetails, setOrgDetails] = useState({
    organizationName: '',
    collegeAddress: '',
    description: ''
  });

  // Load initial data if available
  useEffect(() => {
    if (userProfile) {
      setPersonalDetails({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        contactNumber: userProfile.contactNumber || '',
        designation: userProfile.designation || '',
        avatar: userProfile.avatar || null
      });
      setOrgDetails({
        organizationName: userProfile.organizationName || '',
        collegeAddress: userProfile.collegeAddress || '',
        description: userProfile.description || ''
      });
    }
  }, [userProfile]);

  // Fetch updated profile data
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('api/user/getUserProfile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch updated profile');
      }

      const data = await response.json();
      setUserProfile(data); // Update context with new data
    } catch (err) {
      console.error('Error fetching updated profile:', err);
    }
  };

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      setPersonalDetails(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const handleOrgDetailsChange = (e) => {
    setOrgDetails({
      ...orgDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('firstName', personalDetails.firstName);
      formData.append('lastName', personalDetails.lastName);
      formData.append('email', personalDetails.email);
      formData.append('contactNumber', personalDetails.contactNumber);
      formData.append('designation', personalDetails.designation);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      // Update personal details
      const userResponse = await fetch('api/user/create-or-update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!userResponse.ok) {
        throw new Error('Failed to update personal details');
      }

      // Update organization details
      const orgId = userProfile?.organizationId;
      if (orgId) {
        const orgResponse = await fetch(`api/organization/update/${orgId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(orgDetails)
        });

        if (!orgResponse.ok) {
          throw new Error('Failed to update organization details');
        }
      }

      setSuccess(true);
      // Fetch updated profile data
      await fetchUserProfile();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setToken(null);
        setUserProfile(null);
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Error logging out');
      }
    } catch (error) {
      setError('Error logging out');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <ul className="space-y-4">
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="#" className="flex items-center w-full">
              <img src={HomeIcon} alt="Home" className="w-6 h-auto mr-2" />
              Home
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="#" className="flex items-center w-full">
              <img src={AboutIcon} alt="About Us" className="w-6 h-auto mr-2" />
              About Us
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="#" className="flex items-center w-full">
              <img src={ContactIcon} alt="Contact Us" className="w-6 h-auto mr-2" />
              Contact Us
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="#" className="flex items-center w-full">
              <img src={FaqIcon} alt="FAQ" className="w-6 h-auto mr-2" />
              FAQ
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="#" className="flex items-center w-full" onClick={handleLogout}>
              <img src={LogoutIcon} alt="logout" className="w-6 h-auto mr-2" />
              Log Out 
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4">
        <section>
          <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>

          {error && (
            <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded">
              Profile updated successfully!
            </div>
          )}

          {/* Profile Picture with file input */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={avatarPreview || personalDetails.avatar || ProfilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <label
                htmlFor="avatar"
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-blue-500 text-sm cursor-pointer"
              >
                Edit Picture
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
              <div className="space-y-4">
                {/* Split name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left text-sm font-medium">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={personalDetails.firstName}
                      onChange={handlePersonalDetailsChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium">Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={personalDetails.lastName}
                      onChange={handlePersonalDetailsChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={personalDetails.email}
                    onChange={handlePersonalDetailsChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Contact Number:</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={personalDetails.contactNumber}
                    onChange={handlePersonalDetailsChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Designation:</label>
                  <input
                    type="text"
                    name="designation"
                    value={personalDetails.designation}
                    onChange={handlePersonalDetailsChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Organisation Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Organisation Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium">Organisation Name:</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={orgDetails.organizationName}
                    onChange={handleOrgDetailsChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">College Address:</label>
                  <input
                    type="text"
                    name="collegeAddress"
                    value={orgDetails.collegeAddress}
                    onChange={handleOrgDetailsChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={orgDetails.description}
                    onChange={handleOrgDetailsChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="col-span-full flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`bg-gray-300 text-lg font-semibold p-3 rounded-md shadow transition duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                }`}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default EditProfile;