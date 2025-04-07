import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Carte.css';
import plusIcon from '../../assets/images/plus-icon.png';

const Carte = () => {
  const navigate = useNavigate();

  const menus = [
    { id: 1, name: 'Menu Gourmand', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Menu Végétarien', image: 'https://via.placeholder.com/150' }
  ];

  const articles = [
    { id: 1, name: 'Burger Classique', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Salade César', image: 'https://via.placeholder.com/150' }
  ];

  return (
    <div className="carte-page">
      <h2 className="title">Gestion de la Carte</h2>
      
      <section>
  <h3>Menus</h3>
  <div className="grid-container">
    {menus.map(menu => (
      <div key={menu.id} className="grid-item">
        <img src={menu.image} alt={menu.name} className="menu-image" />
        <h4>{menu.name}</h4>
        <button className="btn yellow" onClick={() => navigate(`/edit-menu/${menu.id}`)}>Éditer</button>
      </div>
    ))}
    <div className="grid-item add-item" onClick={() => navigate('/add-menu')}>
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
              <img src={article.image} alt={article.name} />
              <h4>{article.name}</h4>
              <button className="btn yellow" onClick={() => navigate(`/editArticle/${article.id}`)}>Éditer</button>            </div>
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