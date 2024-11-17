// src/context/OrganisationContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Token state with cookie parsing
    const [token, setToken] = useState(() => {
        try {
            const cookieToken = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];
            return cookieToken || '';
        } catch (error) {
            console.error('Error parsing token from cookie:', error);
            return '';
        }
    });

    const [userProfile, setUserProfile] = useState(null);
    const [organizationId, setOrganizationId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsLoading(true);
            try {
                if (!token) {
                    setUserProfile(null);
                    setOrganizationId(null);
                    return;
                }

                const response = await fetch('api/user/getUserProfile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.data && data.data.profile) {
                        setUserProfile(data.data);
                        setOrganizationId(data.data.profile.organizationId);
                    } else {
                        console.error('Invalid user profile data structure');
                        setUserProfile(null);
                        setOrganizationId(null);
                    }
                } else {
                    console.error('Failed to fetch user profile:', response.status);
                    setUserProfile(null);
                    setOrganizationId(null);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setUserProfile(null);
                setOrganizationId(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [token]);

    const logout = () => {
        // Clear cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setToken('');
        setUserProfile(null);
        setOrganizationId(null);
    };

    return (
        <AuthContext.Provider 
            value={{ 
                token, 
                setToken, 
                userProfile, 
                setUserProfile, 
                organizationId,
                isLoading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
