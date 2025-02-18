import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';  // Changed this line

const GoogleAuth = ({ onLogin }) => {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);  // Changed this line
    onLogin(decoded);
  };

  return (
    <div className="google-auth">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default GoogleAuth;