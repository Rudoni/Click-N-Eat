// Order.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa'; 
import './Order.css';

function Order() {
  const navigate = useNavigate();

  // Fausse liste de commandes 
  const [orders, setOrders] = useState([
    {
      id: 1,
      userName: 'Léa',
      address: '5 rue des bois, Nancy',
      distance: '10 km',
      price: '5 euros',
      restaurant: 'Macdo',
      userPhoto: '/assets/user1.png' 
    },
    {
      id: 2,
      userName: 'Bob',
      address: '7 rue des bois, Nancy',
      distance: '3 km',
      price: '2 euros',
      restaurant: 'Macdo',
      userPhoto: '/assets/user2.png'
    }
  ]);

    const orderData = {
        id: 1,
        restaurant: 'Macdo Nancy Centre',
        client: 'Léa',
        address: '5 rue des bois, Nancy',
        phone: '06 01 01 01 01',
        lat: 48.6921,
        lng: 6.1844
    };
    navigate('/map', { state: { order: orderData } });

  const handleAccept = async (orderId) => {
    const acceptedOrder = orders.find(order => order.id === orderId);
    
    try {
      // Simulation de l'appel API pour accepter la commande
      alert(`Commande ${orderId} acceptée !`);
      // Redirige vers la page Map en passant les infos de la commande
      navigate('/map', { state: { order: acceptedOrder } });
    } catch (error) {
      console.error('Erreur lors de l’acceptation de la commande :', error);
      alert('Erreur lors de l’acceptation de la commande');
    }
  };

  const handleRefuse = (orderId) => {
    alert(`Commande ${orderId} refusée !`);
    // Appelle API de refus ici si nécessaire
  };

  return (
    <div className="orders-container">
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <img
            src={order.userPhoto}
            alt={order.userName}
            className="user-photo"
          />
          <div className="order-details">
            <h3>{order.userName}</h3>
            <p>{order.address}</p>
            <p>{order.distance} de {order.restaurant}</p>
            <p>{order.price}</p>
          </div>
          <div className="order-actions">
            <button className="refuse-btn" onClick={() => handleRefuse(order.id)}>
              <FaTimes className="icon" /> Refuser
            </button>
            <button className="accept-btn" onClick={() => handleAccept(order.id)}>
              <FaCheck className="icon" /> Accepter
            </button>
          </div>
        </div>
      ))}
      <button className="history-btn">Historique</button>
    </div>
  );
}

export default Order;
