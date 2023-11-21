// AddCarForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles/addForm.css'; // Импорт стилей

const AddCarForm = ({ onAddCar }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [yearOfPublication, setYearOfPublication] = useState('');
  const [carUrl, setCarUrl] = useState('');
  const [carcassTypes, setCarcassTypes] = useState([]);
  const [selectedCarcassType, setSelectedCarcassType] = useState('');
  const history = useHistory();
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchCarcassTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/carcassTypes');
        setCarcassTypes(response.data);
      } catch (error) {
        console.error('Error fetching carcass types:', error.message);
      }
    };

    fetchCarcassTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/cars', {
        brand,
        model,
        cost,
        description,
        yearOfPublication,
        carUrl,
        carcassTypeId: selectedCarcassType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onAddCar(response.data);
      setBrand('');
      setModel('');
      setCost('');
      setDescription('');
      setYearOfPublication('');
      setCarUrl('');
      setSelectedCarcassType('');

      history.push('/');
    } catch (error) {
      console.error('Error adding car:', error.message);

      if (error.response && error.response.data) {
        setFormError(error.response.data[0].msg);
      } else {
        setFormError('Error adding car. Please try again.');
      }
    }
  };

  return (
    <form className="addform-container" onSubmit={handleSubmit}>
      <label className="addform-label">
        Brand:
        <input
          className="addform-input"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
      </label>
      <label className="addform-label">
        Model:
        <input
          className="addform-input"
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </label>
      <label className="addform-label">
        Cost:
        <input
          className="addform-input"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
      </label>
      <label className="addform-label">
        Description:
        <textarea
          className="addform-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className="addform-label">
        Year of Publication:
        <input
          className="addform-input"
          type="number"
          value={yearOfPublication}
          onChange={(e) => setYearOfPublication(e.target.value)}
          required
        />
      </label>
      <label className="addform-label">
        Car Image URL:
        <input
          className="addform-input"
          type="url"
          value={carUrl}
          onChange={(e) => setCarUrl(e.target.value)}
          required
        />
      </label>
      <label className="addform-label">
        Carcass Type:
        <select
          className="addform-select"
          value={selectedCarcassType}
          onChange={(e) => setSelectedCarcassType(e.target.value)}
          required
        >
          <option value="" disabled>Select Carcass Type</option>
          {carcassTypes.map((carcassType) => (
            <option key={carcassType._id} value={carcassType._id}>
              {carcassType.designation}
            </option>
          ))}
        </select>
      </label>
      <button className="addform-button" type="submit">Add Car</button>
      {formError && <p className="addform-error">{formError}</p>}
    </form>
  );
};

export default AddCarForm;
