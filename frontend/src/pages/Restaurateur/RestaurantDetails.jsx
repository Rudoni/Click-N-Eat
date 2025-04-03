import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RestaurantDetails.css';
import { CartContext } from '../../context/CartContext'; 

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const restaurantsData = [
    {
      id: 1,
      name: "Le Gourmet",
      image: "/le-gourmet.png",
      description: "Cuisine gastronomique française raffinée.",
      address: {
        country: "France",
        city: "Lyon",
        postal_code: "69001",
        name: "5 place Bellecour"
      },
      menus: [
        {
          id: 1,
          name: "Menu Dégustation",
          price: 45,
          articles: [1, 2, 3]
        }
      ],
      articles: [
        { id: 1, name: "Foie gras", type: "Entrée", price: 12, can_be_sold_individually: true },
        { id: 2, name: "Magret de canard", type: "Plat", price: 20, can_be_sold_individually: true },
        { id: 3, name: "Fondant au chocolat", type: "Dessert", price: 8, can_be_sold_individually: true },
        { id: 4, name: "Verre de vin", type: "Boisson", price: 5, can_be_sold_individually: true }
      ]
    },
    {
      id: 2,
      name: "Pizza Express",
      image: "/pizza-express.png",
      description: "Pizzas artisanales cuites au feu de bois.",
      address: {
        country: "France",
        city: "Marseille",
        postal_code: "13001",
        name: "10 rue Paradis"
      },
      menus: [
        {
          id: 2,
          name: "Menu Duo Pizza",
          price: 18,
          articles: [5, 6]
        }
      ],
      articles: [
        { id: 5, name: "Pizza Margherita", type: "Plat", price: 9, can_be_sold_individually: true },
        { id: 6, name: "Soda 33cl", type: "Boisson", price: 2, can_be_sold_individually: true },
        { id: 7, name: "Tiramisu", type: "Dessert", price: 3.5, can_be_sold_individually: true }
      ]
    },
    {
      id: 3,
      name: "Sushi World",
      image: "/sushi-world.png",
      description: "Spécialités japonaises fraîches et préparées minute.",
      address: {
        country: "France",
        city: "Bordeaux",
        postal_code: "33000",
        name: "22 quai Richelieu"
      },
      menus: [
        {
          id: 3,
          name: "Menu Sushi Party",
          price: 22,
          articles: [8, 9, 10]
        }
      ],
      articles: [
        { id: 8, name: "Sushi saumon", type: "Plat", price: 6, can_be_sold_individually: true },
        { id: 9, name: "California avocat crevette", type: "Plat", price: 7, can_be_sold_individually: true },
        { id: 10, name: "Thé vert", type: "Boisson", price: 2, can_be_sold_individually: true },
        { id: 11, name: "Mochi glacé", type: "Dessert", price: 4, can_be_sold_individually: true }
      ]
    },
    {
      id: 4,
      name: "Burger House",
      image: "/burger-house.png",
      description: "Burgers faits maison et frites croustillantes.",
      address: {
        country: "France",
        city: "Toulouse",
        postal_code: "31000",
        name: "7 rue du Burger"
      },
      menus: [
        {
          id: 4,
          name: "Menu Double Cheese",
          price: 14,
          articles: [12, 13]
        }
      ],
      articles: [
        { id: 12, name: "Double Cheese Burger", type: "Plat", price: 10, can_be_sold_individually: true },
        { id: 13, name: "Frites maison", type: "Accompagnement", price: 3, can_be_sold_individually: true },
        { id: 14, name: "Milkshake vanille", type: "Boisson", price: 3, can_be_sold_individually: true }
      ]
    }
  ];

  useEffect(() => {
    document.title = "Détails du restaurant";
    let isMounted = true;

    const resto = restaurantsData.find(r => r.id === parseInt(id));
    if (isMounted && resto) setRestaurant(resto);

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!restaurant) return <div className="loading">Chargement...</div>;

  const getArticlesFromIds = (ids) => {
    return restaurant.articles.filter(article => ids.includes(article.id));
  };

  return (
    <div key={restaurant.id} className="restaurant-details-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

      <div className="restaurant-header">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="main-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default.jpg";
          }}
        />
        <h2 className="restaurant-name">{restaurant.name}</h2>
        <p className="restaurant-description">{restaurant.description}</p>
        <p className="restaurant-address">
          {restaurant.address.name}, {restaurant.address.postal_code} {restaurant.address.city}, {restaurant.address.country}
        </p>
      </div>

      <h3 className="menu-title">Menus disponibles</h3>
      <div className="menu-list">
        {restaurant.menus.map(menu => {
          const menuArticles = getArticlesFromIds(menu.articles);
          return (
            <div key={menu.id} className="menu-card">
              <h4>{menu.name}</h4>
              <p><strong>Prix :</strong> {menu.price} €</p>
              <ul>
                {menuArticles.map(article => (
                  <li key={article.id}>
                    {article.name} - {article.price} € ({article.type})
                  </li>
                ))}
              </ul>
              <button className="order-btn" onClick={() => addToCart(menu, 'menu')}>
                Commander ce menu
              </button>
            </div>
          );
        })}
      </div>

      <h3 className="menu-title">Articles à la carte</h3>
      <div className="menu-list">
        {restaurant.articles
          .filter(article => article.can_be_sold_individually)
          .map(article => (
            <div key={article.id} className="menu-card">
              <h4>{article.name}</h4>
              <p>{article.type} - {article.price} €</p>
              <button className="order-btn" onClick={() => addToCart(article, 'article')}>
                Commander cet article
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
