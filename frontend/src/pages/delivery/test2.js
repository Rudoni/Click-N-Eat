import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import "./WebSocketComponentLivereur.css";

const WebSocketComponentLivereur = () => {
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(1);
  const [restaurantId, setRestaurantId] = useState(1);
  const socket = useSocket();

  useEffect(() => {
    socket.on("new-delivery", (orderData) => {
      console.log("Nouvelle commande reçue:", orderData);
      setMessage(orderData);
    });

    return () => {
      socket.off("new-delivery");
    };
  }, [userId, restaurantId]);

  const handleValider = () => {
    if (message) {
      setMessage({ ...message, state: "confirmee" });
    }
  };

  const handleAccepter = () => {
    if (message) {
      setMessage({ ...message, state: "acceptée" });
    }
  };

  return (
    <div className="websocket-container">
      <h1>Commandes à livrer</h1>

      {message ? (
        <div className="order-box">
          <p><strong>ID Commande :</strong> {message._id}</p>
          <p><strong>ID Client :</strong> {message.client.user_id}</p>
          <p><strong>ID Restaurant :</strong> {message.resto.restaurantId}</p>
          <p><strong>État :</strong> {message.state}</p>

          <h3>Contenu de la commande :</h3>
          <ul className="items-list">
            {message.items.map((item, index) => (
              <li key={index}>
                {item.nom} - {item.type} x {item.quantity} - {item.prix}€
              </li>
            ))}
          </ul>

          <div className="button-container">
            {message.state === "en attante" && (
              <button className="btn yellow" onClick={handleValider}>Valider</button>
            )}

            {message.state === "Confirmee" && (
              <button className="btn green" onClick={handleAccepter}>Accepter</button>
            )}
          </div>
        </div>
      ) : (
        <p>Aucune commande pour l’instant.</p>
      )}
    </div>
  );
};

export default WebSocketComponentLivereur;
