import React, { useState } from 'react';
import GoogleIcon from '../assets/googleIcon.svg';
import ClubIcon from '../assets/ClubIcon.svg';
import bgImage from '../assets/bgImage.jpeg';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming token is returned after login
  
        // Get user profile to retrieve organization ID
        const profileResponse = await fetch('api/user/getUserProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Passing the token for authorization
          },
        });
  
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          const organizationId = profileData.data.profile.organizationId; // Accessing nested organizationId
  
          // If organizationId is undefined, redirect to step 2 to create an organization
          if (!organizationId) {
            navigate('/sstep2'); // Redirect to step 2 for organization creation
            return;
          }
  
          // Check if the organization exists and is valid
          const orgResponse = await fetch(`api/organization/${organizationId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (orgResponse.ok) {
            const orgData = await orgResponse.json();
  
            // Check if organization exists based on the response data
            if (orgData.data && orgData.data.organization) {
              navigate('/dashboard'); // Redirect to dashboard if organization exists
            } else {
              navigate('/sstep2'); // Redirect to step 2 if organization does not exist
            }
          } else {
            const orgData = await orgResponse.json();
            // If there is a 500 error and the organization could not be retrieved
            if (orgData.statusCode === 500) {
              navigate('/sstep2'); // Redirect to step 2 if fetching the organization fails
            } else {
              setError('Failed to check organization status.');
            }
          }
        } else {
          setError('Failed to retrieve user profile.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };
  
  
  

  const handleGoogleSignIn = () => {
    // Redirect to the Google authentication endpoint
    window.location.href = 'api/auth/google';
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-0 ">
      <div className="relative w-full md:w-3/5 h-[calc(100vh-80px)] overflow-hidden">
        <img src={bgImage} alt="Background" className="w-[calc(100vh-80px)] h-[calc(100vh-80px)] object-cover object-left-top" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form onSubmit={handleLogin} className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <div className="flex justify-center items-center text-2xl font-bold text-black mb-6">Login to
            <img src={ClubIcon} alt="icon" className="w-8 h-6 mr-0 ml-2" />
            <i className="fa fa-university mr-0"></i>
            ClubCon
          </div>
          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className="w-full bg-gray-300 border-none py-2 rounded flex justify-center items-center cursor-pointer mb-4 hover:bg-gray-400"
          >
            <img src={GoogleIcon} alt="Google Icon" className="mr-2" />
            Sign in with Google
          </button>
          <hr />
          <p className="mt-2 mb-4">or sign in with email</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="block text-left">Email id:</label>
              <input 
                type="email" 
                placeholder="Enter Id" 
                className="w-full p-2 mt-1 rounded border border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-left">Password:</label>
              <input 
                type="password" 
                placeholder="Enter Password" 
                className="w-full p-2 mt-1 rounded border border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <a href="/forgot-password" className="block text-right mt-2 text-blue-600 hover:underline">Forgot password?</a>
          <button type="submit" className="w-full bg-gray-300 text-black py-2 rounded mt-4 hover:bg-gray-400">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;