import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState("client");
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    societe: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    document.title = "S'inscrire à Click-N-Eat";
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Compte créé !");
  };

  return (
    <div className="register-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

      <div className="role-selector">
        <button onClick={() => setRole("client")}>Client</button>
        <button onClick={() => setRole("restaurateur")}>Restaurateur</button>
        <button onClick={() => setRole("dev")}>Développeur tiers</button>
        <button onClick={() => setRole("livreur")}>Livreur</button>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>
          {role === "restaurateur"
            ? "Restaurateur"
            : "Client / Développeur tiers / Livreur"}
        </h2>

        <label>Nom</label>
        <input name="nom" onChange={handleChange} required />

        <label>Prénom</label>
        <input name="prenom" onChange={handleChange} required />

        {role === "restaurateur" && (
          <>
            <label>Société</label>
            <input name="societe" onChange={handleChange} />
          </>
        )}

        <label>Email</label>
        <input name="email" type="email" onChange={handleChange} required />

        <label>Mot de passe</label>
        <input name="password" type="password" onChange={handleChange} required />

        <button type="submit" className="btn yellow">
          Créer un compte
        </button>
      </form>
    </div>
  );
};

export default Register;
