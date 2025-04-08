const client = require('../db');


const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

exports.getReferralCode = async (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) return res.status(400).json({ message: "user_id manquant" });

  try {
    const result = await client.query(
      'SELECT code FROM referral_codes WHERE user_id = $1',
      [user_id]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({ code: result.rows[0].code });
    } else {
      return res.status(404).json({ message: "Aucun code trouvé pour cet utilisateur" });
    }
  } catch (err) {
    console.error("Erreur récupération code :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.generateReferralCode = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id manquant dans le corps de la requête" });
  }

  try {
    // Vérifie si l’utilisateur a déjà un code
    const existing = await client.query(
      'SELECT code FROM referral_codes WHERE user_id = $1',
      [user_id]
    );

    if (existing.rows.length > 0) {
      return res.status(200).json({ message: "Code déjà existant", code: existing.rows[0].code });
    }

    // Génération et insertion du nouveau code
    let code;
    let isUnique = false;

    while (!isUnique) {
      code = generateCode();
      const check = await client.query('SELECT 1 FROM referral_codes WHERE code = $1', [code]);
      isUnique = check.rows.length === 0;
    }

    await client.query(
      'INSERT INTO referral_codes (user_id, code) VALUES ($1, $2)',
      [user_id, code]
    );

    return res.status(201).json({ message: "Code généré avec succès", code });
  } catch (err) {
    console.error("Erreur lors de la génération du code :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

  

exports.useReferralCode = async (req, res) => {
  const { user_id, code } = req.body;

  console.log("Body reçu dans useReferralCode:", { user_id, code });

  if (!user_id || !code) {
    return res.status(400).json({ message: "user_id ou code manquant" });
  }

  try {
    // 1. Vérifie que le code existe et récupère le parrain
    const result = await client.query(
      'SELECT user_id FROM referral_codes WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Code invalide" });
    }

    const referrer_id = result.rows[0].user_id;

    if (referrer_id === user_id) {
      return res.status(400).json({ message: "Vous ne pouvez pas utiliser votre propre code" });
    }

    // 2. Vérifie si l'utilisateur a déjà été parrainé
    const alreadyUsed = await client.query(
      'SELECT 1 FROM referrals WHERE referred_id = $1',
      [user_id]
    );

    if (alreadyUsed.rows.length > 0) {
      return res.status(400).json({ message: "Code déjà utilisé par cet utilisateur" });
    }

    // 3. Insère le parrainage
    await client.query(
      'INSERT INTO referrals (referrer_id, referred_id) VALUES ($1, $2)',
      [referrer_id, user_id]
    );

    return res.status(201).json({ message: "Code utilisé avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'utilisation du code :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


exports.getReferredUsers = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await client.query(
      `SELECT c.first_name, c.last_name
       FROM referrals r
       JOIN client c ON r.referred_id = c.user_id
       WHERE r.referrer_id = $1`,
      [user_id]
    );

    return res.status(200).json({ referredUsers: result.rows });
  } catch (err) {
    console.error("Erreur récupération des filleuls :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


  