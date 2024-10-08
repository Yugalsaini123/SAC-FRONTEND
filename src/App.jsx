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
import Dashboard from './components/Dashboard.jsx';
import DbHeader from './components/DbHeader.jsx';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Layout><MainContent /></Layout>} />
          <Route path="/signup" element={<Layout><SignupPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/sstep0" element={<Layout><SStep0 /></Layout>} />
          <Route path="/sstep1" element={<Layout><SStep1 /></Layout>} />
          <Route path="/sstep2" element={<Layout><SStep2 /></Layout>} />
          <Route path="/verify-email" element={<Layout><VerifyEmailPage /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/otp-verify" element={<Layout><OtpVerify /></Layout>} />
          <Route path="/reset-password" element={<Layout><ResetPasswordPage /></Layout>} />
          <Route path="/reset-success" element={<Layout><ResetSuccessPage /></Layout>} />

          <Route path="/dashboard" element={<> <DbHeader /> <Dashboard /> </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;