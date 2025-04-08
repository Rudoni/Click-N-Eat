const client = require('../db'); // Importer la connexion MongoDB

const db = client.db('restaurant'); // Choisir la base de données
const collection = db.collection('orders'); // Sélectionner une collection

exports.createOrder = async (req, res) => {
    const {data, items} = req.body;

    console.log(data)
    const clinetOrder = {clinet: data, items: items}

    try {
        const result = await collection.insertOne(clinetOrder);

        if (result.acknowledged) {
            res.status(200).json({message: 'ID de la commande insérée:'+ result.insertedId});
        } else {
            console.log('L\'insertion a échoué');
            res.status(400).json({message: "erreur insertion"});
        }
    } catch (err) {
        res.status(400).json({message: "erreur insertion"});
    }
}

exports.viewOrder = async (req,res) =>{
    const {data} = req.body;
    switch (data.user_type){
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
    result = await collection.find({}).toArray();
    console.log(result)
    res.status(200).json(result)
}