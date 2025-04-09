import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Click-N-Eat";

    const token = localStorage.getItem("token");
    const userType = parseInt(localStorage.getItem("user_type"));

    if (token && userType === 4) {
      navigate("/livraison");
    }
  }, [navigate]);

  const backgroundStyle = {
    backgroundImage: 'url("/Landing.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  return (
    <div style={backgroundStyle}>
      <div className="home-overlay" />
      <div className="home-content">
        <h1>Click'N’Eat</h1>
        <p>Click. Eat. Repeat.</p>
        <Link to="/commander" className="cta-button">J’ai faim</Link>
      </div>
    </div>
  );
};

export default Home;
