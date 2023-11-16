// Register.js
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import axios from 'axios';

const Register = ({ onRegister, history }) => {
  const handleRegister = async (email, password, fullName, avatarUrl) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/register', {
        email,
        password,
        fullName,
        avatarUrl,
      });

      // Вызывайте функцию обратного вызова для регистрации пользователя
      onRegister(response.data);

      // Перенаправьте пользователя на главную страницу или другую страницу после успешной регистрации
      history.push('/');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
