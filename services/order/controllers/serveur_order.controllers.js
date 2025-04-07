const client = require('../db'); // Importer la connexion MongoDB

const db = client.db('restaurant'); // Choisir la base de données
const collection = db.collection('orders'); // Sélectionner une collection

exports.createOrder= async (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    orderData = {a:"a", b:"bbbbbbbbbbbbb"}
    try {
        // Insérer un document et obtenir le résultat
        const result = await collection.insertOne(orderData);

        if (result.acknowledged) {
            console.log('✅ Commande ajoutée avec succès');
            console.log('ID de la commande insérée:', result.insertedId);
        } else {
            console.log('❌ L\'insertion a échoué');
        }
    } catch (err) {
        console.error('❌ Erreur lors de l\'ajout de la commande :', err);
    }
    res.status(200).json({message: "aaaaaaaaaa"});
}
