import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantSettings.css';

const RestaurantSettings = () => {
  const [form, setForm] = useState({
    restaurantName: '',
    description: '',
    country: '',
    city: '',
    postalCode: '',
    address: '',
  });
  const navigate = useNavigate();
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    const userType = localStorage.getItem("user_type");
    if (userType !== "2") {
      navigate("/unauthorized");
      return;
    }
    if (!token) {
      navigate("/unauthorized");
      return;
    }

    const fetchUserInfos = async () => {
      try {
        const response = await fetch("http://localhost:3100/getRestaurantInfo", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({})
        });

        const json = await response.json();
        if (response.ok) {
          console.log(json)
          setForm({
            restaurantName: json.data.restaurant_name || '',
            description: json.data.restaurant_description || '',
            country: json.data.address_country || '',
            city: json.data.address_city || '',
            postalCode: json.data.address_postal_code || '',
            address: json.data.address_name || '',
          });
        }
      }catch(e){
        
      }
    };
    fetchUserInfos();
  }, []);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === 'main') setMainImagePreview(previewUrl);
      else setBackgroundImagePreview(previewUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem("token");
  
    try {
      const bodyData = {
        restaurantName: form.restaurantName,
        description: form.description,
        country: form.country,
        city: form.city,
        postalCode: form.postalCode,
        address: form.address,
        // PAS d'image pour le moment
      };
  
      const response = await fetch("http://localhost:3100/restaurant/update", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la mise à jour");
      }
  
      alert("Paramètres enregistrés avec succès !");
    } catch (err) {
      console.error(err);
      setError(err.message || "Erreur inconnue");
    }
  };
  

  return (
    <section className="restaurant-settings-page">
      <h2>Paramètres du restaurant</h2>
      <form className="restaurant-settings-form" onSubmit={handleSubmit}>
        <div className="image-column">
          <label>Image principale</label>
          {mainImagePreview ? (
            <img src={mainImagePreview} alt="Aperçu principale" className="image-preview" />
          ) : (
            <div className="image-placeholder">Aperçu image principale</div>
          )}
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'main')} />

          <label>Image de fond</label>
          {backgroundImagePreview ? (
            <img src={backgroundImagePreview} alt="Aperçu fond" className="image-preview" />
          ) : (
            <div className="image-placeholder">Aperçu image de fond</div>
          )}
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'background')} />
        </div>

        <div className="form-column">
          <label>Nom du restaurant</label>
          <input type="text" name="restaurantName" value={form.restaurantName} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required></textarea>

          <label>Pays</label>
          <input type="text" name="country" value={form.country} onChange={handleChange} required />

          <label>Code Postal</label>
          <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} required />

          <label>Ville</label>
          <input type="text" name="city" value={form.city} onChange={handleChange} required />

          <label>Adresse</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} required />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn yellow">Enregistrer les paramètres</button>
        </div>
      </form>
    </section>
  );
};

export default RestaurantSettings;