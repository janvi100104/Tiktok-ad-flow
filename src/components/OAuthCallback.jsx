import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing login...');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const storedState = localStorage.getItem('oauth_state');

    // 1. Security Check
    if (!state || state !== storedState) {
      // Redirect to Login with Error
      navigate('/?error=Security+Check+Failed');
      return;
    }

    if (code) {
      if (code.startsWith("MOCK_")) {
        handleMockExchange(code);
      } else {
        handleRealExchange(code);
      }
    } else {
      navigate('/?error=No+Code+Received');
    }
  }, []);

  const handleMockExchange = (mockCode) => {
    setStatus("Verifying Credentials...");
    
    setTimeout(() => {
      // --- ERROR SCENARIOS (Redirects back to Login) ---
      
      // Scenario: Invalid Client ID [cite: 32]
      if (mockCode.includes("CLIENT_ERR")) {
        navigate('/?error=Invalid+Client+ID+or+Secret');
        return;
      }

      // Scenario: Missing Scope [cite: 33]
      if (mockCode.includes("SCOPE_ERR")) {
        navigate('/?error=Missing+Ads+Permission+Scope');
        return;
      }

      // --- HAPPY PATH ---
      const fakeToken = "mock_access_token_" + Math.random().toString(36).substring(7);
      localStorage.setItem('tiktok_token', fakeToken);
      navigate('/create-ad');
    }, 800);
  };

  const handleRealExchange = async (authCode) => {
    try {
      // (Your existing real fetch logic here...)
      // For testing, we just simulate a network error if this runs:
       navigate('/?error=Real+API+Network+Error');
    } catch (err) {
       navigate('/?error=Network+Connection+Failed');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <h3>{status}</h3>
    </div>
  );
};

export default OAuthCallback;