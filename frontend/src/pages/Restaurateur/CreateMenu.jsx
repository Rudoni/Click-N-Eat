import React, { useState } from 'react';
import './CreateMenu.css';

const CreateMenu = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
    selectedArticles: [],
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Faux articles de test
  const fakeArticles = [
    {
      _id: '1',
      name: 'Pizza Margherita',
      image: 'https://via.placeholder.com/100?text=Pizza',
    },
    {
      _id: '2',
      name: 'Coca-Cola',
      image: 'https://via.placeholder.com/100?text=Coca',
    },
    {
      _id: '3',
      name: 'Tiramisu',
      image: 'https://via.placeholder.com/100?text=Tiramisu',
    },
    {
      _id: '4',
      name: 'Frites',
      image: 'https://via.placeholder.com/100?text=Frites',
    },
    {
      _id: '5',
      name: 'Salade César',
      image: 'https://via.placeholder.com/100?text=Salade',
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleArticleSelection = (articleId) => {
    const selected = formData.selectedArticles.includes(articleId)
      ? formData.selectedArticles.filter((id) => id !== articleId)
      : [...formData.selectedArticles, articleId];
    setFormData({ ...formData, selectedArticles: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Menu créé :", formData);
    // Tu peux ensuite faire un fetch/axios ici pour envoyer les données
  };

  return (
    <section className="create-menu-page">
      <h2>Créer un Menu</h2>
      <form className="create-menu-form" onSubmit={handleSubmit}>
        <label>
          Nom du menu :
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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

        <label>
          Image du menu :
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {imagePreview && (
          <img src={imagePreview} alt="Aperçu" className="image-preview" />
        )}

        <h3>Choisir les articles du menu</h3>
        <div className="articles-grid">
          {fakeArticles.map((article) => (
            <div
              key={article._id}
              className={`article-card ${formData.selectedArticles.includes(article._id) ? 'selected' : ''}`}
              onClick={() => toggleArticleSelection(article._id)}
            >
              <img src={article.image} alt={article.name} />
              <p>{article.name}</p>
              <div className="select-bubble" />
            </div>
          ))}
        </div>

        <button type="submit" className="btn yellow">Créer le menu</button>
      </form>
    </section>
  );
};

export default CreateMenu;
