import React from 'react';
import HomeIcon from '../assets/HomeIcon.svg';
import AboutIcon from '../assets/AboutIcon.svg';
import ContactIcon from '../assets/ContactIcon.svg';
import FaqIcon from '../assets/FaqIcon.svg';
import ProfilePicture from '../assets/ProfilePicture.svg';
import LogoutIcon from '../assets/LogoutIcon.svg' ;

const EditProfile = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <ul className="space-y-4">
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <img src={HomeIcon} alt="Home" className="w-6 h-auto mr-2" />
            Home
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <img src={AboutIcon} alt="About Us" className="w-6 h-auto mr-2" />
            About Us
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <img src={ContactIcon} alt="Contact Us" className="w-6 h-auto mr-2" />
            Contact Us
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <img src={FaqIcon} alt="FAQ" className="w-6 h-auto mr-2" />
            FAQ
          </li>
          <li className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300">
            <img src={LogoutIcon} alt="logout" className="w-6 h-auto mr-2" />
            Log Out
          </li>
        </ul>
        {/* <div className="mt-auto">
          <button className="flex items-center text-lg p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300 w-full">
          <img src={LogoutIcon} alt="logout" className="w-6 h-auto mr-2" />
            Log Out
          </button>
        </div> */}
      </div>

      {/* Main content */}
      <main className="flex-1 p-4">
        <section>
          <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={ProfilePicture} // Use actual profile picture or placeholder.
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <button className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-blue-500 text-sm">
                Edit Picture
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium">Full Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Email:</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Contact Details:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Designation:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </form>
            </div>

            {/* Organisation Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Organisation Details</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium">Organisation Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Address:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Pin Code:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <button className="bg-gray-300 text-lg font-semibold p-3 rounded-md shadow hover:bg-gray-400 transition duration-300">
              Save Changes
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditProfile;
