const express = require('express');
const app = express();
const port = 3000;

const { Client } = require('pg');

const client = new Client({
    host: 'postgres', // Utiliser le nom du service dans le docker-compose.yml
    port: 5432,       // Le port interne du conteneur PostgreSQL
    user: 'root',     // Utilisateur défini dans l'environnement
    password: 'rootpassword', // Mot de passe défini dans l'environnement
    database: 'postgres', // Base de données par défaut
});

app.get('/', (req, res) => {
    res.send('Hello World from Dockerized Node.js!');
});


app.get('/db', (req, res) => {
    client.connect()
        .then(() => {
            res.send('✅ Connexion réussie à PostgreSQL');
        })
        .catch(err => {
            res.send('❌ Erreur de connexion : ' + err.message);
        })
        .finally(() => {
            client.end();
        });
});

app.get('/random', (req, res) => {
    res.send(Math.random().toString());
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server running on http://0.0.0.0:"+port);
});