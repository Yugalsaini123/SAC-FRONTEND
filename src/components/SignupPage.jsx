 /* src/components/SignupPage.jsx */
 import React from 'react';
 import { useNavigate } from 'react-router-dom';
 import GoogleIcon from '../assets/googleIcon.svg'; // Add your Google icon
 import ClubIcon from '../assets/ClubIcon.svg'; // Assuming ClubCon logo or icon
 import bgImage from '../assets/bgImage.jpeg';
 
 const SignupPage = () => {
   const navigate = useNavigate();
   const navigateToSStep0 = () => {
     navigate('/sstep0');
   };
 
   return (
     <div className="flex flex-col md:flex-row items-center justify-between p-0 ">
       <div className="relative w-full md:w-3/5 h-[calc(100vh-80px)] overflow-hidden">
         <img src={bgImage} alt="Background" className="w-[calc(100vh-80px)] h-[calc(100vh-80px)] object-cover object-left-top  " />
       </div>
       <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
         <div className="w-4/5 max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
           <h1 className="text-2xl font-bold mb-6">Signup to <i className="fa fa-university"></i> ClubCon</h1>
           <button className="w-full bg-gray-300 border-none py-2 rounded flex justify-center items-center cursor-pointer mb-4">
             <img src={GoogleIcon} alt="Google Icon" className="mr-2" />
             Signup with Google
           </button>
           <p className="mb-4">or</p>
           <button onClick={navigateToSStep0} className="w-full bg-gray-300 border-none py-2 rounded cursor-pointer mb-4">Continue with email</button>
           <p className="text-sm text-gray-600">
             By creating an account you agree with our 
             <a href="#" className="text-blue-600 hover:underline"> Terms of Service</a>, <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>, 
             and our default <a href="#" className="text-blue-600 hover:underline">Notifications Settings</a>.
             Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
           </p>
         </div>
       </div>
     </div>
   );
 };
 
 export default SignupPage;
 