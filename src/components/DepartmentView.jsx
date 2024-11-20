// src/components/DepartmentView.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/OrganisationContext';
import SocietyCard from './SocietyCard';
import SideBar from './SideBar';
import SocietyView from './SocietyView';
import ProfilePicture from '../assets/ProfilePicture.svg';

const DepartmentView = ({ department, onBack }) => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('Societies');
    const [societies, setSocieties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState({
        societies: true,
        departmentUsers: true,
        allUsers: true
    });
    const [error, setError] = useState(null);
    const [selectedSociety, setSelectedSociety] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [departmentUsers, setDepartmentUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('Member');

    const roles = ['Head', 'Deputy_Head', 'Coordinator', 'Member'];

    const fetchSocieties = async () => {
        setIsLoading(prev => ({ ...prev, societies: true }));
        try {
            const response = await fetch('api/society/getAllSocieties', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch societies');

            const data = await response.json();
            const filteredSocieties = data.data.filter(
                society => 
                    society.organizationId === department.organizationId &&
                    society.departmentId === department.id
            );
            
            setSocieties(filteredSocieties || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(prev => ({ ...prev, societies: false }));
        }
    };

    const fetchAllUsers = async () => {
        setIsLoading(prev => ({ ...prev, allUsers: true }));
        try {
            const response = await fetch('api/user/organization/getAllUsers', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch users');

            const data = await response.json();
            setAllUsers(data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(prev => ({ ...prev, allUsers: false }));
        }
    };

    const fetchDepartmentUsers = async () => {
        setIsLoading(prev => ({ ...prev, departmentUsers: true }));
        try {
            const response = await fetch(`api/department/getAllUsers/${department.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch department users');

            const data = await response.json();
            setDepartmentUsers(data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(prev => ({ ...prev, departmentUsers: false }));
        }
    };

    const handleAddUserToDepartment = async (userId) => {
        try {
            const response = await fetch('api/department/add-user', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    departmentId: department.id,
                    role: selectedRole
                })
            });

            if (!response.ok) throw new Error('Failed to add user');
            fetchDepartmentUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRemoveUserFromDepartment = async (userId) => {
        try {
            const response = await fetch(`api/department/remove-user`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    departmentId: department.id
                })
            });

            if (!response.ok) throw new Error('Failed to remove user');
            fetchDepartmentUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchSocieties();
        fetchAllUsers();
        fetchDepartmentUsers();
    }, [department.id]);

    const availableUsers = allUsers.filter(
        user => !departmentUsers.some(depUser => depUser.id === user.id)
    );

    const handleAddSociety = () => setIsModalOpen(true);
    const handleSaveSociety = () => fetchSocieties();
    const handleSocietyView = (society) => setSelectedSociety(society);
    const handleBackToSocieties = () => setSelectedSociety(null);

    if (selectedSociety) {
        return (
            <SocietyView 
                society={selectedSociety} 
                department={department}
                onBack={handleBackToSocieties} 
            />
        );
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
                        <h1 className="text-2xl font-bold">Department: {department.name}</h1>
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
                            <button
                                className={`px-6 py-2 rounded-md transition-colors ${
                                    activeTab === 'Details'
                                        ? 'bg-gray-300 text-black'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab('Details')}
                            >
                                Department Details
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
                            {isLoading.societies ? (
                                <div className="text-center py-4">Loading societies...</div>
                            ) : societies.length === 0 ? (
                                <div className="text-center py-4">No societies found in this department</div>
                            ) : (
                                societies.map((society) => (
                                    <div
                                        key={society.id}
                                        className="flex justify-between items-center p-4 bg-gray-300 rounded-lg shadow-md"
                                    >
                                        <div> 
                                            <span className="text-lg font-semibold">
                                                {society.name}
                                            </span> 
                                            {society.description && ( 
                                                <p className="text-sm text-gray-600">{society.description}</p> 
                                            )} 
                                        </div>
                                        <button 
                                            onClick={() => handleSocietyView(society)}
                                            className="px-6 py-1.5 bg-white rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            View
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'User' && (
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
                                                    onClick={() => handleAddUserToDepartment(user.id)}
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
                                <h2 className="text-xl font-semibold mb-4">Department Members</h2>
                                {isLoading.departmentUsers ? (
                                    <div className="text-center py-4">Loading department members...</div>
                                ) : departmentUsers.length === 0 ? (
                                    <div className="text-center py-4">No members in this department</div>
                                ) : (
                                    <div className="space-y-2">
                                        {departmentUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex justify-between items-center p-3 bg-gray-200 rounded-md"
                                            >
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-gray-600">{user.email}</p>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveUserFromDepartment(user.id)}
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

                    {activeTab === 'Details' && (
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Department Information</h2>
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {department.name}</p>
                                <p><strong>Description:</strong> {department.description || 'No description available'}</p>
                                <p><strong>Total Societies:</strong> {societies.length}</p>
                                <p><strong>Total Department Members:</strong> {departmentUsers.length}</p>
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