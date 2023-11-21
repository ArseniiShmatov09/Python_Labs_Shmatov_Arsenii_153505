// Login.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles/login.css';

const Login = ({ onLogin, setLoggedInUser }) => {
  const [error, setError] = useState('');
  
  const history = useHistory();
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      console.log('Login successful', response.data);
      onLogin(response.data);
      history.push('/');
    } catch (error) {
      console.error('Login error:', error.message);

      if (error.response) {
        if (error.response.status === 404) {
          setError('User not found');
        } else if (error.response.status === 400) {
          setError('Invalid login or password');
        } else {
          setError('Error logging in');
        }
      } else if (error.request) {
        setError('Request error');
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div className="login-container">
    <LoginForm onSubmit={handleLogin} />
    {error && <p className="error-message">{error}</p>}
  </div>
  );
};

export default Login;
