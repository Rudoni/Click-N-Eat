import React, { useState, useEffect } from 'react';
import './Contact.css';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Contact";
  }, []);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TO DO POUR LE BACK PLUS TARD
  };

  return (
    <div className="contact-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contactez-nous</h2>

        {!submitted ? (
          <>
            <label>Nom</label>
            <input name="nom" value={formData.nom} onChange={handleChange} required />

            <label>Prénom</label>
            <input name="prenom" value={formData.prenom} onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />

            <button type="submit" className="btn yellow">Envoyer</button>
          </>
        ) : (
          <p className="success-msg">
            ✅ Merci {formData.prenom}, votre message a bien été envoyé !
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
