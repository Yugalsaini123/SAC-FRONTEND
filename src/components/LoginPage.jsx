import React from 'react';
import GoogleIcon from '../assets/googleIcon.svg'; // Google icon path
import ClubIcon from '../assets/ClubIcon.svg';     // Club icon path
import bgImage from '../assets/bgImage.jpeg';

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen justify-center items-center bg-gray-100">
      <div className="w-full md:w-1/2 bg-blue-100 flex justify-center items-center overflow-hidden">
        <img src={bgImage} alt="Background" className="w-4/5 max-w-md h-auto" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <h1 className="text-2xl font-bold mb-6">Signin into <i className="fa fa-university"></i> ClubCon</h1>
          <button className="w-full bg-gray-300 border-none py-2 rounded flex justify-center items-center cursor-pointer mb-4 hover:bg-gray-500">
            <img src={GoogleIcon} alt="Google Icon" className="mr-2" />
            Sign in with Google
          </button>
          <p className="mb-4">or sign in with email</p>
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
          <a href="/forgot-password" className="block text-right mt-2 text-gray-600">Forgot password?</a>
          <button className="w-full bg-gray-300 text-black py-2 rounded mt-4 hover:bg-gray-500">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
