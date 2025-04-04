import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './create-article.css';

const CreateArticle = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    solo: false,
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Création de l'article";
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token")
    // Ici tu envoies `formData` + image si besoin
    console.log('Données soumises :', formData);
    try {
      const response = await fetch("http://localhost:3100/addArticle", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    <section className="add-article-page">
      <h2>Ajouter un article</h2>
      <form className="add-article-form" onSubmit={handleSubmit}>
        <div className="image-upload">
          {imagePreview ? (
            <img src={imagePreview} alt="Aperçu" className="image-preview" />
          ) : (
            <div className="image-placeholder">Aperçu de l'image</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="form-fields">
          <label>
            Nom de l'article :
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Type :
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">-- Sélectionner --</option>
              <option value="1">Boisson</option>
              <option value="2">Dessert</option>
              <option value="3">Entree</option>
              <option value="4">Plat</option>
              <option value="5">Accompagnement</option>
            </select> 
          </label>

          <label>
            Prix (€) :
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="solo"
              checked={formData.solo}
              onChange={handleChange}
            />
            L'article est vendu individuellement
          </label>

          <button type="submit" className="btn yellow">Ajouter l'article à la carte</button>
        </div>
      </form>
    </section>
  );
};

export default CreateArticle;
