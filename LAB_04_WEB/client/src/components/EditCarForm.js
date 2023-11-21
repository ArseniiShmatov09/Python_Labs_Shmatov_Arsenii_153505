import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const EditCarForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    cost: '',
    description: '',
    yearOfPublication: '',
    carUrl: '',
    carcassType: '', 
  });
  const [carcassTypes, setCarcassTypes] = useState([]); 
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const carResponse = await axios.get(`http://localhost:3001/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const carcassTypesResponse = await axios.get('http://localhost:3001/carcassTypes');

        setFormData({
          brand: carResponse.data.brand,
          model: carResponse.data.model,
          cost: carResponse.data.cost.toString(),
          description: carResponse.data.description,
          yearOfPublication: carResponse.data.yearOfPublication.toString(),
          carUrl: carResponse.data.carUrl,
          carcassType: carResponse.data.carcassType._id, 
        });

        setCarcassTypes(carcassTypesResponse.data);
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3001/cars/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      history.push(`/cars/${id}`);
    } catch (error) {
      console.error('Error editing car:', error.message);

      if (error.response && error.respAonse.data) {
        setFormError(error.response.data[0].msg);
      } else {
        setFormError('Error editing car. Please try again.');
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">
        Brand:
        <input
          className="form-input"
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Model:
        <input
          className="form-input"
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Cost:
        <input
          className="form-input"
          type="text"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Description:
        <input
          className="form-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Year of Publication:
        <input
          className="form-input"
          type="text"
          name="yearOfPublication"
          value={formData.yearOfPublication}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Car Image URL:
        <input
          className="form-input"
          type="text"
          name="carUrl"
          value={formData.carUrl}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Carcass Type:
        <select
          className="form-select"
          name="carcassTypeId"
          value={formData.carcassTypeId}
          onChange={handleChange}
        >
          {carcassTypes.map((carcassType) => (
            <option key={carcassType._id} value={carcassType._id}>
              {carcassType.designation}
            </option>
          ))}
        </select>
      </label>

      <button className="form-button" type="submit">
        Update Car
      </button>

      {formError && <p className="form-error">{formError}</p>}
    </form>
  );
};

export default EditCarForm;
