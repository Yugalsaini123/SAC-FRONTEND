// src/components/ViewEvents.jsx
import React, { useState } from 'react';
import AdminIcon from '../assets/AdminIcon.svg';
import ClubManageIcon from '../assets/ClubManageIcon.svg';
import EventIcon from '../assets/EventIcon.svg';
import HomeIcon from '../assets/HomeIcon.svg';
import ScienceImage from '../assets/ScienceImage.svg';
import CulturalImage from '../assets/CulturalImage.svg';
import SportsImage from '../assets/SportsImage.svg';
import SideBar from './SideBar';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('allEvents');

  const events = [
    {
      category: 'Ongoing Events',
      data: [
        { title: 'Science Expo', image: ScienceImage },
        { title: 'Cultural Event', image: CulturalImage },
        { title: 'Sports Event', image: SportsImage }
      ]
    },
    {
      category: 'Upcoming Events',
      data: [
        { title: 'Science Expo', image: ScienceImage },
        { title: 'Cultural Event', image: CulturalImage },
        { title: 'Sports Event', image: SportsImage }
      ]
    },
    {
      category: 'Past Events',
      data: [
        { title: 'Science Expo', image: ScienceImage },
        { title: 'Cultural Event', image: CulturalImage },
        { title: 'Sports Event', image: SportsImage }
      ]
    }
  ];

  const pendingEvents = [
    { title: 'Football Event', club: 'Sports Club' },
    { title: 'Basketball Event', club: 'Sports Club' },
    { title: 'Tennis Event', club: 'Sports Club' }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar/>
      {/* <SideBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`text-lg font-semibold px-6 py-2 rounded-full ${activeTab === 'allEvents' ? 'bg-gray-300 text-gray-700' : 'text-gray-600'}`}
            onClick={() => setActiveTab('allEvents')}
          >
            All Events
          </button>
          <button
            className={`text-lg font-semibold px-6 py-2 rounded-full ${activeTab === 'pendingPermission' ? 'bg-gray-300 text-gray-700' : 'text-gray-600'}`}
            onClick={() => setActiveTab('pendingPermission')}
          >
            Pending Permission
          </button>
        </div>

        {/* Event Categories for All Events */}
        {activeTab === 'allEvents' && (
          <>
            {events.map((category, idx) => (
              <div key={idx} className="mb-12">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                  <button className="text-blue-500">View all</button>
                </div>
                <div className="grid grid-cols-3 gap-8 w-full">
                  {category.data.map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded-md mb-4" />
                      <p className="text-lg font-semibold text-center">{event.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Pending Permission */}
        {activeTab === 'pendingPermission' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {pendingEvents.map((event, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 mb-4 bg-gray-300 rounded-lg shadow-md">
                <div>
                  <p className="text-lg font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.club}</p>
                </div>
                <button className="bg-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
                  View Event
                </button>
              </div>
            ))}
            <button className="text-black mt-4 block mx-auto font-semibold hover:underline">
              See all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
