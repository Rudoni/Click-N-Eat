import React, { useEffect, useState } from "react";
import './HistoriqueLivraison.css';
import FooterLivreur from "../../components/FooterLivreur";


function HistoriqueLivraison() {
  const [livraisons, setLivraisons] = useState([]);

  useEffect(() => {
    // Données fictives simulant une réponse API
    const mockData = [
      {
        _id: "1",
        client: {
          prenom: "Alice",
          adresse: "15 rue des Lilas, Paris"
        },
        resto: "Pizza Roma",
        status: "Terminée",
        date: "2025-04-08T14:30:00Z"
      },
      {
        _id: "2",
        client: {
          prenom: "Bruno",
          adresse: "22 avenue Victor Hugo, Lyon"
        },
        resto: "Sushi Zen",
        status: "Annulée",
        date: "2025-04-07T18:15:00Z"
      },
      {
        _id: "3",
        client: {
          prenom: "Claire",
          adresse: "48 boulevard Saint-Michel, Marseille"
        },
        resto: "Le Bistrot du Coin",
        status: "Terminée",
        date: "2025-04-06T12:00:00Z"
      }
    ];

    setLivraisons(mockData);
  }, []);

  return (
    <div className="historique-container">
      <h2 className="historique-title">Historique des livraisons</h2>
      {livraisons.length === 0 ? (
        <p className="historique-empty">Aucune livraison effectuée pour le moment.</p>
      ) : (
        livraisons.map((livraison) => (
          <div key={livraison._id} className="historique-card">
            <p><strong>Client :</strong> {livraison.client.prenom}</p>
            <p><strong>Adresse :</strong> {livraison.client.adresse}</p>
            <p><strong>Restaurant :</strong> {livraison.resto}</p>
            <p><strong>Status :</strong> {livraison.status}</p>
            <p><strong>Date :</strong> {new Date(livraison.date).toLocaleString()}</p>
          </div>
        ))
      )}
      <div className="historique-footer">
        <a href="/livraison">⬅ Retour aux livraisons</a>
      </div>
      <div style={{ height: '5rem' }} /> 
      <FooterLivreur />
    </div>
  );
}


export default HistoriqueLivraison;
