import React from 'react';
import './LoginPage.css'; // Make sure to add custom styles here
import GoogleIcon from '../assets/googleIcon.svg'; // Google icon path
import ClubIcon from '../assets/ClubIcon.svg';     // Club icon path
import bgImage from '../assets/bgImage.jpeg';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={bgImage} alt="Background" className="club-background" />
      </div>
      <div className="login-right">
        <div className="login-form">
          <h1>Signin into <i className="fa fa-university"></i> ClubCon</h1>
          <button className="google-signup-btn">
            <img src={GoogleIcon} alt="Google Icon" />
            Sign in with Google
          </button>
          <p>or sign in with email</p>
          <div className="email-login-fields">
            <label>Email id:</label>
            <input type="text" placeholder="Enter Id" />
            <label>Password:</label>
            <input type="password" placeholder="Enter Password" />
          </div>
          <a href="#" className="forgot-password">Forgot password?</a>
          <button className="login-btn">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
