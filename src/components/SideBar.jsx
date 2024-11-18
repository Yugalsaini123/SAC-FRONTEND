// src/components/SideBar.jsx
import React from 'react';
import HomeIcon from '../assets/HomeIcon.svg';
import AdminIcon from '../assets/AdminIcon.svg';
import ClubManageIcon from '../assets/ClubManageIcon.svg';
import EventIcon from '../assets/EventIcon.svg';
import Manageorg from '../assets/Manageorg.svg';
import manageroleicon from '../assets/manageroleicon.png';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-200 p-4 h-screen overflow-y-auto">
      <ul className="space-y-4">
        <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
          <a href="/dashboard" className="flex items-center">
            <img src={HomeIcon} alt="Dashboard" className="w-6 h-auto mr-2" />
            Dashboard
          </a>
        </li>
        <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
          <a href="/manageadmins" className="flex items-center">
            <img src={AdminIcon} alt="Manage Admins" className="w-6 h-auto mr-2" />
            Manage Admins
          </a>
        </li>
        <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
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
        <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
          <a href="/manageorg" className="flex items-center">
            <img src={Manageorg} alt="Manage Organisations" className="w-6 h-auto mr-2" />
            Manage Organisation
          </a>
        </li>
        <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
          <a href="/managerole" className="flex items-center">
            <img src={manageroleicon} alt="Manage Organisations" className="w-6 h-auto mr-2" />
            Manage Roles
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;