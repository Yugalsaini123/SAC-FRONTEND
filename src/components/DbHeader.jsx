// src/components/DbHeader.jsx
import React, { useEffect, useState, useContext } from 'react';
import ClubIcon from '../assets/ClubIcon.svg';
import ProfilePicture from '../assets/ProfilePicture.svg';
import AuthContext from '../context/OrganisationContext';

const DbHeader = () => {
    const [organizationName, setOrganizationName] = useState('Loading...');
    const { token, userProfile } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrganizationName = async () => {
            try {
                // First check if we have userProfile and organizationId
                if (!userProfile) {
                    console.log('No user profile found, fetching profile...');
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
                    const organizationId = profileData.data.organizationId;

                    if (!organizationId) {
                        setOrganizationName('No Organization Found');
                        return;
                    }

                    // Fetch organization details
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
                    if (orgData.data && orgData.data.organization && orgData.data.organization.name) {
                        setOrganizationName(orgData.data.organization.name);
                    } else {
                        setOrganizationName('Organization name not found');
                    }
                } else {
                    // If we have userProfile, use the organizationId from it
                    const organizationId = userProfile.organizationId;
                    
                    if (!organizationId) {
                        setOrganizationName('No Organization Found');
                        return;
                    }

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
                    if (orgData.data && orgData.data.organization && orgData.data.organization.name) {
                        setOrganizationName(orgData.data.organization.name);
                    } else {
                        setOrganizationName('Organization name not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching organization:', error);
                setOrganizationName('Error loading organization');
            }
        };

        fetchOrganizationName();
    }, [userProfile, token]);

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
                        <img src={ProfilePicture} alt="profile" className="w-10 h-10 rounded-full" />
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default DbHeader;



  