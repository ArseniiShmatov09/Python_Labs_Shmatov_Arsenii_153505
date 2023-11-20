import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
          Authorization: `Bearer ${token}`, // Добавьте токен в заголовки запроса
        },
      });

      onAddCar(response.data);
      // Очищаем поля формы после успешного добавления
      setBrand('');
      setModel('');
      setCost('');
      setDescription('');
      setYearOfPublication('');
      setCarUrl('');
      setSelectedCarcassType('');

      history.push('/');

    }
    catch (error) {
        console.error('Error adding car:', error.message);
    
        if (error.response && error.response.data) {
          setFormError(error.response.data[0].msg);
        } else {
          setFormError('Error adding car. Please try again.');
        }
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Brand:
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      </label>
      <label>
        Model:
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
      </label>
      <label>
        Cost:
        <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Year of Publication:
        <input type="number" value={yearOfPublication} onChange={(e) => setYearOfPublication(e.target.value)} required />
      </label>
      <label>
        Car URL:
        <input type="url" value={carUrl} onChange={(e) => setCarUrl(e.target.value)} required />
      </label>
      <label>
        Carcass Type:
        <select value={selectedCarcassType} onChange={(e) => setSelectedCarcassType(e.target.value)} required>
          <option value="" disabled>Select Carcass Type</option>
          {carcassTypes.map((carcassType) => (
            <option key={carcassType._id} value={carcassType._id}>
              {carcassType.designation}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Car</button>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}

    </form>
  );
};

export default AddCarForm;
