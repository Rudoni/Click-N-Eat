import React, { useState, useEffect } from 'react';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState({
    country: '',
    city: '',
    postal_code: '',
    adress_name: ''
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [profileFeedback, setProfileFeedback] = useState({ message: '', type: '' });
  const [addressFeedback, setAddressFeedback] = useState({ message: '', type: '' });

  const showProfileFeedback = (message, type = 'success') => {
    setProfileFeedback({ message, type });
    setTimeout(() => setProfileFeedback({ message: '', type: '' }), 3000);
  };

  const showAddressFeedback = (message, type = 'success') => {
    setAddressFeedback({ message, type });
    setTimeout(() => setAddressFeedback({ message: '', type: '' }), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserInfos = async () => {
      try {
        const response = await fetch("http://localhost:3100/profile", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({})
        });

        const data = await response.json();
        if (response.ok) {
          setUser({ ...data.data, password: '', password2: '' });
          if (data.data.addresses?.length > 0) {
            setAddress(data.data.addresses[0]);
          }
        } else {
          showProfileFeedback(data.message || "Erreur de chargement.", 'error');
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        showProfileFeedback("Erreur réseau lors du chargement du profil.", 'error');
      }
    };

    fetchUserInfos();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserUpdate = async () => {
    const token = localStorage.getItem("token");

    if (user.password || user.password2) {
      if (user.password !== user.password2) {
        showProfileFeedback("Les mots de passe ne correspondent pas.", 'error');
        return;
      }

      const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/;
      if (!strongPassword.test(user.password)) {
        showProfileFeedback("Mot de passe trop faible.", 'error');
        return;
      }
    }

    try {
      const body = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        ...(user.password && { password: user.password })
      };

      const response = await fetch("http://localhost:3100/profile/update", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      showProfileFeedback(data.message || "Profil mis à jour !");
    } catch (error) {
      console.error("Erreur mise à jour profil :", error);
      showProfileFeedback("Erreur réseau lors de la mise à jour.", 'error');
    }
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = async () => {
    const token = localStorage.getItem("token");
    const endpoint = address.adress_id
      ? `http://localhost:3100/address/update/${address.adress_id}`
      : "http://localhost:3100/address/create";

    try {
      const response = await fetch(endpoint, {
        method: address.adress_id ? "PUT" : "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...address,
          user_id: user.user_id,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(text);
      }

      const data = await response.json();
      showAddressFeedback(data.message || "Adresse enregistrée !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'adresse :", error);
      showAddressFeedback("Erreur enregistrement adresse : " + error.message, 'error');
    }
  };

  if (!user) return <div className="text-center py-8 font-semibold">Chargement...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="section-title">Mon profil</h2>

        <div className="form-section">
          <label className="form-label">Nom</label>
          <input name="last_name" value={user.last_name} onChange={handleChange} className="form-input" />

          <label className="form-label">Prénom</label>
          <input name="first_name" value={user.first_name} onChange={handleChange} className="form-input" />

          <label className="form-label">Email</label>
          <input name="email" value={user.email} onChange={handleChange} className="form-input" />

          <button
            onClick={() => {
              setShowPasswordFields(!showPasswordFields);
              if (showPasswordFields) {
                setUser({ ...user, password: '', password2: '' });
              }
            }}
            className="btn-secondary"
          >
            {showPasswordFields ? "Annuler le changement de mot de passe" : "Changer votre mot de passe"}
          </button>

          {showPasswordFields && (
            <>
              <label className="form-label">Nouveau mot de passe</label>
              <input type="password" name="password" value={user.password} onChange={handleChange} className="form-input" />

              <label className="form-label">Confirmer le mot de passe</label>
              <input type="password" name="password2" value={user.password2} onChange={handleChange} className="form-input" />
            </>
          )}

          <button onClick={handleUserUpdate} className="btn-primary">Mettre à jour</button>

          {profileFeedback.message && (
            <div className={`feedback-message ${profileFeedback.type}`}>
              {profileFeedback.message}
            </div>
          )}
        </div>

        <h3 className="section-title">Adresse</h3>

        <div className="form-section">
          <label className="form-label">Pays</label>
          <input name="country" value={address.country} onChange={handleAddressChange} className="form-input" />

          <label className="form-label">Ville</label>
          <input name="city" value={address.city} onChange={handleAddressChange} className="form-input" />

          <label className="form-label">Code postal</label>
          <input name="postal_code" value={address.postal_code} onChange={handleAddressChange} className="form-input" />

          <label className="form-label">Nom de l’adresse</label>
          <input name="adress_name" value={address.adress_name} onChange={handleAddressChange} className="form-input" />

          <button onClick={handleAddressSubmit} className="btn-primary">
            {address.adress_id ? "Mettre à jour l’adresse" : "Ajouter l’adresse"}
          </button>
          <button
            className="btn-danger"
            onClick={async () => {
              const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
              if (!confirmDelete) return;

              const token = localStorage.getItem("token");
              try {
                const response = await fetch("http://localhost:3100/account/delete", {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                });

                const data = await response.json();
                if (response.ok) {
                  localStorage.removeItem("token");
                  window.location.href = "/"; 
                } else {
                  alert(data.message || "Erreur lors de la suppression du compte.");
                }
              } catch (error) {
                console.error("Erreur suppression compte :", error);
                alert("Erreur réseau.");
              }
            }}
          >
            Supprimer mon compte
          </button>
          {addressFeedback.message && (
            <div className={`feedback-message ${addressFeedback.type}`}>
              {addressFeedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
