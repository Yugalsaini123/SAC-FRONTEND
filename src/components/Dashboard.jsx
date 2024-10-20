import React from 'react';
import AdminIcon from '../assets/AdminIcon.svg';
import ClubManageIcon from '../assets/ClubManageIcon.svg';
import EventIcon from '../assets/EventIcon.svg';
import HomeIcon from '../assets/HomeIcon.svg';

const Dashboard = () => {
  return (
    <div className="flex h-full ">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4  h-screen">

        <ul className="space-y-4">
          <li className="flex items-center text-lg p-2 bg-gray-300 rounded-lg shadow hover:bg-white transition duration-300">
          <a href="/dashboard" className="flex items-center">
            <img src={HomeIcon} alt="Home" className="w-6 h-auto mr-2" />
            Dashboard
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
          <a href="/dashboard" className="flex items-center">
            <img src={AdminIcon} alt="manage admins" className="w-6 h-auto mr-2" />
            Manage Admins
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
          <a href="/manageclub" className="flex items-center">
            <img src={ClubManageIcon} alt="manage clubs" className="w-6 h-auto mr-2" />
            Manage Clubs
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
          <a href="/viewevents" className="flex items-center">
            <img src={EventIcon} alt="view events" className="w-6 h-auto mr-2" />
            View Events
            </a>
          </li>
        </ul>
      </div>

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