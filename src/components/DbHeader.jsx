import React, { useEffect, useState } from 'react';
import ClubIcon from '../assets/ClubIcon.svg';
import ProfilePicture from '../assets/ProfilePicture.svg';

const DbHeader = () => {
    const [organizationName, setOrganizationName] = useState('Loading...');
    const [token, setToken] = useState(localStorage.getItem('token') || ''); // Assuming token is stored in localStorage after login

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetch the user profile to get the organization ID
                const profileResponse = await fetch('api/user/getUserProfile', {
                    method: 'GET',
                    // headers: {
                    //     'Content-Type': 'application/json',
                    //     'Authorization': `Bearer ${token}`, // Passing token for authorization
                    // },
                });
                console.log("It has been called Again")

                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    const organizationId = profileData.data.organizationId;

                    if (!organizationId) {
                        setOrganizationName('No Organization Found');
                        return;
                    }

                    // Fetch the organization details using the retrieved organization ID
                    const organizationResponse = await fetch(`api/organization/${organizationId}`, {
                        method: 'GET',
                        // headers: {
                        //     'Content-Type': 'application/json',
                        //     'Authorization': `Bearer ${token}`, // Passing token for authorization
                        // },
                    });
                    
                    if (organizationResponse.ok) {
                        const organizationData = await organizationResponse.json();
                        setOrganizationName(organizationData.organization.name || 'Organization not found');
                    } else {
                        setOrganizationName('Organization not found');
                    }
                } else {
                    setOrganizationName('Error retrieving user profile');
                }
            } catch (error) {
                setOrganizationName('Rajasthan Technical University');
            }
        };

        fetchUserProfile();
    }, [token]);

    return (
        <header className="bg-gray-200 border-b border-gray-300 p-4 md:p-6 flex justify-between items-center">
            <div className="flex items-center text-2xl font-bold text-black">
                <a href="/dashboard" className="flex items-center">
                    <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-2" />
                    <i className="fa fa-university mr-0"></i>
                    {organizationName} {/* Displaying dynamic organization name here */}
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



  