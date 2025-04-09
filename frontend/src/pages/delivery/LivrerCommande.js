import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './LivrerCommande.css';
import FooterLivreur from "../../components/FooterLivreur";


function LivrerCommande() {
  const navigate = useNavigate();
  const location = useLocation();
  const commande = location.state;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleValidation = () => {
    const codeValide = "1234"; 
    if (code === codeValide) {
      setConfirmed(true);
      navigate("/livraison") 
    } else {
      setError("Code incorrect, veuillez réessayer.");
    }
  };

  return (
    <div className="recap-container">
      <h2>Livraison à {commande?.client?.prenom}</h2>
      <p><strong>Adresse client :</strong> {commande?.client?.adresse}</p>

      {!confirmed ? (
        <>
          <input
            type="text"
            placeholder="Entrer le code client"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-input"
          />
          {error && <p className="error">{error}</p>}
          <button className="qr-button" onClick={handleValidation}>
            Valider la réception de la commande
            <img src="/check.svg" alt="Valider" className="btn-icon" />
          </button>

        </>
      ) : (
        <p className="success-message">Livraison confirmée. Redirection...</p>
      )}
    <FooterLivreur />
    </div>
  );
}

export default LivrerCommande;
