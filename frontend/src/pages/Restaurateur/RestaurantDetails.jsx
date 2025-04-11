import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RestaurantDetails.css';
import { CartContext } from '../../context/CartContext';

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    document.title = "Détails du restaurant";

    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch('http://localhost:3100/restaurant/details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Si tu utilises un token d'authentification
          },
          body: JSON.stringify({ id: parseInt(id) }),  // Envoie l'ID du restaurant
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails');
        }

        const data = await response.json();
        console.log("data" , data)
        setRestaurant(data);  // Récupère les détails du restaurant

      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (!restaurant) return <div className="loading">Chargement...</div>;

  const getArticlesFromIds = (ids) => {
    return restaurant.articles.filter(article => ids.includes(article.id));
  };

  return (
    <div key={restaurant.id} className="restaurant-details-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

      <div className="restaurant-header">
        <h2 className="restaurant-name">{restaurant.nom}</h2>
        <p className="restaurant-description">{restaurant.restaurant_description}</p>
        <p className="restaurant-address">
          {restaurant.adresse}, {restaurant.address_postal_code} {restaurant.address_city}, {restaurant.address_country}
        </p>
      </div>

      <h3 className="menu-title">Menus disponibles</h3>
      <div className="menu-list">
        {restaurant.menus.map(menu => {
          // const menuArticles = getArticlesFromIds(menu.articles);
          return (
            <div key={menu.id} className="menu-card">
              <h4>{menu.nom}</h4>
              <p><strong>Prix :</strong> {menu.prix} €</p>
              {/* <ul>
                {menuArticles.map(article => (
                  <li key={article.id}>
                    {article.name} - {article.price} € ({article.type})
                  </li>
                ))}
              </ul> */}
              <button className="order-btn" onClick={() => addToCart(menu, 'menu')}>
                Ajouter au panier
              </button>
            </div>
          );
        })}
      </div>

      <h3 className="menu-title">Articles à la carte</h3>
      <div className="menu-list">
        {restaurant.articles
          .filter(article => article.vendusolo)
          .map(article => (
            <div key={article.id} className="menu-card">
              <h4>{article.nom}</h4>
              <p>{article.type} - {article.prix} €</p>
              <button className="order-btn" onClick={() => addToCart(article, 'article')}>
                Ajouter au panier
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
