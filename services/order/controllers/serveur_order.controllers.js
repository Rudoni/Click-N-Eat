const client = require('../db'); // Importer la connexion MongoDB

const db = client.db('restaurant'); // Choisir la base de données
const collection = db.collection('orders'); // Sélectionner une collection

exports.createOrder= async (req, res) => {
    orderData = {a:"a"}
    try {
        const result = await collection.insertOne(orderData);
        console.log('📝 Commande ajoutée:', result);
        res.status(200).json({ message: "OK"});

    } catch (err) {
        console.error('❌ Erreur lors de l\'ajout de la commande :', err);
        res.status(400).json({ message: "NOK"});

    }
}