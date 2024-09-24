// src/components/SStep1.jsx
import React from 'react';
import './SStep1.css';
import ClubIcon from '../assets/ClubIcon.svg'; // Assuming ClubCon logo or icon
import bgImage from '../assets/bgImage.jpeg';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src={ClubIcon} alt="ClubCon" className="clubcon-logo" />
        <nav>
          <a href="#">About Us</a>
          <a href="#">Review</a>
          <a href="#">Support <i className="fa fa-headphones"></i></a>
        </nav>
      </div>
      <div className="login-content">
        <div className="login-left">
          <img src={bgImage} alt="Background" className="club-background" />
          {/* Background image or illustration */}
        </div>
        <div className="login-right">
          <form className="login-form">
            <h1><i className="fa fa-university"></i> ClubCon</h1>
            <div className="form-group">
              <label>Email id:</label>
              <input type="email" placeholder="Enter Id" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" placeholder="Enter Password" required />
            </div>
            <p>Already Created? <a href="/login">login</a></p>
            <button type="submit" className="login-btn">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
