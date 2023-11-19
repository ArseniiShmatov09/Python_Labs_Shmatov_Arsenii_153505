import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddCarForm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    cost: '',
    description: '',
    yearOfPublication: '',
    carUrl: '',
  });
  const [formError, setFormError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/cars', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        brand: '',
        model: '',
        cost: '',
        description: '',
        yearOfPublication: '',
        carUrl: '',
      });

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
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
      </label>
      <label>
        Model:
        <input type="text" name="model" value={formData.model} onChange={handleChange} />
      </label>
      <label>
        Cost:
        <input type="text" name="cost" value={formData.cost} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <label>
        Year of Publication:
        <input type="text" name="yearOfPublication" value={formData.yearOfPublication} onChange={handleChange} />
      </label>
      <label>
        Car Image URL:
        <input type="text" name="carUrl" value={formData.carUrl} onChange={handleChange} />
      </label>
      <button type="submit">Add Car</button>
    {formError && <p style={{ color: 'red' }}>{formError}</p>}
  </form>
  );
};

export default AddCarForm;
