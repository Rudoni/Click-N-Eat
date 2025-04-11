import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserOrder.css';

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user_type");

    if (userType !== "1" || !token) {
      navigate("/unauthorized");
      return;
    }

    const fetchUserOrder = async () => {
      try {
        const response = await fetch("http://localhost:3100/testOrderView", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({})
        });

        const json = await response.json();
        if (response.ok) {
          setOrders(json);
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des commandes :", e);
      }
    };

    fetchUserOrder();
  }, [navigate]);

  return (
    <section className="user-orders-page">
      <h1>Mes Commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande disponible.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Commande #{order._id.slice(-6)}</h3>
              <p><strong>ID Client :</strong> {order.client.user_id}</p>
              <p><strong>ID Restaurant :</strong> {order.resto.restaurantId}</p>
              <p><strong>État :</strong> <span className={`etat ${order.state.toLowerCase()}`}>{order.state}</span></p>

              <div className="items-section">
                <h4>Articles :</h4>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      <span>{item.nom}</span> — {item.type} — {item.quantity} × {item.prix}€
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserOrder;
