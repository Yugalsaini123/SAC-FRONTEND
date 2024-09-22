// src/components/MainContent.jsx
import React from 'react';
import bgImage from '../assets/bgImage.jpeg';
import './MainContent.css';

const MainContent = () => {
    return (
        <div className="main-content">
            
            <div className="background">
                <img src={bgImage} alt="Background" />
            </div>
            <div className="welcome-text">
                <h1>Welcome to ClubCon</h1>
                <p>Join the community that's right for you.</p>
                <div className="buttons">
                    <button className="create-btn">Create an Organisation</button>
                    <button className="login-btn">Login</button>
                </div>
            </div>
        </div>
    );
}

export default MainContent;
