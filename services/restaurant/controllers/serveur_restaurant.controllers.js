const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require("../db");

exports.register = async (req, res) => {
    const {email, password, password2, nom, prenom, role} = req.body;

    if (password !== password2) {
        return res.status(400).json({message: "Les mots de passe ne correspondent pas."});
    }


    if (!password.match(/(?=.*[A-Z]{1,})(?=.*[@]{1,})(?=.*\d{1,})(?=.*[a-z]{1,}).{8,}/)) {
        return res.status(400).json({message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."})
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'insert into client (first_name, last_name, email, password_hash, user_type_id) values ($1, $2, $3, $4, $5)',
        values: [prenom, nom, email, hashed_password, role],
    }

    let response = await client.query(query)

    console.log(response)

    // const result = await client.query(query)
    // console.log(result)
    //
    // await client.end()
    if (response.rowCount == 1) {
        return res.json({message: "Connexion réussie !"});
    } else {
        return res.status(400).json({message: "Probleme lors de la creation du compte"});
    }
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    console.log("login/aut", email, password);

    if (email === "test@email.com" && password === "1234") {
        return res.status(200).json({ message: "Connexion réussie !" });
    } else {
        return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }
};

exports.authenticate = (req, res) => {
    let token = req.headers["authorization"].split("Bearer ")[1];


    jwt.verify(token, process.env.ACCESS_JWT_KEY, (err, decoded) => {
        if(err){
            return res.status(400).json({ message: "Your token is invalid!" });
        }
        return res.status(200).json({ message: "You are authenticated!" });
    });
};