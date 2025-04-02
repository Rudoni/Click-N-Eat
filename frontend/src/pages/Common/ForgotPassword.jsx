import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Mot de passe oublié";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Ici tu feras un appel API plus tard
  };

  return (
    <div className="forgot-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

      <form className="forgot-form" onSubmit={handleSubmit}>
        <h2>Mot de passe oublié ?</h2>

        {!submitted ? (
          <>
            <label htmlFor="email">Entrez votre email</label>
            <input
              type="email"
              id="email"
              placeholder="support@clickneat.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn yellow">
              Envoyer le lien de réinitialisation
            </button>
          </>
        ) : (
          <p className="success-msg">
            ✅ Un lien de réinitialisation a été envoyé à :<br /><strong>{email}</strong>
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
