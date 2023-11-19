// CarList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Вместо текущего кода в компоненте CarList

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [sortOption, setSortOption] = useState(''); // Добавлено состояние для сортировки

  useEffect(() => {
      const fetchCars = async () => {
          try {
              const response = await axios.get(`http://localhost:3001/cars${sortOption ? `?sortBy=${sortOption}` : ''}`);
              setCars(response.data);
          } catch (error) {
              console.error('Error fetching cars:', error.message);
          }
      };

      fetchCars();
  }, [sortOption]);

  const handleSortChange = (newSortOption) => {
      setSortOption(newSortOption);
  };

  return (
      <div>
          <h2>All Cars</h2>
          <div>
              <button onClick={() => handleSortChange('priceAsc')}>Sort by Price (Asc)</button>
              <button onClick={() => handleSortChange('priceDesc')}>Sort by Price (Desc)</button>
          </div>
          <ul>
              {cars.map((car) => (
                  <li key={car._id}>
                    <Link to={`/cars/${car._id}`}>
                        <p>{car.brand} {car.model}</p>
                    </Link>
                    <p>Cost: {car.cost}</p>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default CarList;
