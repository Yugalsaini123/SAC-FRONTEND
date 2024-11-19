// src/components/SocietyView.jsx
// src/components/SocietyView.jsx
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/OrganisationContext';
import ClubCard from './ClubCard';
import ClubView from './ClubView';

const SocietyView = ({ society, department, onBack }) => {
    const { token } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState([]);
    const [societyUsers, setSocietyUsers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [isLoading, setIsLoading] = useState({
        allUsers: true,
        societyUsers: true,
        clubs: true
    });
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Users');
    const [selectedRole, setSelectedRole] = useState('Member');
    const [isClubModalOpen, setIsClubModalOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);

    const roles = ['President', 'Vice_President', 'Secretary', 'Member'];

    // Fetch all clubs for this society
    const fetchClubs = async () => {
        setIsLoading(prev => ({ ...prev, clubs: true }));
        try {
            const response = await fetch(`api/club/getAllClubs`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch clubs');
            }

            const data = await response.json();
            // Filter clubs for this society
            const societyClubs = data.data.filter(club => club.societyId === society.id);
            setClubs(societyClubs || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching clubs:', err);
        } finally {
            setIsLoading(prev => ({ ...prev, clubs: false }));
        }
    };

    // Fetch all users
    const fetchAllUsers = async () => {
        setIsLoading(prev => ({ ...prev, allUsers: true }));
        try {
            const response = await fetch('api/user/organization/getAllUsers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch all users');
            }

            const data = await response.json();
            setAllUsers(data.data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching all users:', err);
        } finally {
            setIsLoading(prev => ({ ...prev, allUsers: false }));
        }
    };

    // Fetch society users
    const fetchSocietyUsers = async () => {
        setIsLoading(prev => ({ ...prev, societyUsers: true }));
        try {
            const response = await fetch(`api/user/society/${society.id}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch society users');
            }

            const data = await response.json();
            setSocietyUsers(data.data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching society users:', err);
        } finally {
            setIsLoading(prev => ({ ...prev, societyUsers: false }));
        }
    };

    // Handle adding a new club
    const handleAddClub = () => {
        setIsClubModalOpen(true);
    };

    // Handle saving a new club
    const handleSaveClub = async () => {
        await fetchClubs();
        setIsClubModalOpen(false);
    };

    // Add user to society
    const handleAddUserToSociety = async (userId) => {
        try {
            const response = await fetch('api/user/society/addUser', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    societyId: society.id,
                    role: selectedRole
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add user to society');
            }

            // Refresh society users after successful addition
            fetchSocietyUsers();
        } catch (err) {
            setError(err.message);
            console.error('Error adding user to society:', err);
        }
    };

    // Remove user from society
    const handleRemoveUserFromSociety = async (userId) => {
        try {
            const response = await fetch(`api/user/society/${society.id}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove user from society');
            }

            // Refresh society users after successful removal
            fetchSocietyUsers();
        } catch (err) {
            setError(err.message);
            console.error('Error removing user from society:', err);
        }
    };

    useEffect(() => {
        fetchAllUsers();
        fetchSocietyUsers();
        fetchClubs();
    }, [society.id]);

    // Filter out users already in the society
    const availableUsers = allUsers.filter(
        user => !societyUsers.some(societyUser => societyUser.id === user.id)
    );

    // If a club is selected, show the ClubView instead
    if (selectedClub) {
        return <ClubView club={selectedClub} onBack={() => setSelectedClub(null)} />;
    }

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
                        <h1 className="text-2xl font-bold">Society: {society.name}</h1>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                className={`px-6 py-2 rounded-md transition-colors ${
                                    activeTab === 'Users'
                                        ? 'bg-gray-300 text-black'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab('Users')}
                            >
                                Users
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-colors ${
                                    activeTab === 'Clubs'
                                        ? 'bg-gray-300 text-black'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab('Clubs')}
                            >
                                Clubs
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-colors ${
                                    activeTab === 'Details'
                                        ? 'bg-gray-300 text-black'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab('Details')}
                            >
                                Society Details
                            </button>
                            <div className="flex-grow"></div>
                            {activeTab === 'Clubs' && (
                                <button 
                                    onClick={handleAddClub}
                                    className="px-6 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Add Club
                                </button>
                            )}
                        </div>
                    </div>

                    {activeTab === 'Users' && (
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
                                                    onClick={() => handleAddUserToSociety(user.id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                                                >
                                                    + Add
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">Society Members</h2>
                                {isLoading.societyUsers ? (
                                    <div className="text-center py-4">Loading society members...</div>
                                ) : societyUsers.length === 0 ? (
                                    <div className="text-center py-4">No members in this society</div>
                                ) : (
                                    <div className="space-y-2">
                                        {societyUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex justify-between items-center p-3 bg-gray-200 rounded-md"
                                            >
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-gray-600">{user.email}</p>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveUserFromSociety(user.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                                                >
                                                    - Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Clubs' && (
                        <div className="space-y-3 mb-8">
                            {isLoading.clubs ? (
                                <div className="text-center py-4">Loading clubs...</div>
                            ) : clubs.length === 0 ? (
                                <div className="text-center py-4">No clubs found in this society</div>
                            ) : (
                                clubs.map((club) => (
                                    <div
                                        key={club.id}
                                        className="flex justify-between items-center p-4 bg-gray-300 rounded-lg shadow-md"
                                    >
                                        <div>
                                            <span className="text-lg font-semibold">
                                                {club.name}
                                            </span>
                                            {club.description && (
                                                <p className="text-sm text-gray-600">
                                                    {club.description}
                                                </p>
                                            )}
                                        </div>
                                        {club.logo && (
                                            <img 
                                                src={club.logo} 
                                                alt={`${club.name} logo`}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        )}
                                        <button
                                            onClick={() => setSelectedClub(club)}
                                            className="px-6 py-1.5 bg-white rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            View
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'Details' && (
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Society Information</h2>
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {society.name}</p>
                                <p><strong>Description:</strong> {society.description || 'No description available'}</p>
                                <p><strong>Department:</strong> {department.name}</p>
                                <p><strong>Total Members:</strong> {societyUsers.length}</p>
                                <p><strong>Total Clubs:</strong> {clubs.length}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isClubModalOpen && (
                <ClubCard
                    onClose={() => setIsClubModalOpen(false)}
                    onSave={handleSaveClub}
                    societyId={society.id}
                />
            )}
        </div>
    );
};

export default SocietyView;