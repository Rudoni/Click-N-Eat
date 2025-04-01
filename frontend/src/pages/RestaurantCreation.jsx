import React, { useState, useEffect, useNavigate } from 'react';
import './RestaurantCreation.css';

const RestaurantCreation = () => {
  const [form, setForm] = useState({
    restaurantName: "",
    description: "",
    country: "",
    city:"",
    postalCode: "",
    address: ""
  });

    useEffect(() => {
      document.title = "Création du restaurant";
    }, []);

    const navigate = useNavigate();
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
    //TODO FAIRE LA REQUETE !!!!
        try {
          const response = await fetch("http://localhost:3100/", {
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
            }
          else {
            console.error("Erreur lors de la creation :", data.message);
          }
    
        } catch (error) {
          console.error("Erreur lors de la creation :", error);
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

        <label>Image principale</label>
        <div className="image-upload main-image">
          <input type="file" name="mainImage" accept="image/*" />
        </div>

        <label>Image de fond</label>
        <div className="image-upload background-image">
          <input type="file" name="backgroundImage" accept="image/*" />
        </div>

        <button type="submit" className="btn yellow">Créer le restaurant</button>
      </form>
    </div>
  );
};

export default RestaurantCreation;