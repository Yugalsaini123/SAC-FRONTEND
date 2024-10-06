// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SStep0 from './components/SStep0';
import SStep1 from './components/SStep1.jsx';
import SStep2 from './components/SStep2.jsx';
import VerifyEmailPage from './components/VerifyEmailPage';
import './styles/App.css';
import ForgotPassword from './components/Forgotpassword.jsx';
import OtpVerify from './components/OtpVerify.jsx';
import './App.css';
import ResetSuccessPage from './components/ResetSuccessPage.jsx';
import ResetPasswordPage from './components/ResetPassword.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/sstep0" element={<SStep0/>} />
          <Route path="/sstep1" element={<SStep1/>} />
          <Route path="/sstep2" element={<SStep2/>} />
          <Route path="/verify-email" element={<VerifyEmailPage/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/otp-verify" element={<OtpVerify/>} />
          <Route path="/reset-password" element={<ResetPasswordPage/>} />
          <Route path="/reset-success" element={<ResetSuccessPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;