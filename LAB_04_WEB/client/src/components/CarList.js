import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>All Cars</h2>
      <div>
        <button onClick={() => handleSortChange('priceAsc')}>Sort by Price (Asc)</button>
        <button onClick={() => handleSortChange('priceDesc')}>Sort by Price (Desc)</button>
        <label htmlFor="carcassTypeSelect">Choose carcass type:</label>
        <select id="carcassTypeSelect" onChange={handleCarcassTypeChange} value={selectedCarcassType}>
          <option value="">All</option>
          {carcassTypes.map((carcassType) => (
            <option key={carcassType._id} value={carcassType._id}>
              {carcassType.designation}
            </option>
          ))}
        </select>
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
