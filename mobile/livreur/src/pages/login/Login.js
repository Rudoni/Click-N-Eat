import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Appelle de l'api 
    alert(`Connexion réussie pour ${email}`);
    // Rediriger vers le dashboard ou une autre page
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h1>Connexion Livreur</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit" className="btn login-btn">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginScreen;
