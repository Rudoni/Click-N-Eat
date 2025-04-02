// src/pages/OrderConfirmation.js
import React, { useState } from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const [showCode, setShowCode] = useState(false);

  // Simule un code de confirmation à 4 chiffres
  const confirmationCode = '8342';

  return (
    <div className="order-confirmation-page">
      <h2>Commande confirmée ✅</h2>
      <p>Merci pour votre commande !</p>
      <p><strong>État :</strong> En attente de confirmation par le restaurateur</p>

      <button className="btn-show-code" onClick={() => setShowCode(!showCode)}>
        {showCode ? 'Masquer le code' : 'Afficher le code de confirmation'}
      </button>

      {showCode && (
        <div className="confirmation-code-box">
          <p className="code-label">Code de confirmation :</p>
          <p className="code-value">{confirmationCode}</p>
          <p className="code-info">À présenter au livreur lors de la livraison</p>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
