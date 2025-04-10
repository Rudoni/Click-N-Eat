import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user_type");
    if (userType !== "2") {
      navigate("/unauthorized");
      return;
    }
    if (!token) {
      navigate("/unauthorized");
      return;
    }

    const fetchRestaurantInfo = async () => {
      try {
        const response = await fetch("http://localhost:3100/getRestaurantInfo", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({})
        });

        const json = await response.json();
        if (response.ok) {
        console.log(json)
          setRestaurant({
            name: json.data.restaurant_name || '',
            description: json.data.restaurant_description || ''
          });
        } else {
          console.error("Erreur lors de la récupération des infos restaurant");
        }
      } catch (error) {
        console.error("Erreur serveur :", error);
      }
    };

    fetchRestaurantInfo();
  }, []);

  return (
    <section className="restaurant-dashboard">
      <h1 className="dashboard-title">Bienvenue sur votre tableau de bord</h1>
      <div className="restaurant-card">
        <h2 className="restaurant-name">{restaurant.name}</h2>
        <p className="restaurant-description">{restaurant.description}</p>
      </div>
    </section>
  );
};

export default RestaurantDashboard;
