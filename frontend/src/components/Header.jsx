import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token")

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
    <header className="header">
      <Link to="/" className="logo-link">
        <img src="/logo_Click_N_eat.png" alt="Click'n'Eat Logo" className="logo" />
      </Link>

      <div className="burger" onClick={() => setOpen(!open)}>☰</div>

      <nav className={`nav ${open ? "open" : ""}`}>
        <Link to="/contact" className="link" onClick={() => setOpen(false)}>Contact</Link>
        <Link to="/login" className="btn yellow" onClick={() => setOpen(false)}>Déconnexion</Link>

        {!user ? (
          <Link to="/login" className="btn yellow" onClick={() => setOpen(false)}>Connexion</Link>
        ) : (
          <>
            {/* Partie Client */
            console.log("user", user)}
            {user.user_type == 1 && (
              <>
              <Link to="/commander" className="btn light" onClick={() => setOpen(false)}>Commander</Link>
              <Link to="/cart" className="btn light" onClick={() => setOpen(false)}>Panier</Link>
              </>
            )}

            {/* Partie Restaurateur */}
            {user.user_type == 2 && (
              <>
                <Link to="/parametres" className="btn light" onClick={() => setOpen(false)}>Paramètres Généraux</Link>
                <Link to="/tableau-de-bord" className="btn light" onClick={() => setOpen(false)}>Tableau de bord</Link>
                <Link to="/commandes" className="btn light" onClick={() => setOpen(false)}>Les commandes</Link>
                <Link to="/carte" className="btn light" onClick={() => setOpen(false)}>La carte</Link>
              </>
            )}

            {/* Partie Développeur tiers */}
            {user.user_type == 3 && (
              <>
                <Link to="/logs" className="btn light" onClick={() => setOpen(false)}>Logs</Link>
                <Link to="/deploiement" className="btn light" onClick={() => setOpen(false)}>Déploiement de service</Link>
                <Link to="/routes" className="btn light" onClick={() => setOpen(false)}>Routes</Link>
                <Link to="/statistiques" className="btn light" onClick={() => setOpen(false)}>Statistiques</Link>
                <Link to="/gestion-comptes" className="btn light" onClick={() => setOpen(false)}>Gestion des comptes</Link>
              </>
            )}

            {/* Partie Livreur */}
            {user.user_type == 4 && (
              <Link to="/livraisons" className="btn light" onClick={() => setOpen(false)}>Mes livraisons</Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;