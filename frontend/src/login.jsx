// Login.js
import React from 'react';
import { CAS_SERVER_URL, SERVICE_URL } from '../config';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${CAS_SERVER_URL}/login?service=${encodeURIComponent(SERVICE_URL)}`;
  };

 sgvudh
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with CAS</button>
    </div>
  );
};

export default Login;


