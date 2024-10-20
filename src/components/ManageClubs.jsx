import React from 'react';
import AdminIcon from '../assets/AdminIcon.svg';
import ClubManageIcon from '../assets/ClubManageIcon.svg';
import EventIcon from '../assets/EventIcon.svg';
import HomeIcon from '../assets/HomeIcon.svg';
import Delebutton from '../assets/Deletebutton.svg';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4 h-full">
        <ul className="space-y-4">
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="/dashboard" className="flex items-center">
              <img src={HomeIcon} alt="Dashboard" className="w-6 h-auto mr-2" />
              Dashboard
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="/dashboard" className="flex items-center">
              <img src={AdminIcon} alt="Manage Admins" className="w-6 h-auto mr-2" />
              Manage Admins
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-gray-300 rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="/manageclub" className="flex items-center">
              <img src={ClubManageIcon} alt="Manage Clubs" className="w-6 h-auto mr-2" />
              Manage Clubs
            </a>
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <a href="/viewevents" className="flex items-center">
              <img src={EventIcon} alt="View Events" className="w-6 h-auto mr-2" />
              View Events
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Clubs and Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Clubs Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Clubs</h3>
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
            <h3 className="text-lg font-bold mb-4">Events (ongoing)</h3>
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
          <h3 className="text-lg font-bold mb-4">Student Coordinator</h3>
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
