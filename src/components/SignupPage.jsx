 /* src/components/SignupPage.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import GoogleIcon from '../assets/googleIcon.svg'; // Add your Google icon
import ClubIcon from '../assets/ClubIcon.svg'; // Assuming ClubCon logo or icon
import bgImage from '../assets/bgImage.jpeg';

const SignupPage = () => {
  const navigate = useNavigate();
  const navigateToSStep1 = () => {
    navigate('/sstep1');
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={bgImage} alt="Background" className="club-background" />
      </div>
      <div className="signup-right">
        <div className="signup-form">
          <h1>Signup to <i className="fa fa-university"></i> ClubCon</h1>
          <button className="google-signup-btn">
            <img src={GoogleIcon} alt="Google Icon" />
            Signup with Google
          </button>
          <p>or</p>
          <button onClick={navigateToSStep1} className="email-signup-btn">Continue with email</button>
          <p className="terms-text">
            By creating an account you agree with our 
            <a href="#"> Terms of Service</a>, <a href="#">Privacy Policy</a>, 
            and our default <a href="#">Notifications Settings</a>.
            Already have an account? <a href="#">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
