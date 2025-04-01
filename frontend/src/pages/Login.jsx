import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch("http://localhost:3100/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.authorization);
        console.log(JSON.stringify(data.authorization));
        navigate("/dashboard");
      } else {
        console.error("Erreur de connexion :", data.message);
      }

    } catch (error) {
      console.error("Erreur de connexion :", error.response?.data?.message);
      alert("Erreur de connexion, adresse mail ou mot de passe erroné");

    }
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
