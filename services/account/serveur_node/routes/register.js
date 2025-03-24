// routes/register.js
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();

// Liste des rôles valides correspondant aux noms de tables
const validRoles = ['client', 'restaurant', 'delivery', 'commecial', 'technician', 'devloper'];

router.post('/', async (req, res) => {
  const { first_name, last_name, email, password, type } = req.body;

  if (!validRoles.includes(type)) {
    return res.status(400).json({ error: 'Rôle invalide.' });
  }

  try {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO ${type} (first_name, last_name, email, password_hash, type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id, email, type;
    `;
    const values = [first_name, last_name, email, hashedPassword, type];

    const result = await pool.query(insertQuery, values);

    res.status(201).json({
      message: 'Compte créé avec succès.',
      user: result.rows[0],
    });
  } catch (err) {
    console.error('Erreur lors de la création du compte :', err);
    res.status(500).json({ error: 'Erreur serveur ou email déjà utilisé.' });
  }
});

module.exports = router;
