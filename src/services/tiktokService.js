const API_BASE_URL = 'http://localhost:3001/api/tiktok';
const TIKTOK_AUTH_BASE_URL = 'https://www.tiktok.com/v2/auth/authorize/';

// NOTE: in a real app, these should be in environment variables (e.g. process.env.REACT_APP_TIKTOK_CLIENT_KEY)
// For now, we will assume they are provided or we can use a placeholder.
// The user should set REACT_APP_TIKTOK_CLIENT_KEY in their .env file.
const CLIENT_KEY = process.env.REACT_APP_TIKTOK_CLIENT_KEY || 'YOUR_CLIENT_KEY_HERE';
const REDIRECT_URI = 'http://localhost:3000/auth-callback';

export const tiktokService = {
    // 1. Construct Login URL
    getLoginUrl: () => {
        // secure random state
        const state = Math.random().toString(36).substring(7);
        localStorage.setItem('oauth_state', state);

        const params = new URLSearchParams({
            client_key: CLIENT_KEY,
            response_type: 'code',
            scope: 'user.info.basic,ads.management,ads.read', // Adjust scopes as needed
            redirect_uri: REDIRECT_URI,
            state: state,
        });

        return `${TIKTOK_AUTH_BASE_URL}?${params.toString()}`;
    },

    // 2. Exchange Code for Token
    exchangeToken: async (code) => {
        try {
            // We need to send the code_verifier if we used PKCE, but for now assuming standard flow or handled by backend if we send just code
            // The backend expects json body
            const response = await fetch(`${API_BASE_URL}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Token exchange failed');
            }

            return data;
        } catch (error) {
            console.error("Service Error:", error);
            throw error;
        }
    },

    // 3. Create Ad
    createAd: async (adData) => {
        const token = localStorage.getItem('tiktok_token');
        if (!token) throw new Error("No access token found");

        const response = await fetch(`${API_BASE_URL}/ads/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(adData)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Ad creation failed');
        return data;
    },

    // 4. Validate Music
    validateMusic: async (musicId) => {
        // If we don't have a token yet, we might not be able to validate on real backend if it requires auth.
        // But let's try.
        const token = localStorage.getItem('tiktok_token');

        // Fallback if no token (user might be filling form before login? No, flow says login first)
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}/music/validate`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ music_id: musicId })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Music validation failed');
        return data;
    }
};
