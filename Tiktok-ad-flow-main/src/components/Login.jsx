import React, { useEffect, useState } from 'react';
import { tiktokService } from '../services/tiktokService';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // To read the error from URL
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Check if we were redirected back here with an error
    const error = searchParams.get('error');
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    }
  }, [searchParams]);

  const handleLogin = () => {
    // Redirect to Real TikTok Login
    window.location.href = tiktokService.getLoginUrl();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>

      <div style={{ width: '400px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '30px' }}>TikTok Ads Manager</h1>

        {/* ERROR BANNER - Only shows if there is an error */}
        {errorMessage && (
          <div style={{
            background: '#ffe6e6',
            color: '#d00',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px',
            border: '1px solid #fcc',
            textAlign: 'left'
          }}>
            <strong>Login Failed:</strong><br />
            {errorMessage}
          </div>
        )}

        <div style={{ padding: '40px', background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Please connect your account to proceed.
          </p>

          <button
            onClick={handleLogin}
            style={{
              padding: '15px 30px',
              background: 'black',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '4px',
              width: '100%'
            }}
          >
            Connect TikTok Ads Account
          </button>
        </div>
      </div>

    </div>
  );
};

export default Login;