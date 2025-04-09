import React from "react";
import './FooterLivreur.css';

function FooterLivreur() {
  return (
    <div className="footer-livreur">
      <a href="/livraison"><img src="/order.svg" alt="Livraison" className="icon" /></a>
      <a href="/profile"><img src="/profile.svg" alt="Profil" className="icon" /></a>
      <a href="/accepter-commande"><img src="/delivery.svg" alt="Carte" className="icon" /></a>
    </div>
  );
}

export default FooterLivreur;
