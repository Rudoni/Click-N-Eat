import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

const WebSocketComponent = () => {
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(1);
  const [restaurantId, setRestaurantId] = useState(1);
  const socket = useSocket();

  useEffect(() => {
    socket.on("new-order", (orderData) => {
      console.log("Nouvelle commande reçue:", orderData);
      setMessage(orderData);
    });

    return () => {
      socket.off("new-order");
    };
  }, [userId, restaurantId]);

  const handleValider = () => {
    if (message) {
      setMessage({ ...message, state: "Confirmée" });
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Commande reçue :</h1>

      {message && (
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", marginTop: "1rem" }}>
          <p><strong>ID Commande :</strong> {message._id}</p>
          <p><strong>État :</strong> {message.state}</p>

          <h3>Contenu de la commande :</h3>
          <ul>
            {message.items.map((item, index) => (
              <li key={index}>
                {item.nom} - {item.type} x {item.quantity} - {item.prix}€
              </li>
            ))}
          </ul>

          {message.state == "en attante" && (
            <button onClick={handleValider} style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#f0c040", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Valider la commande
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WebSocketComponent;
