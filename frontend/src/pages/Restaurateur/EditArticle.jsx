import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditArticle.css';

const EditArticle = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    solo: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { articleId } = useParams(); // récup l'ID depuis l'URL

  useEffect(() => {
    document.title = "Édition de l'article";
    //fetchArticleData();
  }, []);

  //FONCTION A MODIF POUR RECUP LES INFOS BASE SUR L'ID
  /*
  const fetchArticleData = async () => {
    try {
      const response = await fetch(`http://localhost:3100/getArticle/${articleId}`);
      const data = await response.json();
      if (response.ok && data.article) {
        setFormData({
          name: data.article.name || '',
          type: data.article.type || '',
          price: data.article.price || '',
          solo: data.article.solo || false,
        });

        if (data.article.image) {
          const base64 = `data:image/jpeg;base64,${data.article.image}`;
          setImagePreview(base64);
        }

      } else {
        setError(data.message || "Erreur lors du chargement de l'article.");
      }
    } catch (err) {
      setError("Erreur serveur.");
      console.error(err);
    }
  };
  */

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

    const token = localStorage.getItem("token");

    //TODO >
    try {
      const response = await fetch(`http://localhost:3100/updateArticle/${articleId}`, {
        method: "PUT",
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
        setError(data.message || "Erreur lors de la mise à jour.");
      }
    } catch (error) {
      setError("Erreur lors de la connexion au serveur.");
    }
  };

  return (
    <section className="add-article-page">
      <h2>Modifier un article</h2>
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
              <option value="3">Entrée</option>
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn yellow">Enregistrer les modifications</button>
        </div>
      </form>
    </section>
  );
};

export default EditArticle;
