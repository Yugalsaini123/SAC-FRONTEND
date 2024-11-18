// src/components/ManageOrganisation.jsx
import React, { useState, useEffect, useContext } from 'react';
import SideBar from './SideBar';
import DepartmentCard from './DepartmentCard';
import DepartmentView from './DepartmentView';
import AuthContext from '../context/OrganisationContext';

const ManageOrganisation = () => {
    const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [organizationId, setOrganizationId] = useState(null);
    const { token } = useContext(AuthContext);
    
    const fetchUserProfile = async () => {
        try {
            const response = await fetch('/api/user/getUserProfile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();
            setOrganizationId(data.data.profile.organizationId);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching user profile:', err);
        }
    };

    const fetchDepartments = async () => {
        if (!organizationId) return; // Don't fetch departments until we have organizationId
        
        setIsLoading(true);
        try {
            const response = await fetch('api/department/getAllDepartments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch departments');
            }

            const data = await response.json();
            
            // Filter departments based on the user's organizationId
            const filteredDepartments = data.data.filter(
                dept => dept.organizationId === organizationId
            );
            
            setDepartments(filteredDepartments);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching departments:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [token]); // Fetch user profile when component mounts

    useEffect(() => {
        if (organizationId) {
            fetchDepartments();
        }
    }, [token, organizationId]); // Fetch departments when we have the organizationId

    const handleSaveDepartment = () => {
        fetchDepartments();
        setIsModalOpen(false);
    };

    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    const handleBackToDepartments = () => {
        setSelectedDepartment(null);
    };

    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
                {!selectedDepartment ? (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Departments</h2>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-lg font-semibold px-6 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 "
                            >
                                Add Department
                            </button>
                        </div>
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            {isLoading ? (
                                <div className="text-center py-4">Loading departments...</div>
                            ) : departments.length === 0 ? (
                                <div className="text-center py-4">No departments found for your organization</div>
                            ) : (
                                <div className="space-y-4">
                                    {departments.map((department) => (
                                        <div
                                            key={department.id}
                                            className="flex justify-between items-center p-4 bg-gray-300 rounded-lg shadow-md"
                                        >
                                            <div>
                                                <p className="text-lg font-semibold">{department.name}</p>
                                                {department.description && (
                                                    <p className="text-sm text-gray-600">{department.description}</p>
                                                )}
                                                <p className="text-sm text-gray-500">Type: {department.type}</p>
                                            </div>
                                            <button 
                                                onClick={() => handleDepartmentClick(department)}
                                                className="bg-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-200 transition"
                                            >
                                                View
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <DepartmentView 
                        department={selectedDepartment}
                        onBack={handleBackToDepartments}
                    />
                )}
            </div>

            {isModalOpen && (
                <DepartmentCard
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveDepartment}
                />
            )}
        </div>
    );
};

export default ManageOrganisation;