import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import QRCodeGenerator from './components/QRCodeGenerator';
import GoogleAuth from './components/GoogleAuth';

const GOOGLE_CLIENT_ID = '953507863328-dum4pvh53qm4l0ir5hat5fq56ajo344h.apps.googleusercontent.com';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App">
        {!user ? (
          <div className="login-container">
            <h1>QR Code Generator</h1>
            <p>Please sign in to continue</p>
            <GoogleAuth onLogin={handleLogin} />
          </div>
        ) : (
          <QRCodeGenerator user={user} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
