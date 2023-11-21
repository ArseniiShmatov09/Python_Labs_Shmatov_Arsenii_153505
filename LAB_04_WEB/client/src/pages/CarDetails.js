import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles/carDetails.css';

const CarDetails = ({ loggedInUser }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [author, setAuthor] = useState(null);
  const [carcassType, setCarcassType] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchCarDetails = async () => {
    const token = localStorage.getItem('token');
  
      try {
        const response = await axios.get(`http://localhost:3001/cars/${id}`);
        setCar(response.data);

            const authorId = response.data.user;
            const authorResponse = await axios.get(`http://localhost:3001/users/${authorId}`);
            setAuthor(authorResponse.data.fullName);

            const carcassTypeId = response.data.carcassType;

            if (carcassTypeId) {
              const carcassTypeResponse = await axios.get(`http://localhost:3001/carcassTypes/${carcassTypeId}`);
              setCarcassType(carcassTypeResponse.data.designation);
            }
        } catch (error) {
          console.error('Error fetching car details:', error.message);
        }


      };
  

    fetchCarDetails();
  }, [id,]);


  const handleDeleteCar = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      history.push('/');

    } catch (error) {
      console.error('Error deleting car:', error.message);
    }
  };

  if (!car) {
    return <p>Loading...</p>;
  }
  const isAuthor = loggedInUser && author === loggedInUser.fullName;
  
  return (

    <div><Header />
    <div className="containerr">
      
      <img className="car-imagee" alt='' src={`${car.carUrl}`} />
      <p className="car-detailsss">Name: {car.brand}, {car.model}</p>
      <p className="car-detailsss">Description: {car.description}</p>
      <p className="car-detailsss">Carcass Type: {carcassType || 'Unknown'}</p>
      <p className="car-detailsss">Year of publication: {car.yearOfPublication}</p>
      <p className="car-detailsss">Cost: {car.cost}</p>
      <p className="car-detailsss">Views: {car.viewsCount}</p>
      <p className="car-detailsss">Author: {author || 'Unknown'}</p>
  
      {isAuthor && (
        <button className="car-detailss" onClick={handleDeleteCar}>Delete Car</button>
      )}
      {isAuthor && (
        <Link to={`/edit-car/${id}`}>
          <button className="car-detailss">Edit Car</button>
        </Link>
      )}
    </div>
    </div>
  );
};

export default CarDetails;