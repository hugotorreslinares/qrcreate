import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MdQrCode } from 'react-icons/md';
import './App.css';
import QRCodeGenerator from './components/QRCodeGenerator';
import GoogleAuth from './components/GoogleAuth';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App">
        {!user ? (
          <div className="login-container">
            <div className="login-header">
              <MdQrCode size={64} className="qr-icon" />
              <h1>QR Code Generator</h1>
            </div>
            <div className="login-description">
              <p>Create custom QR codes for your links, text, and more!</p>
              <ul>
                <li>✨ Customize colors and size</li>
                <li>💾 Download as PNG</li>
                <li>🚀 Easy to use interface</li>
                <li>🔒 Secure Google login</li>
              </ul>
            </div>
            <GoogleAuth onLogin={handleLogin} />
          </div>
        ) : (
          <QRCodeGenerator user={user} onLogout={handleLogout} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
