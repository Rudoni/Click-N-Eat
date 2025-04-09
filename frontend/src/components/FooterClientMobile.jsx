import React from "react";
import './FooterClientMobile.css';

const FooterClient = () => {
  return (
    <div className="footer-client">
      <a href="/commander">
        <img src="/food.svg" alt="Commander" />
      </a>
      <a href="/cart">
        <img src="/orderr.svg" alt="Panier" />
      </a>
      <a href="/profile">
        <img src="/profile.svg" alt="Profil" />
      </a>
    </div>
  );
};

export default FooterClient;
