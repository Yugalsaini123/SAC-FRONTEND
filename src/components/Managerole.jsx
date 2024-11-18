// src/components/ManageRole.jsx
import React, { useState, useEffect, useContext } from 'react';
import SideBar from './SideBar';
import AuthContext from '../context/OrganisationContext';

const PermissionLevels = [
    'None', 'Read', 'Create', 'Update', 'Delete',
    'ReadWrite', 'CreateRead', 'CreateUpdate',
    'CreateDelete', 'Admin'
];

const ManageRole = () => {
    const [roles, setRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [roleForm, setRoleForm] = useState({
        name: '',
        description: '',
        permissions: {
            eventManagement: 'None',
            eventApproval: 'None',
            eventAttendance: 'None',
            userManagement: 'None',
            roleManagement: 'None',
            departmentManagement: 'None',
            societyManagement: 'None',
            clubManagement: 'None',
            clubMemberManagement: 'None',
            resourceManagement: 'None',
            notificationManagement: 'None',
            feedbackManagement: 'None',
            reportingAccess: 'None',
            systemConfiguration: 'None'
        }
    });
    const { token } = useContext(AuthContext);

    const fetchRoles = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/role/getAllRoles', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch roles');
            }

            const data = await response.json();
            // Ensure roles is properly extracted
            const rolesData = data?.data?.roles || [];
            setRoles(rolesData);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching roles:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, [token]);

    const handleCreateRole = async () => {
        try {
            const response = await fetch('/api/role/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roleForm)
            });

            if (!response.ok) {
                throw new Error('Failed to create role');
            }

            fetchRoles();
            setIsModalOpen(false);
            resetRoleForm();
        } catch (err) {
            setError(err.message);
            console.error('Error creating role:', err);
        }
    };

    const handleUpdateRole = async () => {
        if (!selectedRole) return;

        try {
            const response = await fetch(`/api/role/${selectedRole.id}/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roleForm)
            });

            if (!response.ok) {
                throw new Error('Failed to update role');
            }

            fetchRoles();
            setSelectedRole(null);
            resetRoleForm();
            setIsModalOpen(false);
        } catch (err) {
            setError(err.message);
            console.error('Error updating role:', err);
        }
    };

    const handleDeleteRole = async (roleId) => {
        try {
            const response = await fetch(`/api/role/${roleId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete role');
            }

            fetchRoles();
        } catch (err) {
            setError(err.message);
            console.error('Error deleting role:', err);
        }
    };

    const resetRoleForm = () => {
        setRoleForm({
            name: '',
            description: '',
            permissions: {
                eventManagement: 'None',
                eventApproval: 'None',
                eventAttendance: 'None',
                userManagement: 'None',
                roleManagement: 'None',
                departmentManagement: 'None',
                societyManagement: 'None',
                clubManagement: 'None',
                clubMemberManagement: 'None',
                resourceManagement: 'None',
                notificationManagement: 'None',
                feedbackManagement: 'None',
                reportingAccess: 'None',
                systemConfiguration: 'None'
            }
        });
    };

    const handlePermissionChange = (section, value) => {
        setRoleForm(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [section]: value
            }
        }));
    };

    const openEditModal = (role) => {
        setSelectedRole(role);
        setRoleForm({
            name: role.roleName,
            description: role.roleDescription,
            permissions: role.rolePermissions || {}
        });
        setIsModalOpen(true);
    };

    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Roles Management</h2>
                    <button
                        onClick={() => {
                            resetRoleForm();
                            setSelectedRole(null);
                            setIsModalOpen(true);
                        }}
                        className="text-lg font-semibold px-6 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400"
                    >
                        Add Role
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {isLoading ? (
                        <div className="text-center py-4">Loading roles...</div>
                    ) : roles.length === 0 ? (
                        <div className="text-center py-4">No roles found</div>
                    ) : (
                        <div className="space-y-4">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    className="flex justify-between items-center p-4 bg-gray-300 rounded-lg shadow-md"
                                >
                                    <div>
                                        <p className="text-lg font-semibold">{role.roleName}</p>
                                        <p className="text-sm text-gray-600">{role.roleDescription}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => openEditModal(role)}
                                            className="bg-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-200 transition"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteRole(role.id)}
                                            className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">
                            {selectedRole ? 'Edit Role' : 'Create Role'}
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Role Name"
                                value={roleForm.name}
                                onChange={(e) => setRoleForm(prev => ({
                                    ...prev, 
                                    name: e.target.value
                                }))}
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                placeholder="Role Description"
                                value={roleForm.description}
                                onChange={(e) => setRoleForm(prev => ({
                                    ...prev, 
                                    description: e.target.value
                                }))}
                                className="w-full p-2 border rounded h-24"
                            />
                            <h3 className="text-lg font-semibold">Permissions</h3>
                            {Object.keys(roleForm.permissions).map((section) => (
                                <div key={section} className="flex justify-between items-center">
                                    <span className="capitalize">
                                        {section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </span>
                                    <select
                                        value={roleForm.permissions[section]}
                                        onChange={(e) => handlePermissionChange(section, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        {PermissionLevels.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={selectedRole ? handleUpdateRole : handleCreateRole}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {selectedRole ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageRole;
