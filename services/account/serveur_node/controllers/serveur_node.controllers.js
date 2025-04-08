const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require("../db");


exports.register = async (req, res) => {
  const { email, password, password2, nom, prenom, type } = req.body;

  // Vérification des mots de passe
  if (password !== password2) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
  }

  // Vérification de la complexité du mot de passe
  if (!password.match(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/)) {
    return res.status(400).json({ message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial." });
  }

  try {
    // Hash du mot de passe
    const hashed_password = await bcrypt.hash(password, 10);

    // Requête d'insertion dans la base
    const query = {
      name: 'register-user',
      text: 'INSERT INTO client (first_name, last_name, email, password_hash, user_type_id) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
      values: [prenom, nom, email, hashed_password, type],
    };

    const response = await client.query(query);

    console.log("📦 Nouvel utilisateur créé :", response.rows[0]);

    if (response.rowCount === 1) {
      const user_id = response.rows[0].user_id;
      return res.status(200).json({
        message: "Connexion réussie !",
        user_id
      });
    } else {
      return res.status(400).json({ message: "Problème lors de la création du compte" });
    }

  } catch (e) {
    console.log("Erreur register:", e);
    if (e.code === '23505') {
      return res.status(400).json({ message: "Un compte existe déjà avec cette adresse mail" });
    }
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};


exports.login = async (req, res) => {

    const {email, password} = req.body;

    const query = {

        name: 'login-user',
        text: 'select * from client where email=($1)',
        values: [email],
    }
    try {

        let response = await client.query(query)
        if(response.rowCount != 1){
            return res.status(400).json({message: "Pas de compte avec cette adresse"});
        }
        let hashed_password = response.rows[0].password_hash;
        let user_id = response.rows[0].user_id;
        let type = response.rows[0].user_type_id;

        const accessToken = jwt.sign({ user_id: user_id, user_type:type, exp: Math.floor(Date.now() / 1000) + 1200 }, "CESI2025@Fisa");

        console.log(response)

        if(bcrypt.compare(password, hashed_password)) {
            return res.status(200).json({message : "Connection réussie", authorization: accessToken});
        } else {
            return res.status(400).json({message: "Email ou mot de passe incorrect."});

        }
    } catch (e) {
        console.log("error", e)
        return res.status(400).json({message: "Erreur interne du serveur."});
    }

};

exports.authenticate = (req, res) => {

    if (!req.headers["authorization"]) {
        return res.status(400).json({ message: "Authorization header is missing!" });
    }

    const authHeader = req.headers["authorization"];
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "format de token invalide" });
    }

    console.log("token", req.headers["authorization"])
    let token = req.headers["authorization"].split("Bearer ")[1];

    jwt.verify(token, "CESI2025@Fisa", (err, decoded) => {
        console.log(decoded);
        if(err){
            console.log(err);
            return res.status(400).json({ message: "Your token is invalid!" });
        }
        return res.status(200).json({ message: "You are authenticated!", data: decoded });
    });
};


exports.profile = async (req, res) => {
    const { data } = req.body;
    const userId = data?.user_id;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing in the request body!" });
    }
  
    try {
      // Requête pour récupérer les infos du client
      const userQuery = {
        name: 'get-user-profile',
        text: 'SELECT * FROM client WHERE user_id = $1',
        values: [userId],
      };
  
      const userResponse = await client.query(userQuery);
  
      if (userResponse.rowCount !== 1) {
        return res.status(400).json({ message: "Aucun compte trouvé avec cet ID" });
      }
  
      let user = userResponse.rows[0];
      delete user.password_hash;
  
      // Requête pour récupérer les adresses liées à ce user
      const addressQuery = {
        name: 'get-user-addresses',
        text: 'SELECT * FROM adress WHERE user_id = $1',
        values: [userId],
      };
  
      const addressResponse = await client.query(addressQuery);
      const addresses = addressResponse.rows;
  
      // Retour combiné
      return res.status(200).json({
        message: "Récupération des informations réussie",
        data: {
          ...user,
          addresses: addresses
        }
      });
  
    } catch (e) {
      console.error("Erreur dans la récupération du profil :", e);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
};

exports.updateProfile = async (req, res) => {
  const { user_id, first_name, last_name, email, password } = req.body;

  if (!user_id || !first_name || !last_name || !email) {
    return res.status(400).json({ message: "Champs requis manquants." });
  }

  try {
    // Si mot de passe fourni, on le hash
    let query;
    if (password) {
      if (!password.match(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/)) {
        return res.status(400).json({ message: "Mot de passe non sécurisé." });
      }

      const hash = await bcrypt.hash(password, 10);
      query = {
        text: `UPDATE client SET first_name=$1, last_name=$2, email=$3, password_hash=$4 WHERE user_id=$5`,
        values: [first_name, last_name, email, hash, user_id]
      };
    } else {
      query = {
        text: `UPDATE client SET first_name=$1, last_name=$2, email=$3 WHERE user_id=$4`,
        values: [first_name, last_name, email, user_id]
      };
    }

    const result = await client.query(query);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ message: "Profil mis à jour avec succès." });
  } catch (e) {
    console.error("Erreur updateProfile :", e);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};


exports.deleteAccount = async (req, res) => {
    const { user_id } = req.body;
  
    if (!user_id) {
      return res.status(400).json({ message: "ID utilisateur manquant." });
    }
  
    try {
      const query = {
        text: 'DELETE FROM client WHERE user_id = $1',
        values: [user_id],
      };
  
      await client.query(query);
      return res.status(200).json({ message: "Compte supprimé avec succès." });
    } catch (error) {
      console.error("Erreur suppression compte :", error);
      return res.status(500).json({ message: "Erreur interne lors de la suppression du compte." });
    }
  };
  
  
    


