// AuthButtons.js
import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = ({ isAuthenticated, onLogout }) => {
  const handleLogout = () => {
    // Добавьте здесь логику для выхода пользователя
    console.log('Logout clicked');
    onLogout(); // Вызовите функцию выхода, переданную из родительского компонента
  };

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default AuthButtons;
