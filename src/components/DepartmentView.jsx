// src/components/DepartmentView.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/OrganisationContext';
import SocietyCard from './SocietyCard';
import SideBar from './SideBar';
import ProfilePicture from '../assets/ProfilePicture.svg';

const DepartmentView = ({ department }) => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('Societies');
    const [societies, setSocieties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [profiles] = useState([
        {
            id: 1,
            name: 'Shanaya',
            role: 'SAC Head',
            designation: 'Prof.'
        },
        {
            id: 2,
            name: 'Shanaya',
            role: 'SAC Student Head'
        }
    ]);

    const fetchSocieties = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('api/society/getAllSocieties', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch societies');
            }

            const data = await response.json();
            
            // Filter societies based on both organizationId and departmentId
            const filteredSocieties = data.data.filter(
                society => 
                    society.organizationId === department.organizationId &&
                    society.departmentId === department.id
            );
            
            setSocieties(filteredSocieties || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching societies:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSocieties();
    }, [department.id, department.organizationId]);

    const handleAddSociety = () => {
        setIsModalOpen(true);
    };

    const handleSaveSociety = () => {
        fetchSocieties();
    };

    if (error) {
        return (
            <div className="flex h-screen">
                <SideBar />
                <div className="flex-1 bg-gray-100">
                    <div className="text-red-500 p-4">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-gray-100 overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        {/* <button
                            onClick={() => navigate('/manageorg')}
                            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                            ← Back
                        </button> */}
                        <h1 className="text-2xl font-bold">Department View</h1>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                className={`px-6 py-2 rounded-md transition-colors ${
                                    activeTab === 'Societies'
                                        ? 'bg-gray-300 text-black'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab('Societies')}
                            >
                                Societies
                            </button>
                            <button
                                className={`px-6 py-2 rounded-md transition-colors ${
                                    activeTab === 'User'
                                        ? 'bg-gray-300 text-black'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab('User')}
                            >
                                User
                            </button>
                            <div className="flex-grow"></div>
                            {activeTab === 'Societies' && (
                                <button 
                                    onClick={handleAddSociety}
                                    className="px-6 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Add society
                                </button>
                            )}
                        </div>
                    </div>

                    {activeTab === 'Societies' && (
                        <div className="space-y-3 mb-8">
                            {isLoading ? (
                                <div className="text-center py-4">Loading societies...</div>
                            ) : societies.length === 0 ? (
                                <div className="text-center py-4">No societies found in this department</div>
                            ) : (
                                societies.map((society) => (
                                    <div
                                        key={society.id}
                                        className="flex justify-between items-center bg-gray-200 bg-opacity-50 p-4 rounded-lg"
                                    >
                                        <span className="text-lg">{society.name}</span>
                                        <button className="px-6 py-1.5 bg-white rounded-md hover:bg-gray-50 transition-colors">
                                            View
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'User' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl">Profile</h2>
                                <button className="px-6 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors">
                                    Edit
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {profiles.map((profile) => (
                                    <div
                                        key={profile.id}
                                        className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-sm"
                                    >
                                        <img
                                            src={ProfilePicture}
                                            alt={profile.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="space-y-1">
                                            <p>Name: {profile.name}</p>
                                            <p>Role: {profile.role}</p>
                                            {profile.designation && (
                                                <p>Designation: {profile.designation}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <SocietyCard
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveSociety}
                    departmentId={department.id}
                    organizationId={department.organizationId}
                />
            )}
        </div>
    );
};

export default DepartmentView;