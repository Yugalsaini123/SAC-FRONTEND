// src/components/ManageClubs.jsx
import React from 'react';
import AdminIcon from '../assets/AdminIcon.svg';
import ClubManageIcon from '../assets/ClubManageIcon.svg';
import EventIcon from '../assets/EventIcon.svg';
import HomeIcon from '../assets/HomeIcon.svg';
import Delebutton from '../assets/Deletebutton.svg';
import SideBar from './SideBar';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar/>
      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Clubs and Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Clubs Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-lg font-bold mb-4">Clubs</h1>
            <div className="space-y-4">
              {['Music Club', 'Drama Club', 'Sports Club'].map((club, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-300 p-4 rounded-lg">
                  <div>
                    <p>{club}</p>
                    <p className="text-sm text-gray-600">Faculty: Dr {club.split(' ')[0].toLowerCase()}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-600">
                    <img src={Delebutton} alt="Delete" className="w-4 h-auto mr-2" />
                  </button>
                </div>
              ))}
            </div>
            <button className="text-blue-500 hover:text-blue-600 mt-4">See all</button>
          </div>

          {/* Events Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-lg font-bold mb-4">Events (ongoing)</h1>
            <div className="space-y-4">
              {['Music Com.', 'Drama Com.', 'Sports Com.'].map((event, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-300 p-4 rounded-lg">
                  <div>
                    <p>{event}</p>
                    <p className="text-sm text-gray-600">Date: 20/01/2001</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-blue-500 hover:text-blue-600 mt-4">See all</button>
          </div>
        </div>

        {/* Student Coordinator Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-lg font-bold mb-4">Student Coordinator</h1>
          <div className="space-y-4">
            {[
              { name: 'Ram', club: 'Music Club' },
              { name: 'Yatin', club: 'Dance Club' },
              { name: 'Ramu', club: 'Sports Club' },
            ].map((coordinator, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-300 p-4 rounded-lg">
                <div>
                  <p>{coordinator.name}</p>
                  <p className="text-sm text-gray-600">{coordinator.club}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  Edit
                </button>
              </div>
            ))}
            <button className="text-blue-500 hover:text-blue-600 mt-4">See all</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
