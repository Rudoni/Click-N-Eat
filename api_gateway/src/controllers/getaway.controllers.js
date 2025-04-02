const axios = require("axios");

const SERVICE_URL_account = "http://account-service:3001";
const SERVICE_URL_restaurant = "http://restaurant-service:3003";

exports.login = async (req, res) => {
    try {

        console.log("req.body", req.body)
        // Redirection de la requête POST vers le serveur d'authentification (localhost:3000)
        const response = await axios.post(`${SERVICE_URL_account}/login`, req.body);

        console.log("rep", response)
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
        const response = await axios.post(`${SERVICE_URL_account}/register`, req.body);
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


exports.authenticate = async (req, res) => {

    try {
        console.log("req.body", req.body);
        const response = await axios.get(`${SERVICE_URL_account}/authenticate`, req);
        console.log(JSON.stringify(response));
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

exports.addRestaurant = async (req, res) => {
    let response;

    try {
        console.log("req.body", req.body);
        response = await axios.post(`${SERVICE_URL_restaurant}/addRestaurant`, req.body);
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
