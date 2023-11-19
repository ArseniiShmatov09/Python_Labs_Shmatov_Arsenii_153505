import React from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from '../components/AuthButtons';
import CarList from '../components/CarList';
import { useState } from 'react';

const Home = ({ loggedInUser, onLogout }) => {
  const [showAddCarForm] = useState(false);

  return (
    <div>
      <h1>Home</h1>
      <AuthButtons isAuthenticated={!!loggedInUser} onLogout={onLogout} />
      <div>
        {loggedInUser ? (
          <p>Привет, {loggedInUser.fullName}!</p>
        ) : (
          <p>Пожалуйста, войдите</p>
        )}
      </div>
      <CarList />
      <Link to="/add-car">Add Car</Link>
      {showAddCarForm}
    </div>
  );
};

export default Home;
