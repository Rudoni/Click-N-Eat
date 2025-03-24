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
      </nav>
    </header>
  );
};

export default Header;
