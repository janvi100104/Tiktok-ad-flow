import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import MockTikTokLogin from './components/MockTikTokLogin';
import OAuthCallback from './components/OAuthCallback';
import AdForm from './components/AdForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mock-login" element={<MockTikTokLogin />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/create-ad" element={<AdForm />} />
      </Routes>
    </Router>
  );
}

export default App;