const client = require('../db'); // Importer la connexion MongoDB*
const { ObjectId } = require("mongodb");

const notify = require("../server_order");


const db = client.db('restaurant'); // Choisir la base de données
const collection = db.collection('orders'); // Sélectionner une collection

exports.createOrder = async (req, res) => {
    // const {data, items, resto} = req.body;
    const {data, items} = req.body;

    console.log(data)
    const resto = {restaurantId: 2}
    const clientOrder = {client: data, items: items, resto: resto, state:"en attante"}

    try {
        const result = await collection.insertOne(clientOrder);

        if (result.acknowledged) {
            res.status(200).json({message: 'ID de la commande insérée:'+ result.insertedId});
            notify.notifyNewOrder(2, clientOrder)
        } else {
            console.log('L\'insertion a échoué');
            res.status(400).json({message: "erreur insertion"});
        }
    } catch (err) {
        res.status(400).json({message: "erreur insertion"});
    }
}

exports.viewOrder = async (req,res) =>{
    const {data, resto} = req.body;
    let result;
    console.log(data.user_id)
    switch (data.user_type){
        case 1:
            // result = await collection.find({}).toArray();
            result = await collection.find({ "client.user_id": data.user_id }).toArray();
            break;
        case 2:
            // result = await collection.find({ "resto.resto_id": resto.resto_id }).toArray();
            result = await collection.find({}).toArray();
            break;
        case 3:
            // result = await collection.find({}).toArray();
            result = []
            break;
        case 4:
            // result = await collection.find({}).toArray();
            result = []
            break;
    }
    console.log(result)
    res.status(200).json(result)
}

exports.validerCommandeResto = async (req,res) =>{
    const {data, clientOrder} = req.body;

    const resto = {restaurantId: 2}

    try {

        const { _id, ...fieldsToUpdate } = clientOrder;

        console.log("aaaaaaaaaaaaa", clientOrder)
        fieldsToUpdate.state = "Confirmee"
        const result = await collection.updateOne(
            {  _id: new ObjectId(clientOrder._id) },       // filtre : quel document modifier
            { $set: fieldsToUpdate }  // mise à jour : quels champs modifier
        );


        if (result.acknowledged) {
            clientOrder.state = "Confirmee"
            console.log("accepter")
            res.status(200).json({message: 'commade maj:', result});
            notify.notifyDelivery(clientOrder)
        } else {
            console.log('L\'insertion a échoué');
            res.status(400).json({message: "erreur insertion"});
        }
    } catch (err) {
        console.log("erreur", err)
        res.status(400).json({message: "erreur insertion"});
    }
}

exports.validerCommandeLivreur = async (req,res) =>{
    const {data, clientOrder} = req.body;

    const resto = {restaurantId: 2}

    try {
        const { _id, ...fieldsToUpdate } = clientOrder;

        console.log("aaaaaaaaaaaaa", clientOrder)
        fieldsToUpdate.state = "en cour de livraison"
        const result = await collection.updateOne(
            {  _id: new ObjectId(clientOrder._id) },       // filtre : quel document modifier
            { $set: fieldsToUpdate }  // mise à jour : quels champs modifier
        );


        if (result.acknowledged) {
            clientOrder.state = "en cour de livraison"
            console.log("accepter")
            res.status(200).json({message: 'commade maj:'});
        } else {
            console.log('L\'insertion a échoué');
            res.status(400).json({message: "erreur insertion"});
        }
    } catch (err) {
        console.log("erreur", err)
        res.status(400).json({message: "erreur insertion"});
    }
}

exports.supprimer = async (req, res) =>{
    await collection.deleteMany({});
    res.status(200).json({message : "OK"})
}