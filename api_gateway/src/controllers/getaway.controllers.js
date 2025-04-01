const axios = require("axios");

const SERVICE_URL_account = "http://account-service:3001";

exports.login = async (req, res) => {
    try {

        console.log("req.body", req.body)
        // Redirection de la requête POST vers le serveur d'authentification (localhost:3000)
        const response = await axios.post(`${SERVICE_URL_account}/login`, req.body);

        // Retourner la réponse du serveur d'authentification au client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.register = async (req, res) => {
    let response;

    try {
        console.log("req.body", req.body);
        response = await axios.post(`${SERVICE_URL_account}/register`, req.body);
        console.log(response);
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            res.status(400).json({ message: error.response.data.message });
        } else {
            // Si c'est une autre erreur, on envoie une réponse générique
            console.error('Erreur Axios:', error.message);
            res.status(500).send('Erreur interne du serveur');
        }
    }
};

//Fonction pou obtenir les informations sur un compte
exports.getUserInfos = (req, res) => {
    res.status(200).json({ id : 2, type: 3});
}