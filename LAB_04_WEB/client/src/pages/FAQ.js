import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './styles/faq.css';

const FAQ = () => {
  const [faq, setFAQ] = useState([]);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await axios.get('http://localhost:3001/faq');
        setFAQ(response.data);
      } catch (error) {
        console.error('Error fetching faq:', error.message);
      }
    };

    fetchFAQ();
  }, []);


  return (
    <div><Header />
    <div className="faq-container">
      
      {faq.map((item) => (
        <div key={item._id} className="faq-item">
          <h4 className="faq-question">{item.question}</h4>
          <p className="faq-answer">{item.answer}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FAQ;