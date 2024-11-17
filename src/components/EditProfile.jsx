// src/components/EditProfile.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../assets/HomeIcon.svg';
import AboutIcon from '../assets/AboutIcon.svg';
import ContactIcon from '../assets/ContactIcon.svg';
import FaqIcon from '../assets/FaqIcon.svg';
import ProfilePicture from '../assets/ProfilePicture.svg';
import LogoutIcon from '../assets/LogoutIcon.svg';
import AuthContext from '../context/OrganisationContext';

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, setToken, setUserProfile } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  // Updated state to match API response structure
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: ProfilePicture,
    designation: '',
    contactNumber: ''
  });

  const [orgDetails, setOrgDetails] = useState({
    name: '',
    description: '',
    address: ''
  });

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPersonalDetails(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch user profile and organization details
  useEffect(() => {
    const fetchProfileAndOrgDetails = async () => {
      setLoading(false);
      try {
        const profileResponse = await fetch('api/user/getUserProfile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const profileData = await profileResponse.json();
        const profile = profileData.data.profile;

        // Set personal details from API response
        setPersonalDetails({
          firstName: profile.profile?.firstName || '',
          lastName: profile.profile?.lastName || '',
          email: profile.email || '',
          avatar: profile.profile?.avatar || ProfilePicture,
          designation: profile.profile?.designation || '',
          contactNumber: profile.profile?.contactNumber || ''
        });

        // Get organization details if organizationId exists
        if (profile.organizationId) {
          const orgResponse = await fetch(`api/organization/${profile.organizationId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!orgResponse.ok) {
            throw new Error('Failed to fetch organization details');
          }

          const orgData = await orgResponse.json();
          const organization = orgData.data.organization;

          setOrgDetails({
            name: organization.name || '',
            description: organization.description || '',
            address: organization.address || ''
          });
        }
      } catch (err) {
        setError('Failed to fetch profile or organization details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndOrgDetails();
  }, [token]);

  // Updated function to handle personal details update
  const handlePersonalUpdate = async () => {
    try {
      // Sending request body in the exact format shown in the API response
      const requestBody = {
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        avatar: personalDetails.avatar,
        contactNumber: personalDetails.contactNumber,
        designation: personalDetails.designation
      };

      const response = await fetch('api/user/create-or-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.responseType === 'success') {
        alert('Personal details updated successfully!');
      }
    } catch (err) {
      setError('Failed to update personal details');
      console.error('Error:', err);
    }
  };

  // Function to handle organization details update
  const handleOrgUpdate = async () => {
    try {
      const profileResponse = await fetch('api/user/getUserProfile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const profileData = await profileResponse.json();
      const organizationId = profileData.data.profile.organizationId;

      if (!organizationId) {
        throw new Error('Organization ID not found');
      }

      const response = await fetch(`api/organization/update/${organizationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orgDetails),
      });

      const data = await response.json();
      if (data.responseType === 'success') {
        alert('Organization details updated successfully!');
      }
    } catch (err) {
      setError(err.message || 'Failed to update organization details');
      console.error('Error:', err);
    }
  };

  const handleSaveChanges = async () => {
    await handlePersonalUpdate();
    await handleOrgUpdate();
  };

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrgInputChange = (e) => {
    const { name, value } = e.target;
    setOrgDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <ul className="space-y-4">
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="/dashboard" className="flex items-center">
              <img src={HomeIcon} alt="Home" className="w-6 h-auto mr-2" />
              Home
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <img src={AboutIcon} alt="About Us" className="w-6 h-auto mr-2" />
            About Us
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <img src={ContactIcon} alt="Contact Us" className="w-6 h-auto mr-2" />
            Contact Us
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <img src={FaqIcon} alt="FAQ" className="w-6 h-auto mr-2" />
            FAQ
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <button onClick={handleLogout} className="flex items-center w-full">
              <img src={LogoutIcon} alt="Logout" className="w-6 h-auto mr-2" />
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={personalDetails.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-blue-500 text-sm cursor-pointer"
              >
                Edit Picture
              </label>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left text-sm font-medium">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={personalDetails.firstName}
                      onChange={handlePersonalInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium">Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={personalDetails.lastName}
                      onChange={handlePersonalInputChange}
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
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                {/* <div>
                  <label className="block text-left text-sm font-medium">Contact Number:</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={personalDetails.contactNumber}
                    onChange={handlePersonalInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div> */}
                <div>
                  <label className="block text-left text-sm font-medium">Designation:</label>
                  <input
                    type="text"
                    name="designation"
                    value={personalDetails.designation}
                    onChange={handlePersonalInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </form>
            </div>

            {/* Organisation Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Organisation Details</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium">Organisation Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={orgDetails.name}
                    onChange={handleOrgInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Description:</label>
                  <textarea
                    name="description"
                    value={orgDetails.description}
                    onChange={handleOrgInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="1"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Address:</label>
                  <textarea
                    name="address"
                    value={orgDetails.address}
                    onChange={handleOrgInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="1"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleSaveChanges}
              className="bg-gray-300 text-black text-lg font-semibold p-3 rounded-md shadow hover:bg-gray-400 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditProfile;