import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderManagement.css';

const GestionCommandes = () => {
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Gestion des Commandes";

    const userType = localStorage.getItem("user_type");
    if (userType !== "2") {
      navigate("/unauthorized");
      return;
    }
    if (!token) {
      navigate("/unauthorized");
      return;
    }

    const fetchCommandes = async () => {
      try {
        const response = await fetch("http://localhost:3100/getCommandesRestaurant", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCommandes(data.commandes || []);
        } else {
          setError(data.message || "Erreur lors du chargement des commandes.");
        }
      } catch (err) {
        console.error(err);
        setError("Erreur de connexion au serveur.");
      }
    };

    fetchCommandes();
  }, [token]);

  const handleConfirmer = async (commandeId) => {
    try {
      const response = await fetch(`http://localhost:3100/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Recharge les commandes après confirmation
        setCommandes(prev =>
          prev.map(cmd =>
            cmd.id === commandeId ? { ...cmd, etat: "Confirmée" } : cmd
          )
        );
      } else {
        alert(data.message || "Erreur lors de la confirmation.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la confirmation.");
    }
  };

  return (
    <section className="gestion-commandes">
      <h2>Gestion des Commandes</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="commandes-list">
        {commandes.map((commande) => (
          <div key={commande.id} className="commande-card">
            <h3>Commande #{commande.id}</h3>

            <div className="commande-contenu">
              <div>
                <strong>Articles :</strong>
                <ul>
                  {commande.articles.map((article, idx) => (
                    <li key={idx}>{article.nom}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Menus :</strong>
                <ul>
                  {commande.menus.map((menu, idx) => (
                    <li key={idx}>{menu.nom}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p><strong>État :</strong> {commande.etat}</p>

            <button
              className="btn"
              disabled={commande.etat !== "En attente de confirmation"}
              onClick={() => handleConfirmer(commande.id)}
            >
              Confirmer la commande
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GestionCommandes;
