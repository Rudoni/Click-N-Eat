import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Command.css';

// Liste simulée des restaurants (à remplacer par une requête API plus tard)
const restaurants = [
  { id: 1, name: 'Le Gourmet', image: '/le-gourmet.png' },
  { id: 2, name: 'Pizza Express', image: '/pizza-express.png' },
  { id: 3, name: 'Sushi World', image: '/sushi-world.png' },
  { id: 4, name: 'Burger House', image: '/burger-house.png' }
];

const Command = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Commander en ligne";
  }, []);

  const handleNavigate = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="restaurant-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>
      <h2 className="title">Restaurants disponibles</h2>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="restaurant-card" 
            onClick={() => handleNavigate(restaurant.id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="restaurant-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default.jpg'; // fallback local
              }}
            />
            <h3 className="restaurant-name">{restaurant.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Command;
