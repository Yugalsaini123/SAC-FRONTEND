// src/components/Dashboard.jsx
import React from 'react';
import AdminIcon from '../assets/AdminIcon.svg';
import ClubManageIcon from '../assets/ClubManageIcon.svg';
import EventIcon from '../assets/EventIcon.svg';
import HomeIcon from '../assets/HomeIcon.svg';
import SideBar from './SideBar';

const Dashboard = () => {
  return (
    <div className="flex h-full ">
      {/* Sidebar */}
      <SideBar/>
      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Overview cards */}
        <section>
          <h2 className="text-left text-2xl font-bold mb-4 ">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-300 p-6 rounded-lg shadow">
              <p>Total Clubs</p>
              <h2 className="text-2xl font-bold">21</h2>
            </div>
            <div className="bg-gray-300 p-6 rounded-lg shadow">
              <p>Total Admins</p>
              <h2 className="text-2xl font-bold">8</h2>
            </div>
            <div className="bg-gray-300 p-6 rounded-lg shadow">
              <p>Upcoming Events</p>
              <h2 className="text-2xl font-bold">5</h2>
            </div>
          </div>
        </section>

        {/* Societies Section */}
        <section>
          <h2 className="text-left text-2xl font-bold mb-4">Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-6">
            <div className="bg-gray-300 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Cultural Society</h3>
              <p>Faculty: Dr. K.B Sharma</p>
              <p>Core Team: Bhuvan, Kailash, Krish</p>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Technical Society</h3>
              <p>Faculty: Dr. K.B Sharma</p>
              <p>Core Team: Bhuvan, Kailash, Krish</p>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Social Society</h3>
              <p>Faculty: Dr. K.B Sharma</p>
              <p>Core Team: Bhuvan, Kailash, Krish</p>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Sports Society</h3>
              <p>Faculty: Dr. K.B Sharma</p>
              <p>Core Team: Bhuvan, Kailash, Krish</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;