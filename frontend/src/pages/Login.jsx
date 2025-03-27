import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Connexion à Click-N-Eat";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: appeler l’API ici
    alert("Connexion réussie !");
  };

  return (
    <div className="login-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="support@clickneat.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          placeholder="motdepasse123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to="/forgot-password" className="forgot-link">
           Mot de passe oublié ?
        </Link>

        <button type="submit" className="btn yellow">Se connecter</button>
        <button type="button" className="btn yellow" onClick={() => navigate('/register')}>
          Créer un compte
        </button>
      </form>
    </div>
  );
};

export default Login;
