import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from '../components/AuthButtons';
import CarList from '../components/CarList';
import axios from 'axios';
import ApiJoke from '../components/ApiJoke';
import ApiDogImage from '../components/ApiDogImage';
import TimeZoneInfo from '../components/TimeZoneInfo';

const Home = ({ loggedInUser, onLogout }) => {

  return (
    <div>
      <h1>Home</h1>
      <TimeZoneInfo/>
      <AuthButtons isAuthenticated={!!loggedInUser} onLogout={onLogout} />
      <div>
        {loggedInUser && <p>Привет, {loggedInUser.fullName}!</p>}
        {!loggedInUser && <p>Пожалуйста, войдите</p>}
      </div>



      {loggedInUser && <Link to="/add-car">Add Car</Link>}
     <CarList />
     {loggedInUser && <ApiJoke/>}
    {loggedInUser && <ApiDogImage/>}
    </div>
  );
};

export default Home;
