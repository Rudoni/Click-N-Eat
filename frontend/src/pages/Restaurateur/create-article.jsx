import React, { useState } from 'react';
import './create-article.css';

const CreateArticle = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    solo: false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu envoies `formData` + image si besoin
    console.log('Données soumises :', formData);
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
              <option value="boisson">Boisson</option>
              <option value="dessert">Dessert</option>
              <option value="accompagnement">Accompagnement</option>
              <option value="plat">Plat principal</option>
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
