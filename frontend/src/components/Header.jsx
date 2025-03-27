import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src="/logo_Click_N_eat.png" alt="Click'n'Eat Logo" className="logo" />
      </Link>

      <div className="burger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <nav className={`nav ${open ? 'open' : ''}`}>
        <Link to="/commander" className="btn light" onClick={() => setOpen(false)}>Commander</Link>
        <Link to="/contact" className="link" onClick={() => setOpen(false)}>Contact</Link>
        <Link to="/login" className="btn yellow" onClick={() => setOpen(false)}>Connexion</Link>

        {/* 
        <Link to="/parametres" className="btn light" onClick={() => setOpen(false)}>Paramètres Généraux</Link>
        <Link to="/tableau-de-bord" className="btn light" onClick={() => setOpen(false)}>Tableau de bord</Link>
        <Link to="/commandes" className="btn light" onClick={() => setOpen(false)}>Les commandes</Link>
        <Link to="/carte" className="btn light" onClick={() => setOpen(false)}>La carte</Link>
        <Link to="/logs" className="btn light" onClick={() => setOpen(false)}>Logs</Link>
        <Link to="/deploiement" className="btn light" onClick={() => setOpen(false)}>Déploiement de service</Link>
        <Link to="/routes" className="btn light" onClick={() => setOpen(false)}>Routes</Link>
        <Link to="/statistiques" className="btn light" onClick={() => setOpen(false)}>Statistiques</Link>
        <Link to="/gestion-comptes" className="btn light" onClick={() => setOpen(false)}>Gestion des comptes</Link>
        */}

      </nav>
    </header>
  );
};

export default Header;
