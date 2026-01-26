import React, { useState } from 'react';

const MockTikTokLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthorize = () => {
    setIsLoading(true);
    
    // 1. CRITICAL FIX: Retrieve the security state saved by the Login page
    const state = localStorage.getItem('oauth_state');
    
    // Safety Check: If the user typed the URL directly instead of clicking "Connect",
    // the state won't exist, and the flow is invalid.
    if (!state) {
      alert("Security Error: No state found. Please go back to the Home page and click 'Connect' again.");
      setIsLoading(false);
      return;
    }
    
    // 2. Generate a FAKE auth code (simulating TikTok's response)
    const mockCode = "MOCK_AUTH_CODE_" + Math.random().toString(36).substring(7);
    // for invalid client_id simulation
    //  const mockCode = "MOCK_CLIENT_ERR";
    // for invalid scope simulation
    //  const mockCode = "MOCK_SCOPE_ERR";
    // 3. Simulate network delay
    setTimeout(() => {
      // 4. Redirect back to Callback with BOTH code AND state
      // The Callback component will compare this 'state' with what is in localStorage.
      window.location.href = `http://localhost:3000/oauth-callback?code=${mockCode}&state=${state}`;
    }, 800);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f4f4' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center', width: '400px' }}>
        
        <h2 style={{ color: '#000', marginBottom: '10px' }}>TikTok for Business</h2>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
          Mock Authorization Server
        </p>

        <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>MyAdsApp requests permission to:</p>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#333' }}>
            <li>Read your ad campaigns</li>
            <li>Manage your creative assets</li>
          </ul>
        </div>
        
        <button 
          onClick={handleAuthorize} 
          disabled={isLoading}
          style={{ 
            width: '100%', 
            background: '#FE2C55', 
            color: 'white', 
            border: 'none', 
            padding: '12px', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontSize: '16px',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? "Redirecting..." : "Authorize (Mock)"}
        </button>

      </div>
    </div>
  );
};

export default MockTikTokLogin;