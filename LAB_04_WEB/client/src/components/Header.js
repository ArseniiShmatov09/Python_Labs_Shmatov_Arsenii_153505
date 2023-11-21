// Header.js

import React, { useState, useEffect } from 'react';
import AuthButtons from '../components/AuthButtons';
import TimeZoneInfo from '../components/TimeZoneInfo';
import Navigation from '../components/Navigation';
import axios from 'axios';
import './styles/userZone.css';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3001/auth/me', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
        setLoggedInUser(response.data);
      })
      .catch(error => {
        console.error('Token verification error:', error.message, token);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="container">
        <Navigation />
        <TimeZoneInfo />
        <div className="user-greeting">
          {(loggedInUser ) && <p>Привет, {loggedInUser?.fullName}!</p>}
          {!(loggedInUser ) && <p>Пожалуйста, войдите</p>}
        </div>
        <AuthButtons isAuthenticated={!!loggedInUser} onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
