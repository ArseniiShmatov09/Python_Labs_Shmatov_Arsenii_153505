import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from '../components/AuthButtons';
import CarList from '../components/CarList';
import axios from 'axios';
import ApiJoke from '../components/ApiJoke';
import ApiDogImage from '../components/ApiDogImage';
import TimeZoneInfo from '../components/TimeZoneInfo';
import Header from '../components/Header';
import './styles/utils.css';

const Home = ({ loggedInUser, onLogout }) => {

  return (
    <div>
      <Header/>

     <CarList />
     <div className='container'>
     {loggedInUser && <Link to="/add-car" className="add-car-link">Add Car</Link>}
     </div>

     {loggedInUser && <ApiJoke/>}
    {loggedInUser && <ApiDogImage/>}
    </div>
  );
};

export default Home;