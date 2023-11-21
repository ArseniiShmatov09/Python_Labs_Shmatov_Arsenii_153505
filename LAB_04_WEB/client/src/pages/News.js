import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './styles/news.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
    <Header/>
    <div className="news-container">
      {news.map((item) => (
        <div key={item._id} className="news-item">
          <h3 className="news-title">{item.title}</h3>
          <img src={item.newsUrl} alt={item.title} className="news-image" />
          <p className="news-description">{item.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default News;