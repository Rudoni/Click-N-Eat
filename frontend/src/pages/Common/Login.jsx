import React, {useEffect, useState} from 'react';
import './Login.css';
// import { Link } from 'react-router-dom';

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3100/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker le token reçu
        localStorage.setItem("token", data.authorization);
        console.log(JSON.stringify(data.authorization));
        console.log(JSON.stringify(data.user_info))
        if(data.user_info.user_type == 2){
          console.log("USER RESTO CREATION WS")
        }
        navigate("/");

        // 🔁 Appel à /authenticate pour récupérer user_type
        const authRes = await fetch("http://localhost:3100/authenticate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.authorization}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const authData = await authRes.json();
        const userType = authData.data?.user_type;

        localStorage.setItem("user_type", userType);

        // Redirection selon type utilisateur
        if (userType === 4) {
          navigate("/livraison");
        } else {
          navigate("/");
        }

        window.location.reload();
      } else {
        alert(data.message || "Email ou mot de passe invalide.");
      }

    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Erreur de connexion, veuillez réessayer.");
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
