// RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+/i.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!fullName) {
      errors.fullName = 'Full Name is required';
    } else if (fullName.length < 6) {
      errors.fullName = 'Full Name must be at least 6 characters long';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(email, password, fullName);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else {
        console.error('Error during registration:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <div>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
