// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SStep0 from './components/SStep0';
import SStep1 from './components/SStep1';
import SStep2 from './components/SStep2';
import VerifyEmailPage from './components/VerifyEmailPage';
import './styles/App.css';
import ForgotPassword from './components/ForgotPassword';
import OtpVerify from './components/OtpVerify';
import ResetSuccessPage from './components/ResetSuccessPage';
import ResetPasswordPage from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import DbHeader from './components/DbHeader';
import EditProfile from './components/EditProfile';
import ManageClubs from './components/ManageClubs';
import ManageAdmins from './components/ManageAdmins.jsx';
import Manageorg from './components/ManageOrganisation.jsx';
import ViewEvents from './components/ViewEvents';
import { AuthProvider } from './context/OrganisationContext';
import SideBar from './components/SideBar';
import DepartmentView from './components/DepartmentView.jsx';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout><MainContent /></Layout>} />
            <Route path="/signup" element={<Layout><SignupPage /></Layout>} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />
            <Route path="/sstep0" element={<Layout><SStep0 /></Layout>} />
            <Route path="/sstep1" element={<Layout><SStep1 /></Layout>} />
            <Route path="/sstep2" element={<Layout><SStep2 /></Layout>} />
            <Route path="/sidebar" element={<SideBar />} />
            <Route path="/verify-email" element={<Layout><VerifyEmailPage /></Layout>} />
            <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
            <Route path="/otp-verify" element={<Layout><OtpVerify /></Layout>} />
            <Route path="/reset-password" element={<Layout><ResetPasswordPage /></Layout>} />
            <Route path="/reset-success" element={<Layout><ResetSuccessPage /></Layout>} />
            <Route path="/dashboard" element={<> <DbHeader /> <Dashboard /> </>} />
            <Route path="/editprofile" element={<> <EditProfile /> </>} />
            <Route path="/manageclub" element={<> <DbHeader /> <ManageClubs /> </>} />
            <Route path="/manageadmins" element={<> <DbHeader /> <ManageAdmins /> </>} />
            <Route path="/viewevents" element={<> <DbHeader /> <ViewEvents /> </>} />
            <Route path="/manageorg" element={<> <DbHeader /> <Manageorg /> </>} />
            <Route path="/DepartmentView" element={<> <DbHeader /> <DepartmentView /> </>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
