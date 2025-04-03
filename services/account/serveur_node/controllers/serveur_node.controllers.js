const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require("../db");

exports.register = async (req, res) => {
    const {email, password, password2, nom, prenom, type} = req.body;

    if (password !== password2) {
        return res.status(400).json({message: "Les mots de passe ne correspondent pas."});
    }


    if (!password.match(/(?=.*[A-Z]{1,})(?=.*[^a-zA-Z\s\d]{1,})(?=.*\d{1,})(?=.*[a-z]{1,}).{8,}/)) {
        return res.status(400).json({message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."})
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const query = {
        // give the query a unique name
        name: 'register-user',
        text: 'insert into client (first_name, last_name, email, password_hash, user_type_id) values ($1, $2, $3, $4, $5)',
        values: [prenom, nom, email, hashed_password, type],
    }
    try {


        let response = await client.query(query)

        console.log(response)

        // const result = await client.query(query)
        // console.log(result)
        //
        // await client.end()
        if (response.rowCount == 1) {
            return res.json({message: "Connexion réussie !"});
        } else {
            return res.status(400).json({message: "Problème lors de la creation du compte"});
        }
    }catch (e){
        console.log("error", e)
        if(e.code == 23505){
            return res.status(400).json({message: "Un compte exist deja avec cette adresse mail"});
        }
        return res.status(400).json({message: "Erreur interne du serveur."});
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
    const userId = req.body.user_id;

    if (!userId) {
        return res.status(400).json({ message: "User ID is missing in the request body!" });
    }

    const query = {
        name: 'get-user-profile',
        text: 'SELECT * FROM client WHERE user_id = $1',
        values: [userId],
    };

    try {
        let response = await client.query(query);
        console.log(response);

        if (response.rowCount !== 1) {
            return res.status(400).json({ message: "Aucun compte trouvé avec cet ID" });
        }

        let user = response.rows[0];
        delete user.password_hash;
        delete user.user_id;

        return res.status(200).json({ message: "Récupération des informations réussie", data: user });
    } catch (e) {
        console.log("error", e);
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
    


