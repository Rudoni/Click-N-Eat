const { MongoClient } = require('mongodb');

// Créer une instance du client MongoDB
const client = new MongoClient('mongodb://root:rootpassword@mongodb:27017/?authSource=admin');

// Établir la connexion une seule fois au démarrage
client.connect()
    .then(() => console.log('✅ Connexion à MongoDB réussie'))
    .catch(err => console.error('❌ Erreur de connexion à MongoDB : ', err.message));

// Exporter le client MongoDB pour l'utiliser ailleurs
module.exports = client;