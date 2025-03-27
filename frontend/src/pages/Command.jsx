import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Command.css';

//Ici il faut qu'on récuperer la liste de tous les restaurant en BDD et qu'on les ajoute dans la liste "restaurants"
const restaurants = [
  { id: 1, name: 'Le Gourmet', image: 'https://www.shutterstock.com/image-photo/plovdiv-bulgaria-july-30-2019-260nw-2552321417.jpg' },
  { id: 2, name: 'Pizza Express', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3V_QmFRmB8xPPSOmShms0tMMMAH1G9i7pg&s' },
  { id: 3, name: 'Sushi World', image: 'https://oaformation.com/wp-content/uploads/2019/10/Besoins-clients-en-restauration.jpg' },
  { id: 4, name: 'Burger House', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D' }
];

const Command = () => {
  const navigate = useNavigate();

  //Partie pour rediriger vers la carte du restaurant
  const handleNavigate = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="restaurant-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>
      <h2 className="title">Restaurants disponibles</h2>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="restaurant-card" 
            onClick={() => handleNavigate(restaurant.id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
            <h3 className="restaurant-name">{restaurant.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Command;
