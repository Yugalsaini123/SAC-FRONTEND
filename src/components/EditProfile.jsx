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
  const { token, userProfile } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const { setToken, setUserProfile } = useContext(AuthContext);
  const navigate = useNavigate(); 

  // State for form data
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    designation: '',
    avatar: ProfilePicture, 
    bio: '',
    yearOfStudy: '',
    specialization: '',
    collegeRollNo: '',
    univRollNo: '',
    academicStatus: ''
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
          avatar: reader.result // Set the avatar to the data URL for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to upload avatar and get URL
  const uploadAvatar = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('api/user/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload avatar');
      }

      const data = await response.json();
      return data.avatarUrl; // Assuming the API returns the uploaded file URL
    } catch (error) {
      console.error('Avatar upload failed:', error);
      return null;
    }
  };

  // Fetch user profile and organization details
  useEffect(() => {
    const fetchProfileAndOrgDetails = async () => {
      try {
        let profileData = userProfile;
        if (!profileData) {
          const profileResponse = await fetch('api/user/getUserProfile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!profileResponse.ok) {
            throw new Error('Failed to fetch user profile');
          }

          const response = await profileResponse.json();
          profileData = response.data.profile;
        }

        // Set personal details from profile
        setPersonalDetails({
          firstName: profileData.profile?.firstName || '',
          lastName: profileData.profile?.lastName || '',
          email: profileData.email || '',
          contactNumber: profileData.profile?.contactNumber || '',
          designation: profileData.profile?.designation || '',
          avatar: profileData.profile?.avatar || ProfilePicture, // Use default if no avatar
          bio: profileData.profile?.bio || '',
          yearOfStudy: profileData.profile?.yearOfStudy || '',
          specialization: profileData.profile?.specialization || '',
          collegeRollNo: profileData.profile?.collegeRollNo || '',
          univRollNo: profileData.profile?.univRollNo || '',
          academicStatus: profileData.profile?.academicStatus || ''
        });

        if (profileData.organizationId) {
          const organizationResponse = await fetch(`api/organization/${profileData.organizationId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!organizationResponse.ok) {
            throw new Error('Failed to fetch organization details');
          }

          const orgData = await organizationResponse.json();
          if (orgData.data && orgData.data.organization) {
            setOrgDetails({
              name: orgData.data.organization.name || '',
              description: orgData.data.organization.description || '',
              address: orgData.data.organization.address || ''
            });
          }
        }
      } catch (err) {
        setError('Failed to fetch profile or organization details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndOrgDetails();
  }, [token, userProfile]);

  // Function to handle personal details update
  const handlePersonalUpdate = async () => {
    try {
      let avatarUrl = personalDetails.avatar;
      
      // If there's a new file selected, upload it first
      if (selectedFile) {
        const uploadedAvatarUrl = await uploadAvatar(selectedFile);
        if (uploadedAvatarUrl) {
          avatarUrl = uploadedAvatarUrl;
        }
      }

      const response = await fetch('api/user/create-or-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...personalDetails,
          profile: {
            firstName: personalDetails.firstName,
            lastName: personalDetails.lastName,
            bio: personalDetails.bio,
            avatar: avatarUrl, // Use the avatar URL (either new or existing)
            designation: personalDetails.designation,
            yearOfStudy: personalDetails.yearOfStudy,
            specialization: personalDetails.specialization,
            collegeRollNo: personalDetails.collegeRollNo,
            univRollNo: personalDetails.univRollNo,
            academicStatus: personalDetails.academicStatus
          }
        }),
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
    // Get organizationId from the current profile data
    const organizationId = userProfile?.organizationId || 
                          (await (await fetch('api/user/getUserProfile', {
                            headers: {
                              'Authorization': `Bearer ${token}`
                            }
                          })).json())?.data?.profile?.organizationId;

    if (!organizationId) {
      setError('Organization ID not found in user profile');
      return;
    }

    try {
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
      setError('Failed to update organization details');
      console.error('Error:', err);
    }
  };

  // Handle save all changes
  const handleSaveChanges = async () => {
    await handlePersonalUpdate();
    await handleOrgUpdate();
  };

  // Handle input changes for personal details
  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle input changes for organization details
  const handleOrgInputChange = (e) => {
    const { name, value } = e.target;
    setOrgDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

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
            <img src={HomeIcon} alt="Home" className="w-6 h-auto mr-2" />
            Home
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
             <a href="#" className="flex items-center w-full" onClick={handleLogout}>
               <img src={LogoutIcon} alt="logout" className="w-6 h-auto mr-2" />
               Log Out 
             </a>
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
                    onChange={handlePersonalInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

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