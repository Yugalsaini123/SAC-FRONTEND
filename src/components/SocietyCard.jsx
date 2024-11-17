// src/components/SocietyCard.jsx
import React, { useState, useContext } from 'react';
import AuthContext from '../context/OrganisationContext';

const SocietyCard = ({ onClose, onSave, departmentId, organizationId }) => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        organizationId: organizationId,
        departmentId: departmentId
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!formData.name) {
            alert('Please fill in the Society Name.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('api/society/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                onSave(data);
                onClose();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to create society'}`);
            }
        } catch (error) {
            alert('Network error: Failed to create society.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add New Society</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Society Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Description (optional)"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Type</option>
                        <option value="Technical">Technical</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="flex justify-end mt-4 space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className={`px-4 py-2 ${
                            isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white rounded`}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocietyCard;