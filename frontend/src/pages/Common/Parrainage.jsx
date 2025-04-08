import React, { useState, useEffect } from 'react';
import './Parrainage.css';

const Parrainage = () => {
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [referredUsers, setReferredUsers] = useState([]);
  const token = localStorage.getItem("token");

  // Récupère automatiquement le code de parrainage
  const fetchReferralData = async () => {
    try {
      const resCode = await fetch("http://localhost:3100/referral-code", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const codeData = await resCode.json();

      if (resCode.ok) {
        setReferralCode(codeData.code);
        setError('');
      } else {
        setReferralCode('');
        setError(codeData.message || "Aucun code généré");
      }

      // Récupère les filleuls
      const resList = await fetch("http://localhost:3100/referred-users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

      const listData = await resList.json();
      if (resList.ok) {
        setReferredUsers(listData.referredUsers || []);
      }

    } catch (err) {
      console.error("Erreur réseau :", err);
      setError("Erreur lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  // Génère un nouveau code
  const generateCode = async () => {
    try {
      const response = await fetch("http://localhost:3100/referral-code/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      if (response.ok) {
        setReferralCode(data.code);
        setError('');
      } else {
        setError(data.message || "Erreur lors de la génération du code");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setError("Erreur lors de la génération du code.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetchReferralData();
  }, []);

  return (
    <div className="referral-container">
      <h2>Mon code de parrainage</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          {referralCode ? (
            <div className="referral-box">
              <span className="referral-code">{referralCode}</span>
              <button className="btn-copy" onClick={handleCopy}>
                {copied ? 'Copié !' : 'Copier'}
              </button>
            </div>
          ) : (
            <div className="referral-box">
              <p>Aucun code généré</p>
              <button className="btn-generate" onClick={generateCode}>Générer mon code</button>
            </div>
          )}

          <p className="referral-desc">
            Partage ce code avec tes amis ! Lorsqu’ils s’inscrivent avec, vous recevez tous les deux un bonus. 💰
          </p>

          {referredUsers.length > 0 && (
            <div className="referred-list">
              <h3>Mes filleuls</h3>
              <ul>
                {referredUsers.map((u, idx) => (
                  <li key={idx}>{u.first_name} {u.last_name}</li>
                ))}
              </ul>
            </div>
          )}

          {error && <p className="referral-error">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Parrainage;
