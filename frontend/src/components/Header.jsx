import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

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
        if (response.ok) {
          setUser(data.data);
        } else {
          console.error("Erreur lors de la récupération des infos :", data.message);
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    if (token) {
      fetchUserInfos();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src="/logo_Click_N_eat.png" alt="Click'n'Eat Logo" className="logo" />
      </Link>

      <div className="burger" onClick={() => setOpen(!open)}>☰</div>

      <nav className={`nav ${open ? "open" : ""}`}>
        {!user ? (
          <Link to="/login" className="btn yellow" onClick={() => setOpen(false)}>Connexion</Link>
        ) : (
          <>
            <Link to="/parrainage" className="btn light" onClick={() => setOpen(false)}>Parrainer</Link>

            {/* Partie Client */}
            {user.user_type === 1 && (
              <>
                <Link to="/commander" className="btn light" onClick={() => setOpen(false)}>Commander</Link>
                <Link to="/cart" className="btn light" onClick={() => setOpen(false)}>Panier</Link>
                <Link to="/profile" className="btn light" onClick={() => setOpen(false)}>Profile</Link>
              </>
            )}

            {/* Partie Restaurateur */}
            {user.user_type === 2 && (
              <>
                <Link to="/restaurant-settings" className="btn light" onClick={() => setOpen(false)}>Paramètres Généraux</Link>
                <Link to="/dashboard" className="btn light" onClick={() => setOpen(false)}>Tableau de bord</Link>
                <Link to="/OrderManagement" className="btn light" onClick={() => setOpen(false)}>Les commandes</Link>
                <Link to="/carte" className="btn light" onClick={() => setOpen(false)}>La carte</Link>
              </>
            )}

            {/* Partie Développeur tiers */}
            {user.user_type === 3 && (
              <>
                <Link to="/logs" className="btn light" onClick={() => setOpen(false)}>Logs</Link>
                <Link to="/deploiement" className="btn light" onClick={() => setOpen(false)}>Déploiement de service</Link>
                <Link to="/routes" className="btn light" onClick={() => setOpen(false)}>Routes</Link>
                <Link to="/statistiques" className="btn light" onClick={() => setOpen(false)}>Statistiques</Link>
                <Link to="/gestion-comptes" className="btn light" onClick={() => setOpen(false)}>Gestion des comptes</Link>
              </>
            )}

            {/* Partie Livreur */}
            {user.user_type === 4 && (
              <>
                <Link to="/livraison" className="btn light" onClick={() => setOpen(false)}>Livraison</Link>
                <Link to="/historique-livraisons" className="btn light" onClick={() => setOpen(false)}>Historique des livraisons</Link>
                <Link to="/profile" className="btn light" onClick={() => setOpen(false)}>Profile</Link>
              </>
            )}

            {/* Déconnexion */}
            <button className="btn red" onClick={handleLogout}>Déconnexion</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
