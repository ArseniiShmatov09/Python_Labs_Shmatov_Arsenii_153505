// CarList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/carList.css'; 

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [carcassTypes, setCarcassTypes] = useState([]);
  const [selectedCarcassType, setSelectedCarcassType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/cars';

        if (selectedCarcassType) {
          url += `?carcassType=${selectedCarcassType}`;
        }

        if (sortOption) {
          url += `${selectedCarcassType ? '&' : '?'}sortBy=${sortOption}`;
        }

        const response = await axios.get(url);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error.message);
      }
    };

    const fetchCarcassTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/carcassTypes');
        setCarcassTypes(response.data);
      } catch (error) {
        console.error('Error fetching carcass types:', error.message);
      }
    };

    fetchData();
    fetchCarcassTypes();
  }, [sortOption, selectedCarcassType]);

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleCarcassTypeChange = (event) => {
    setSelectedCarcassType(event.target.value);
  };

  return (
    <div className="container">
      <div className="sort-buttons">
        <button onClick={() => handleSortChange('priceAsc')}>Sort by Price (Asc)</button>
        <button onClick={() => handleSortChange('priceDesc')}>Sort by Price (Desc)</button>
        <select id="carcassTypeSelect" onChange={handleCarcassTypeChange} value={selectedCarcassType}>
          <option value="">All</option>
          {carcassTypes.map((carcassType) => (
            <option key={carcassType._id} value={carcassType._id}>
              {carcassType.designation}
            </option>
          ))}
        </select>
      </div>
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car._id} className="car-item">
            <img src={`${car.carUrl}`} alt={`${car.brand} ${car.model}`} className="car-image" />
            <Link to={`/cars/${car._id}`} className="car-link">
              <p className="car-details">{car.brand} {car.model}</p>
            </Link>
            <p className="car-cost">Cost: {car.cost}$</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
