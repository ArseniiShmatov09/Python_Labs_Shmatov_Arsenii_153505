import React, { useState, useEffect } from 'react';

const ApiDogImage = () => {
  const [dogImageUrl, setDogImageUrl] = useState('');

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        if (data && data.message) {
          setDogImageUrl(data.message);
        } else {
          console.error('Invalid dog image data');
        }
      } catch (error) {
        console.error('Error fetching dog image:', error.message);
      }
    };

    fetchDogImage();
  }, []);

  return (
    <div className='container'>
      {dogImageUrl && <img className='news-image' height={150} src={dogImageUrl} alt="Dog" />}
    </div>
  );
};

export default ApiDogImage;
