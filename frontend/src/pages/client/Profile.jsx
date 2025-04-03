// src/pages/client/Profile.jsx

import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // Tu pourras l'utiliser pour une modal ou autre

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserInfos = async () => {
      try {
        const response = await fetch("http://localhost:3100/authenticate", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Données récupérées :", data);

        if (response.ok) {
          setUser(data.data);
        } else {
          console.error("Erreur lors de la récupération des infos :", data.message);
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    fetchUserInfos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Mon profil</h2>
      <div className="bg-white rounded shadow-md p-6">
        <img
          src={'/default-avatar.png'}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover mb-4"
        />
        <p><strong>Nom :</strong> {user?.name || 'Non disponible'}</p>
        <p><strong>Email :</strong> {user?.email || 'Non disponible'}</p>
      </div>
    </div>
  );
}
