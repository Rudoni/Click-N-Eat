import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h2>Click'N’Eat</h2>
        <div className="social-icons">
          <a href="#"><img src="/icons/twitter.svg" alt="Twitter" /></a>
          <a href="#"><img src="/icons/facebook.svg" alt="Facebook" /></a>
          <a href="#"><img src="/icons/instagram.svg" alt="Instagram" /></a>
          <a href="#"><img src="/icons/linkedin.svg" alt="LinkedIn" /></a>
        </div>
      </div>

      <div className="footer-col">
        <a href="#">Obtenir de l’aide</a>
        <a href="#">Ajouter votre restaurant</a>
        <a href="#">Devenir livreur</a>
        <a href="#">Devenir développeur tiers</a>
      </div>

      <div className="footer-col">
      <Link to="/privacy">Politique et confidentialité</Link>
        <p>© 2025 Click’N’Eat Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
