// src/components/MainContent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bgImage.jpeg';
import './MainContent.css';

const MainContent = () => {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/signup');
  };
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="main-content">
      <div className="background">
        <img src={bgImage} alt="Background" />
      </div>
      <div className="welcome-text">
        <h1>Welcome to ClubCon</h1>
        <p>Join the community that's right for you.</p>
        <div className="buttons">
          <button onClick={navigateToSignup} className="create-btn">Create an Organisation</button>
          <button onClick={navigateToLogin} className="login-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;