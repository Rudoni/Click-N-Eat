import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h2>Click'N’Eat</h2>
        <div className="social-icons">
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <img src="/icons/twitter.svg" alt="Twitter" />
  </a>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <img src="/icons/facebook.svg" alt="Facebook" />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <img src="/icons/instagram.svg" alt="Instagram" />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
    <img src="/icons/linkedin.svg" alt="LinkedIn" />
  </a>
</div>
      </div>

      <div className="footer-col">
      <Link to="/contact">Obtenir de l’aide</Link>
      <Link to="/register">Ajouter votre restaurant</Link>
      <Link to="/register">Devenir livreur</Link>
      <Link to="/register">Devenir développeur tiers</Link>
      </div>

      <div className="footer-col">
      <Link to="/privacy">Politique et confidentialité</Link>
        <p>© 2025 Click’N’Eat Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
