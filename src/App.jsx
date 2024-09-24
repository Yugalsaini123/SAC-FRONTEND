// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SStep1 from './components/SStep1';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/sstep1" element={<SStep1/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;