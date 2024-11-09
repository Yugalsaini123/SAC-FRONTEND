import React from 'react';
import AdminIcon from '../assets/AdminIcon.svg';
import ClubManageIcon from '../assets/ClubManageIcon.svg';
import EventIcon from '../assets/EventIcon.svg';
import HomeIcon from '../assets/HomeIcon.svg';
import AvatarImage from '../assets/ProfilePicture.svg'; // Placeholder for admin avatar
import PerformanceMatrixImage from '../assets/PerformanceMatrixImage.svg'; // Placeholder for performance matrix
import TaskOverviewImage from '../assets/TaskOverviewImage.svg'; // Placeholder for task overview
import Sidebar from './SideBar';

const ManageAdmins = () => {
  const admins = [
    { id: '001', name: 'Shanti', email: 'shanti@gmail.com', avatar: AvatarImage },
    { id: '001', name: 'Shanti', email: 'shanti@gmail.com', avatar: AvatarImage },
    { id: '001', name: 'Shanti', email: 'shanti@gmail.com', avatar: AvatarImage },
    { id: '001', name: 'Shanti', email: 'shanti@gmail.com', avatar: AvatarImage },
    { id: '001', name: 'Shanti', email: 'shanti@gmail.com', avatar: AvatarImage }
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Manage Admins</h1>
          {/* <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Add Admins</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Add Club</button>
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Admin List Table */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Avatar</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-4">{admin.id}</td>
                    <td className="p-4">
                      <img src={admin.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="p-4">{admin.name}</td>
                    <td className="p-4">{admin.email}</td>
                    <td className="p-4">
                      <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-300 transition">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="text-black mt-4 block mx-auto font-semibold hover:underline">
              See all
            </button>
          </div>

          {/* Admin Profile Section */}
          <div className="col-span-1 bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6">Admin Profile</h2>
            <div className="flex space-x-4 mb-6">
              <img
                src={AvatarImage}
                alt="Admin Avatar"
                className="w-24 h-24 rounded-full shadow-lg"
              />
              <div>
                <p className="font-semibold">Name: Shanti</p>
                <p className="text-gray-600">Role: Club Coordinator</p>
                <p className="text-gray-600">Designation: Prof.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <img src={TaskOverviewImage} alt="Task Overview" className="w-full h-auto mb-4" />
                <p className="text-sm font-semibold">Task Overview</p>
                <p className="text-sm text-gray-600">Assigned tasks: 30</p>
                <p className="text-sm text-gray-600">Completed: 25</p>
                <p className="text-sm text-gray-600">Pending: 5</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <img
                  src={PerformanceMatrixImage}
                  alt="Performance Matrix"
                  className="w-full h-auto mb-4"
                />
                <p className="text-sm font-semibold">Performance Matrix</p>
                <p className="text-sm text-gray-600">Average rating: 4.5</p>
                <p className="text-sm text-gray-600">Task efficiency: 80%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmins;
