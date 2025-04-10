import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Accès refusé</h1>
      <p style={styles.text}>
        Vous n’avez pas les droits nécessaires pour accéder à cette page.
      </p>
      <button onClick={() => navigate("/")} style={styles.button}>
        Retour à l'accueil
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "3rem",
    color: "#FF3333",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#FFCC00",
    color: "black",
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Unauthorized;
