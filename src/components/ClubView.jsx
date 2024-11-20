// src/components/ClubView.jsx
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/OrganisationContext';

const ClubView = ({ club, onBack }) => {
    const { token } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState([]);
    const [clubUsers, setClubUsers] = useState([]);
    const [isLoading, setIsLoading] = useState({
        allUsers: true,
        clubUsers: true,
        action: false
    });
    const [error, setError] = useState(null);
    const [selectedRole, setSelectedRole] = useState('Member');

    const roles = ['President', 'Vice_President', 'Secretary', 'Member'];

    const fetchAllUsers = async () => {
        setIsLoading(prev => ({ ...prev, allUsers: true }));
        try {
            const response = await fetch('api/user/organization/getAllUsers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch all users: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.responseType === 'failure') {
                throw new Error(data.message || 'Failed to fetch all users');
            }
            setAllUsers(data.data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching all users:', err);
        } finally {
            setIsLoading(prev => ({ ...prev, allUsers: false }));
        }
    };

    const fetchClubUsers = async () => {
        setIsLoading(prev => ({ ...prev, clubUsers: true }));
        try {
            const response = await fetch(`api/user/club/${club.id}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });  

            if (!response.ok) {
                throw new Error(`Failed to fetch club users: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.responseType === 'failure') {
                throw new Error(data.message || 'Failed to fetch club users');
            }
            setClubUsers(data.data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching club users:', err);
        } finally {
            setIsLoading(prev => ({ ...prev, clubUsers: false }));
        }
    };

    const handleAddUserToClub = async (userId) => {
        setIsLoading(prev => ({ ...prev, action: true }));
        setError(null); // Clear any previous errors
        
        try {
            // First check if user is already in the club
            const isAlreadyMember = clubUsers.some(user => user.id === userId);
            if (isAlreadyMember) {
                throw new Error('User is already a member of this club');
            }
    
            // Check if club is at capacity
            if (club.maxCapacity && clubUsers.length >= club.maxCapacity) {
                throw new Error('Club has reached maximum capacity');
            }
    
            const response = await fetch(`api/user/club/${club.id}/core-join/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    clubId: parseInt(club.id),
                    role: selectedRole
                })
            });
    
            const data = await response.json();
            
            if (!response.ok || data.responseType === 'failure') {
                // Handle specific error cases
                if (data.data?.error?.includes('Unique constraint failed')) {
                    throw new Error('User is already a member of this club');
                }
                throw new Error(data.message || 'Failed to add user to club');
            }
    
            // Success case
            await fetchClubUsers(); // Refresh the club users list
            
            // Optional: Show success message
            // You might want to add a success state to show a notification
            
        } catch (err) {
            setError(err.message);
            console.error('Error adding user to club:', err);
        } finally {
            setIsLoading(prev => ({ ...prev, action: false }));
        }
    };

    const handleRemoveUserFromClub = async (userId) => {
        setIsLoading(prev => ({ ...prev, action: true }));
        try {
            const response = await fetch(`api/club/${club.id}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (!response.ok || data.responseType === 'failure') {
                throw new Error(data.message || 'Failed to remove user from club');
            }

            setError(null);
            await fetchClubUsers(); // Refresh the club users list
        } catch (err) {
            setError(err.message);
            console.error('Error removing user from club:', err);
        } finally {
            setIsLoading(prev => ({ ...prev, action: false }));
        }
    };

    useEffect(() => {
        if (club?.id) {
            fetchAllUsers();
            fetchClubUsers();
        }
    }, [club.id]);

    const availableUsers = allUsers.filter(
        user => !clubUsers.some(clubUser => clubUser.id === user.id)
    );

    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-gray-100 overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={onBack}
                            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                            ← Back
                        </button>
                        <h1 className="text-2xl font-bold">Club: {club.name}</h1>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Available Users</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="w-full p-2 border rounded-md bg-white"
                                    disabled={isLoading.action}
                                >
                                    {roles.map(role => (
                                        <option key={role} value={role}>
                                            {role.replace('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {isLoading.allUsers ? (
                                <div className="text-center py-4">Loading available users...</div>
                            ) : availableUsers.length === 0 ? (
                                <div className="text-center py-4">No available users</div>
                            ) : (
                                <div className="space-y-2">
                                    {availableUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex justify-between items-center p-3 bg-gray-200 rounded-md"
                                        >
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                            <button 
                                                onClick={() => handleAddUserToClub(user.id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isLoading.action}
                                            >
                                                {isLoading.action ? 'Adding...' : '+ Add'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Club Members</h2>
                            {isLoading.clubUsers ? (
                                <div className="text-center py-4">Loading club members...</div>
                            ) : clubUsers.length === 0 ? (
                                <div className="text-center py-4">No members in this club</div>
                            ) : (
                                <div className="space-y-2">
                                    {clubUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex justify-between items-center p-3 bg-gray-200 rounded-md"
                                        >
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                                <p className="text-sm text-gray-500">{user.role || 'No role'}</p>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveUserFromClub(user.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isLoading.action}
                                            >
                                                {isLoading.action ? 'Removing...' : '- Remove'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Club Information</h2>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {club.name}</p>
                            <p><strong>Description:</strong> {club.description || 'No description available'}</p>
                            <p><strong>Total Members:</strong> {clubUsers.length}</p>
                            {club.maxCapacity && (
                                <p><strong>Maximum Capacity:</strong> {club.maxCapacity}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubView;


