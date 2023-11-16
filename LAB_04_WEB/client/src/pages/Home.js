// Home.js
import React from 'react';
import AuthButtons from '../components/AuthButtons';
import CarList from '../components/CarList';

const Home = ({ loggedInUser, onLogout }) => {
  return (
    <div>
      <h1>Home</h1>
      {/* Внедряем компонент AuthButtons */}
      <AuthButtons isAuthenticated={!!loggedInUser} onLogout={onLogout} />
      {/* Компонент, отображающий приветствие или приглашение войти */}
      <div>
        {loggedInUser ? (
          <p>Привет, {loggedInUser.fullName}!</p>
        ) : (
          <p>Пожалуйста, войдите</p>
        )}
      </div>
      {/* Другой ваш контент здесь */}
      <CarList />
    </div>
  );
};

export default Home;
