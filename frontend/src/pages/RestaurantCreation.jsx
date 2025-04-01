import React, { useState, useEffect, useNavigate } from 'react';
import './RestaurantCreation.css';


const RestaurantCreation = () => {
  const [form, setForm] = useState({
    restaurantName: "",
    description: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
    role: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Création du restaurant";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.restaurantName || !form.description || !form.country || !form.city || !form.postalCode || !form.address || !form.role) {
      alert("Tous les champs sont obligatoires !");
      return false;
    }
    if (!/^\d{5}$/.test(form.postalCode)) {
      alert("Le code postal doit contenir 5 chiffres.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3100/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setError("Erreur lors de la connexion au serveur.");
    }
  };

  return (
    <div className="restaurant-creation-page">
      <h2>Créer votre restaurant</h2>
      <form className="restaurant-form" onSubmit={handleSubmit}>
        <label>Nom du restaurant</label>
        <input type="text" name="restaurantName" onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" onChange={handleChange} required></textarea>

        <label>Pays</label>
        <input type="text" name="country" onChange={handleChange} required />

        <label>Code Postal</label>
        <input type="text" name="postalCode" onChange={handleChange} required />

        <label>Ville</label>
        <input type="text" name="city" onChange={handleChange} required />

        <label>Adresse</label>
        <input type="text" name="address" onChange={handleChange} required />

        <label>Type de compte</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="restaurant"
              onChange={handleChange}
              required
            />
            Restaurant
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="client"
              onChange={handleChange}
            />
            Client
          </label>
        </div>

        <label>Image principale</label>
        <div className="image-upload main-image">
          <input type="file" name="mainImage" accept="image/*" />
        </div>

        <label>Image de fond</label>
        <div className="image-upload background-image">
          <input type="file" name="backgroundImage" accept="image/*" />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn yellow">Créer le restaurant</button>
      </form>
    </div>
  );
};

export default RestaurantCreation;
