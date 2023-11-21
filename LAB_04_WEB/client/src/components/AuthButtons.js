// AuthButtons.js

import React from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from './GoogleButton';
import './styles/userZone.css';

const AuthButtons = ({ isAuthenticated, onLogout }) => {
  const handleLogout = () => {
    console.log('Logout clicked');
    onLogout();
  };

  return (
<div className="right-panel">
      <ul className="auth-buttons">
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </li>

            <li>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </li>
            <li>
              <GoogleButton />
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AuthButtons;
