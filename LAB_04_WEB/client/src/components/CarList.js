import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error.message);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h2>All Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <p>Brand: {car.brand}</p>
            <p>Model: {car.model}</p>
            <p>Cost: {car.cost}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
