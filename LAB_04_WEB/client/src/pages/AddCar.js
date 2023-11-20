import React from 'react';
import AddCarForm from '../components/AddCarForm';
import { useHistory } from 'react-router-dom';

const AddCarPage = () => {
  const history = useHistory();

  const handleAddCar = (carData) => {
    console.log('Car added:', carData);
    history.push('/');
  };

  return (
    <div>
      <h2>Add Car</h2>
      <AddCarForm onAddCar={handleAddCar} />
    </div>
  );
};

export default AddCarPage;
