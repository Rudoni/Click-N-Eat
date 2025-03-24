const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Définir un port pour l'API Gateway
const GATEWAY_PORT = 8081; // Tu peux choisir un autre port si besoin

// L'URL de ton service Node.js qui tourne sur serveur.js
const SERVICE_URL = "http://account-service:3000";

const body = "<body><header><a href='http://localhost:8081/'>Click'n'Eat</a></header><br>"

// Exemple de route qui redirige vers le service
app.get('/random', async (req, res) => {
    try {
    console.log(`Redirection vers : ${SERVICE_URL}/random`);
    const response = await axios.get(`${SERVICE_URL}/random`);
    res.status(200).send(body+response.data);
} catch (error) {
    console.error('Erreur Axios:', error.message); // Log de l'erreur
    res.status(500).send('Erreur interne du serveur');
}
});

app.post('/login/authenticate', async (req, res) => {
    try {

    console.log("req.body", req.body)
    // Redirection de la requête POST vers le serveur d'authentification (localhost:3000)
    const response = await axios.post(`${SERVICE_URL}/login/authenticate`, req.body);

    // Retourner la réponse du serveur d'authentification au client
    res.status(response.status).json(response.data);
} catch (error) {
    console.error('Erreur Axios:', error.message);
    res.status(500).send('Erreur interne du serveur');
}
});

app.get('/login', async (req, res) => {
    try {
    console.log(`Redirection vers : ${SERVICE_URL}/login`);
    const response = await axios.get(`${SERVICE_URL}/login`);
    res.status(200).send(response.data);
} catch (error) {
    console.error('Erreur Axios:', error.message); // Log de l'erreur
    res.status(500).send('Erreur interne du serveur');
}
});

app.get('/register', async (req, res) => {
    try {
        console.log(`Redirection vers : ${SERVICE_URL}/register`);
        const response = await axios.get(`${SERVICE_URL}/register`);
        res.status(200).send(response.data);
    } catch (error) {
        console.error('Erreur Axios:', error.message); // Log de l'erreur
        res.status(500).send('Erreur interne du serveur');
    }
  });
  
app.post('/register/register', async (req, res) => {
    let response;

    try {
        console.log("req.body", req.body);
        response = await axios.post(`${SERVICE_URL}/register/register`, req.body);
        console.log(response);
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            alert(error.response.data.message);
            res.status(400).json({ message: error.response.data.message });
        } else {
            // Si c'est une autre erreur, on envoie une réponse générique
            console.error('Erreur Axios:', error.message);
            res.status(500).send('Erreur interne du serveur');
        }
    }
});


app.get('/dashboard', async (req, res) => {
    res.send(body + " Vous etez autentifier </body");
});


// Route de test
app.get('/', (req, res) => {
    res.send(body + " <a href='http://localhost:8081/login'> se connecter </a><br>" +
        "<a href='http://localhost:8081/random'>get a number</a><br>"+
        "<a href='http://localhost:8081/register'>s'inscrire</a><br>"+ "</body");
});


// Autres routes pour rediriger les requêtes vers ton service
app.get('/db', async (req, res) => {
    try {
    // Rediriger la requête GET vers le service Node.js pour la route /db
    const response = await axios.get(`${SERVICE_URL}/db`);
    res.status(response.status).send(response.data);
} catch (error) {
    res.status(500).send('Erreur de connexion à la base de données');
}
});

// Lancer le serveur de l'API Gateway
app.listen(GATEWAY_PORT, () => {
    console.log(`API Gateway est en cours d'exécution sur http://localhost:${GATEWAY_PORT}`);
});
