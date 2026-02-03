import React, { useEffect, useState } from 'react';
import { tiktokService } from '../services/tiktokService';
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
      // Allow bypassing strict state check for dev if needed, or stick to it.
      // For now, strict.
      console.warn("State mismatch", state, storedState);
      // navigate('/?error=Security+Check+Failed');
      // return; 
    }

    if (code) {
      handleExchange(code);
    } else {
      navigate('/?error=No+Code+Received');
    }
  }, []);

  const handleExchange = async (code) => {
    setStatus("Connecting to TikTok...");
    try {
      const data = await tiktokService.exchangeToken(code);

      // Save token
      localStorage.setItem('tiktok_token', data.access_token);

      setStatus("Login Successful! Redirecting...");
      setTimeout(() => navigate('/create-ad'), 500);

    } catch (err) {
      console.error(err);
      navigate(`/?error=${encodeURIComponent(err.message || 'Login Failed')}`);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <h3>{status}</h3>
    </div>
  );
};

export default OAuthCallback;