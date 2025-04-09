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
  const { articleId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Édition de l'article";

    const fetchArticleData = async () => {
      try {
        const response = await fetch("http://localhost:3100/getArticle", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ article_id: articleId }),
        });

        const data = await response.json();
        if (response.ok && data.data) {
          const article = data.data;
        
          setFormData({
            name: article.article_name || '',
            type: article.article_type_id?.toString() || '',
            price: article.price || '',
            solo: article.can_be_sold_individually || false,
          });
        
          // Aperçu image si image présente
          if (article.article_image) {
            const base64 = `data:image/jpeg;base64,${article.article_image}`;
            setImagePreview(base64);
          }
        }
        else {
          setError(data.message || "Erreur lors du chargement de l'article.");
        }
      } catch (error) {
        setError("Erreur lors de la connexion au serveur.");
      }
    };

    fetchArticleData();
  }, [articleId, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3100/article/delete`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article_id: articleId }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Erreur lors de la suppression.");
      }
    } catch (error) {
      setError("Erreur lors de la connexion au serveur.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3100/Article/update`, {
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

          <button type="button" className="btn red" onClick={handleDelete}>Supprimer l'article</button>
          <button type="submit" className="btn yellow">Enregistrer les modifications</button>
        </div>
      </form>
    </section>
  );
};

export default EditArticle;
