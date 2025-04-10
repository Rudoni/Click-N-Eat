import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carte.css';
import plusIcon from '../../assets/images/plus-icon.png';

const Carte = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {

  const userType = localStorage.getItem("user_type");

  if (userType !== "2") {
    navigate("/unauthorized");
    return;
  }
  if (!token) {
    navigate("/unauthorized");
    return;
  }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3100/getListeArticleMenuRestaurant", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // corps vide
        });

        const data = await response.json();
        if (response.ok) {
          setMenus(data.data.menus || []);
          setArticles(data.data.articles || []);
        } else {
          setError(data.message || "Erreur lors du chargement.");
        }
      } catch (e) {
        console.error(e);
        setError("Erreur de connexion au serveur.");
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="carte-page">
      <h2 className="title">Gestion de la Carte</h2>

      {error && <p className="error-message">{error}</p>}

      <section>
        <h3>Menus</h3>
        <div className="grid-container">
          {menus.map(menu => (
            <div key={menu.id} className="grid-item">
              <img src={`data:image/jpeg;base64,${menu.image}`} alt={menu.nom} className="menu-image" />
              <h4>{menu.nom}</h4>
              <button className="btn yellow" onClick={() => navigate(`/edit-menu/${menu.id}`)}>Éditer</button>
            </div>
          ))}
          <div className="grid-item add-item" onClick={() => navigate('/createMenu')}>
            <img src={plusIcon} alt="Ajouter" className="menu-image" />
            <h4>Ajouter un menu</h4>
          </div>
        </div>
      </section>

      <section>
        <h3>Articles</h3>
        <div className="grid-container">
          {articles.map(article => (
            <div key={article.id} className="grid-item">
              <img src={`data:image/jpeg;base64,${article.image}`} alt={article.nom} />
              <h4>{article.nom}</h4>
              <button className="btn yellow" onClick={() => navigate(`/editArticle/${article.id}`)}>Éditer</button>
            </div>
          ))}
          <div className="grid-item add-item" onClick={() => navigate('/create-article')}>
            <img src={plusIcon} alt="Ajouter" />
            <h4>Ajouter un article</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carte;
