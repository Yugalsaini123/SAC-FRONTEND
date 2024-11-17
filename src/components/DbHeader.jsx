// src/components/DbHeader.jsx
import React, { useEffect, useState, useContext } from 'react';
import ClubIcon from '../assets/ClubIcon.svg';
import ProfilePicture from '../assets/ProfilePicture.svg';
import AuthContext from '../context/OrganisationContext';

const DbHeader = () => {
    const [organizationName, setOrganizationName] = useState('Loading...');
    const [profilePicture, setProfilePicture] = useState(ProfilePicture);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // First fetch the user profile
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

                const profileData = await profileResponse.json();
                const organizationId = profileData.data?.profile?.organizationId;
                
                // Set avatar from the nested profile object
                if (profileData.data?.profile?.profile?.avatar) {
                    setProfilePicture(profileData.data.profile.profile.avatar);
                }

                if (!organizationId) {
                    setOrganizationName('No Organization Found');
                    return;
                }

                // Then fetch organization details
                const organizationResponse = await fetch(`api/organization/${organizationId}`, {
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
                
                // Set organization name from the response
                if (orgData.data?.organization?.name) {
                    setOrganizationName(orgData.data.organization.name);
                } else {
                    setOrganizationName('Organization name not found');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setOrganizationName('Error loading organization');
            }
        };

        fetchData();
    }, [token]);

    return (
        <header className="bg-gray-200 border-b border-gray-300 p-4 md:p-6 flex justify-between items-center">
            <div className="flex items-center text-2xl font-bold text-black">
                <a href="/dashboard" className="flex items-center">
                    <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-2" />
                    <i className="fa fa-university mr-0"></i>
                    {organizationName}
                </a>
            </div>

            <nav>
                <div className="flex space-x-4">
                    <button className="bg-gray-300 text-black px-4 py-2 rounded-md">Add Admins</button>
                    <button className="bg-gray-300 text-black px-4 py-2 rounded-md">Add Club</button>
                    <a href="/editprofile" className="flex items-center">
                        <img 
                            src={profilePicture} 
                            alt="profile" 
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default DbHeader;
