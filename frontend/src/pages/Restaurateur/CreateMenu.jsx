import React, { useEffect, useState } from 'react';
import './CreateMenu.css';
import { useNavigate } from 'react-router-dom';

const CreateMenu = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
    selectedArticles: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3100/getListeArticleMenuRestaurant", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();
        if (response.ok) {
          setArticles(data.data.articles || []);
        } else {
          setError(data.message || "Erreur lors du chargement des articles.");
        }
      } catch (e) {
        console.error(e);
        setError("Erreur de connexion au serveur.");
      }
    };

    fetchArticles();
  }, [token]);

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

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // enlever "data:image/jpeg;base64,"
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const decodeToken = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = decodeToken(token);
      if (!userData || !userData.user_id) {
        setError("Utilisateur non identifié.");
        return;
      }

      const base64Image = formData.image
        ? await convertImageToBase64(formData.image)
        : null;

      const bodyData = {
        name: formData.name,
        price: formData.price,
        image: base64Image,
        selectedArticles: formData.selectedArticles,
      };

      console.log("JSON envoyé :", JSON.stringify(bodyData, null, 2));

      const response = await fetch("http://localhost:3100/addMenu", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/carte"); // ou la route de ton choix
      } else {
        setError(data.message || "Erreur lors de la création du menu.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création du menu.");
    }
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

        {error && <p className="error-message">{error}</p>}

        <div className="articles-grid">
          {articles.map((article) => (
            <div
              key={article.id}
              className={`article-card ${formData.selectedArticles.includes(article.id) ? 'selected' : ''}`}
              onClick={() => toggleArticleSelection(article.id)}
            >
              <img src={`data:image/jpeg;base64,${article.image}`} alt={article.nom} />
              <p>{article.nom}</p>
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
