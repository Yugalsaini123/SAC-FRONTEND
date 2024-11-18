// src/components/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import SideBar from './SideBar';
import AuthContext from '../context/OrganisationContext';

const Dashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
    if (!organizationId) return;
    
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
  }, [token]);

  useEffect(() => {
    if (organizationId) {
      fetchDepartments();
    }
  }, [token, organizationId]);

  return (
    <div className="flex h-full">
      <SideBar />
      <main className="flex-1 p-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <section>
          <h2 className="text-left text-2xl font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-300 p-6 rounded-lg shadow">
              <p>Total Departments</p>
              <h2 className="text-2xl font-bold">{departments.length}</h2>
            </div>
            <div className="bg-gray-300 p-6 rounded-lg shadow">
              <p>Total Admins</p>
              <h2 className="text-2xl font-bold">0</h2>
            </div>
            <div className="bg-gray-300 p-6 rounded-lg shadow">
              <p>Upcoming Events</p>
              <h2 className="text-2xl font-bold">0</h2>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-left text-2xl font-bold mb-4">Departments</h2>
          {isLoading ? (
            <div className="text-center py-4">Loading departments...</div>
          ) : departments.length === 0 ? (
            <div className="text-center py-4">No departments found for your organization</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {departments.map((department) => (
                <div key={department.id} className="bg-gray-300 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-semibold">{department.name}</h3>
                  <p>type: {department.type}</p>
                  {department.description && (
                    <p>{department.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;