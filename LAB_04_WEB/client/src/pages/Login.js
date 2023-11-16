// Login.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
      setLoggedInUser(response.data);
      // Вызовите функцию обратного вызова, переданную из родительского компонента
      onLogin(response.data);
      history.push('/');
    } catch (error) {
      console.error('Login error:', error.message);

      if (error.response) {
        // Ошибка от сервера с кодом состояния, например, 404 или 400
        if (error.response.status === 404) {
          setError('User not found');
        } else if (error.response.status === 400) {
          setError('Invalid login or password');
        } else {
          setError('Error logging in');
        }
      } else if (error.request) {
        // Ошибка запроса
        setError('Request error');
      } else {
        // Остальные ошибки
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
