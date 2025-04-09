import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Livraison.css';
import FooterLivreur from "../../components/FooterLivreur";


function Livraison() {
  const [livraisons, setLivraisons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Données fictives simulées
    const data = [
      {
        _id: "1",
        client: { prenom: "Alice", adresse: "15 rue des Lilas, 75012 Paris" },
        resto: "Pizza Roma",
        restaurantAdresse: "10 rue du Resto, Paris"
      },
      {
        _id: "2",
        client: { prenom: "Bruno", adresse: "22 avenue Victor Hugo, 69006 Lyon" },
        resto: "Sushi Zen",
        restaurantAdresse: "8 rue du Sushi, Lyon"
      }
    ];
    setLivraisons(data);
  }, []);

  const handleAccept = (id) => {
    const selected = livraisons.find((l) => l._id === id);
    navigate("/accepter-commande", { state: selected });
  };

  const handleRefuse = async (id) => {
    try {
      const res = await fetch(`http://localhost:3002/deliveries/refuse/${id}`, {
        method: "POST",
      });
      if (res.ok) {
        setLivraisons((prev) => prev.filter((l) => l._id !== id));
      }
    } catch (err) {
      console.error("Erreur refus :", err);
    }
  };

  return (
    <div className="livraison-container">
      {livraisons.map((livraison) => (
        <div key={livraison._id} className="livraison-card">
          <div className="livraison-header">
            <div className="livraison-info">
              <p><strong>Restaurant :</strong> {livraison.resto}</p>
              <p><strong>Client :</strong> {livraison.client?.prenom}</p>
              <p><strong>Adresse :</strong> {livraison.client?.adresse}</p>
            </div>
          </div>
          <div className="livraison-btns">
          <button className="btn-refuse" onClick={() => handleRefuse(livraison._id)}>
            Refuser
            <img src="/cross.svg" alt="Refuser" className="btn-icon" />
            </button>

            <button className="btn-accept" onClick={() => handleAccept(livraison._id)}>
            Accepter
            <img src="/check.svg" alt="Accepter" className="btn-icon" />
          </button>


          </div>
        </div>
      ))}

    <div className="livraison-historique">
        <a href="/historique-livraisons" className="btn-historique">
            Historique
            <img src="/history.svg" alt="Historique" className="btn-icon" />
        </a>
    </div>

      <FooterLivreur />
    </div>
  );
}

export default Livraison;
