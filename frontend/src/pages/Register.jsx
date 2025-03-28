import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState("1");
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    password2: ""
  });

  useEffect(() => {
    document.title = "S'inscrire à Click-N-Eat";
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch("http://localhost:3100/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          password2: form.password2,
          type: role,
          nom: form.nom,
          prenom: form.prenom,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.error("Erreur de connexion :", data.message);
      }

    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div className="register-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

      <div className="role-selector">
        <button onClick={() => setRole("1")}>Client</button>
        <button onClick={() => setRole("2")}>Restaurateur</button>
        <button onClick={() => setRole("3")}>Développeur tiers</button>
        <button onClick={() => setRole("4")}>Livreur</button>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>
          {role === "2"
            ? "Restaurateur"
            : "Client / Développeur tiers / Livreur"}
        </h2>

        <label>Nom</label>
        <input id="nom" name="nom" onChange={handleChange} required />

        <label>Prénom</label>
        <input id="prenom" name="prenom" onChange={handleChange} required />

        <label>Email</label>
        <input id="email" name="email" type="email" onChange={handleChange} required />

        <label>Mot de passe</label>
        <input id="password" name="password" type="password" onChange={handleChange} required />

        <label>Confirmation mot de passe</label>
        <input id="password2" name="password2" type="password" onChange={handleChange} required />

        <button type="submit" className="btn yellow">
          Créer un compte
        </button>
      </form>
    </div>
  );
};

export default Register;
