import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Car Details</h2>
      <img height={150} width={200} alt='' src={`${car.carUrl}`}/>
      
      <p>Name: {car.brand}, {car.model}</p>
      <p>Description: {car.description}</p>
      <p>Carcass Type: {carcassType || 'Unknown'}</p>
      <p>Year of publication: {car.yearOfPublication}</p> 
      <p>Cost: {car.cost}</p>
      <p>Views: {car.viewsCount}</p>
      <p>Author: {author || 'Unknown'}</p> 

         {isAuthor && (
        <button onClick={handleDeleteCar}>Delete Car</button>
      )}
        {isAuthor && (
        <Link to={`/edit-car/${id}`}>
          <button>Edit Car</button>
        </Link>
      )}
        </div>
  );
};

export default CarDetails;