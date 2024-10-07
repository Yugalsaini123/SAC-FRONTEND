import React from 'react';
import GoogleIcon from '../assets/googleIcon.svg'; // Google icon path
import ClubIcon from '../assets/ClubIcon.svg';     // Club icon path
import bgImage from '../assets/bgImage.jpeg';

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-0 ">
      <div className="relative w-full md:w-3/5 h-[calc(100vh-80px)] overflow-hidden">
        <img src={bgImage} alt="Background" className="w-[calc(100vh-80px)] h-[calc(100vh-80px)] object-cover object-left-top" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
      <div className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
           <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">Login to
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0 ml-2" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>
          <button className="w-full bg-gray-300 border-none py-2 rounded flex justify-center items-center cursor-pointer mb-4 hover:bg-gray-400">
            <img src={GoogleIcon} alt="Google Icon" className="mr-2" />
            Sign in with Google
          </button>
          <hr />
          <p className="mt-2 mb-4">or sign in with email</p>
          <div className="space-y-4">
            <div>
              <label className="block text-left">Email id:</label>
              <input type="text" placeholder="Enter Id" className="w-full p-2 mt-1 rounded border border-gray-300" />
            </div>
            <div>
              <label className="block text-left">Password:</label>
              <input type="password" placeholder="Enter Password" className="w-full p-2 mt-1 rounded border border-gray-300" />
            </div>
          </div>
          <a href="/forgot-password" className="block text-right mt-2 text-blue-600 hover:underline">Forgot password?</a>
          <button className="w-full bg-gray-300 text-black py-2 rounded mt-4 hover:bg-gray-400">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
