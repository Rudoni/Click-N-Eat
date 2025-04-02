import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {

  useEffect(() => {
    document.title = "Click-N-Eat";
  }, []);

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
