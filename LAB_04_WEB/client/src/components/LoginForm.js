// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
