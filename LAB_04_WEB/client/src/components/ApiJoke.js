import React, { useState, useEffect } from 'react';
import './styles/utils.css';

const ApiJoke = () => {
  const [joke, setJoke] = useState({ setup: '', punchline: '' });

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch('https://official-joke-api.appspot.com/jokes/random');

        const jokeData = await response.json();

        if (jokeData && jokeData.setup && jokeData.punchline) {
          setJoke({ setup: jokeData.setup, punchline: jokeData.punchline });
        } else {
          console.error('Invalid joke data');
        }
      } catch (error) {
        console.error('Error fetching joke:', error.message);
      }
    };

    fetchJoke();
  }, []); 
  return (
    <div className='container'>
      <div className="joke-container">
        <p className="joke-setup">{joke.setup}</p>
        <p className="joke-punchline">{joke.punchline}</p>
      </div>
    </div>
  );
};

export default ApiJoke;
