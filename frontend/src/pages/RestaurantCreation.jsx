import React from 'react';
import './RestaurantCreation.css';

const RestaurantCreation = () => {
  return (
    <div className="restaurant-creation-page">
      <h2>Créer votre restaurant</h2>
      <form className="restaurant-form">
        <label>Nom du restaurant</label>
        <input type="text" name="restaurantName" required />

        <label>Description</label>
        <textarea name="description" required></textarea>

        <label>Pays</label>
        <input type="text" name="country" required />

        <label>Code Postal</label>
        <input type="text" name="postalCode" required />

        <label>Adresse</label>
        <input type="text" name="address" required />

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