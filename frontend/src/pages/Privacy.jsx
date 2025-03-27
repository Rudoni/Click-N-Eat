import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Politique de Confidentialité";
  }, []);

  return (
    <div className="privacy-page">
      <style>
        {`
          .privacy-page {
            padding: 2rem;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            min-height: 100vh;
            color: #333;
          }

          .back-arrow {
            font-size: 1.5rem;
            color: #FFCC00;
            cursor: pointer;
            margin-bottom: 1rem;
          }

          h1, h2 {
            text-align: center;
            color: #2d8700;
          }

          p {
            font-size: 1.1rem;
            line-height: 1.6;
          }

          ul {
            list-style-type: disc;
            padding-left: 20px;
          }

          section {
            margin-bottom: 2rem;
          }

          .privacy-page strong {
            font-weight: bold;
          }
        `}
      </style>

      <div className="back-arrow" onClick={() => navigate(-1)}>← Retour</div>
      <h1>Politique de Confidentialité</h1>
      <p>Dernière mise à jour : 27/03/2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>Nous attachons une grande importance à la protection de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.</p>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <p>Nous collectons les types de données suivants : </p>
        <ul>
          <li>Informations d’identification (nom, prénom, email, etc.)</li>
          <li>Informations de commande et préférences</li>
          <li>Données de navigation (adresse IP, cookies, etc.)</li>
        </ul>
      </section>

      <section>
        <h2>3. Utilisation des données</h2>
        <p>Vos données sont utilisées pour :</p>
        <ul>
          <li>Gérer vos commandes et livraisons</li>
          <li>Améliorer nos services et personnaliser votre expérience</li>
          <li>Assurer la sécurité de notre plateforme</li>
        </ul>
      </section>

      <section>
        <h2>4. Partage des données</h2>
        <p>Nous ne vendons pas vos données. Elles peuvent être partagées avec :</p>
        <ul>
          <li>Nos prestataires de services (livreurs, hébergement, etc.)</li>
          <li>Les autorités légales en cas d'obligation</li>
        </ul>
      </section>

      <section>
        <h2>5. Sécurité des données</h2>
        <p>Nous mettons en place des mesures de sécurité pour protéger vos informations contre tout accès non autorisé.</p>
      </section>

      <section>
        <h2>6. Vos droits</h2>
        <p>Conformément aux lois en vigueur, vous avez le droit de :</p>
        <ul>
          <li>Accéder à vos données</li>
          <li>Les rectifier ou les supprimer</li>
          <li>Vous opposer à leur traitement</li>
        </ul>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>Pour toute question sur cette politique, vous pouvez nous contacter à <strong>contact@click-n-eat.com</strong>.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
