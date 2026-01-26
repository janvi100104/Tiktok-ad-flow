# 🎵 TikTok Ads Creative Flow - Frontend Assignment

A React-based Single Page Application (SPA) that simulates the TikTok Ads creation process. This project demonstrates OAuth 2.0 integration, complex state management, cross-field validation, and robust error handling for "unhappy paths."

## 🚀 Features

- **Mock OAuth 2.0 Flow:** Simulates the full Authorization Code flow (Redirect → Code → Token Exchange).
- **Ad Creation Form:** Includes validation for Campaign Name, Ad Text, and CTA.
- **Complex Business Logic:** Enforces dependencies between "Objective" and "Music" fields (e.g., *No Music* is forbidden for *Conversion* campaigns).
- **Live Ad Preview:** Real-time mobile preview of the ad creative.
- **Error Handling Simulation:** A built-in system to trigger specific API errors (Geo-restriction, Token Expiry, Invalid IDs) for demonstration purposes.

---

## 🛠️ Setup & Installation

### 1. Prerequisites
- **Node.js**: v14 or higher
- **npm**: v6 or higher

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/janvi100104/Tiktok-ad-flow
cd tiktok-ads-flow
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory. Since we are using a Mock OAuth System, you can use these placeholder credentials:

```env
REACT_APP_TIKTOK_APP_ID=sbawvcck2evep92v93
REACT_APP_TIKTOK_SECRET=xZBDcNrqJZqeyRuk2MFeYIOdxVbOdR6
REACT_APP_REDIRECT_URI=http://localhost:3000/oauth-callback
```

### 4. Run the Application
Start the development server:

```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🧪 Testing Error Scenarios (Reviewer Guide)

Since the API is mocked, I have implemented specific "Trigger Words" to demonstrate how the UI handles API failures. Use these inputs to verify the error handling requirements:

| Scenario | Where to Type | Trigger Input | Expected Result |
| :--- | :--- | :--- | :--- |
| **Geo-Restriction (403)** | Campaign Name | `GEO` | Submission blocked; Global Red Error Banner appears. |
| **Token Expired (401)** | Campaign Name | `EXPIRED` | Alert appears; User is logged out and redirected to Login. |
| **Invalid Music ID** | Music ID Field | `BAD_ID` | Inline error message: "Music ID is invalid..." |
| **Login: Invalid Client ID** | *See Note below* | *Code Change* | Red Banner on Login Screen. |

> **Note for Login Errors:** To test "Invalid Client ID" or "Missing Permissions", uncomment the specific lines in `src/components/MockTikTokLogin.jsx` (Lines 15-20).
