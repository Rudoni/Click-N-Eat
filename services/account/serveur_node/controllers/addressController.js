const client = require("../db");

exports.createAddress = async (req, res) => {
  const { country, city, postal_code, adress_name, user_id } = req.body;

  if (!country || !city || !postal_code || !adress_name || !user_id) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const query = {
    text: `
      INSERT INTO adress (country, city, postal_code, adress_name, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    values: [country, city, postal_code, adress_name, user_id],
  };

  try {
    const result = await client.query(query);
    return res.status(201).json({ message: "Adresse créée avec succès.", address: result.rows[0] });
  } catch (e) {
    console.error("Erreur création adresse :", e);
    return res.status(500).json({ message: "Erreur interne lors de la création de l'adresse." });
  }
};

exports.updateAddress = async (req, res) => {
  const adress_id = req.params.id;
  const { country, city, postal_code, adress_name } = req.body;

  if (!country || !city || !postal_code || !adress_name) {
    return res.status(400).json({ message: "Tous les champs sont requis pour la mise à jour." });
  }

  const query = {
    text: `
      UPDATE adress
      SET country = $1, city = $2, postal_code = $3, adress_name = $4
      WHERE adress_id = $5
      RETURNING *
    `,
    values: [country, city, postal_code, adress_name, adress_id],
  };

  try {
    const result = await client.query(query);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Adresse non trouvée." });
    }

    return res.status(200).json({ message: "Adresse mise à jour avec succès.", address: result.rows[0] });
  } catch (e) {
    console.error("Erreur mise à jour adresse :", e);
    return res.status(500).json({ message: "Erreur interne lors de la mise à jour de l'adresse." });
  }
};
