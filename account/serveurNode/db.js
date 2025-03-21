// db.js
const { Client } = require('pg');

// Créer une instance de client global
const client = new Client({
    host: 'postgres',  // Le nom de ton service PostgreSQL dans Docker Compose
    port: 5432,        // Le port sur lequel PostgreSQL écoute
    user: 'root',      // L'utilisateur
    password: 'rootpassword', // Le mot de passe
    database: 'postgres' // Le nom de la base de données
});

// Établir la connexion une seule fois au démarrage
client.connect()
    .then(() => console.log('✅ Connexion à PostgreSQL réussie'))
    .catch(err => console.error('❌ Erreur de connexion à PostgreSQL : ', err.message));

module.exports = client;
