import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Command.css';

const Command = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Commander en ligne";

    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3100/restaurant/list", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Réponse du serveur :", data);
        if (response.ok) {
          setRestaurants(data.data); // On suppose que "data" contient la liste des restaurants
        } else {
          setError(data.message || "Erreur lors de la récupération des restaurants");
        }
      } catch (err) {
        setError("Erreur de communication avec le serveur");
      }
    };

    fetchRestaurants();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="restaurant-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>
      <h2 className="title">Restaurants disponibles</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div
              key={restaurant.restaurant_id}
              className="restaurant-card"
              onClick={() => handleNavigate(restaurant.restaurant_id)}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="restaurant-name">{restaurant.restaurant_name}</h3>
              <p className="restaurant-description">{restaurant.restaurant_description}</p>
            </div>
          ))
        ) : (
          <p>Aucun restaurant disponible</p>
        )}
      </div>
    </div>
  );
};

export default Command;
