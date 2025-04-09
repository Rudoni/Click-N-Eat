import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './RecapCommande.css';
import FooterLivreur from "../../components/FooterLivreur";

function RecapCommande() {
  const navigate = useNavigate();
  const location = useLocation();
  const commande = location.state;

  const handleConfirmPickup = () => {
    navigate("/livrer-commande", { state: commande });
  };

  return (
    <div className="recap-container">
      <h2>Commande #{commande?._id}</h2>
      <p><strong>Restaurant :</strong> {commande?.resto}</p>
      <p><strong>Adresse du restaurateur :</strong> {commande?.restaurantAdresse || "10 rue du Resto, Paris"}</p>

      <button className="qr-button" onClick={handleConfirmPickup}>
        Confirmer la récupération
        <img src="/check.svg" alt="Check" className="btn-icon" />
      </button>

     
      <FooterLivreur />
    </div>
  );
}

export default RecapCommande;
