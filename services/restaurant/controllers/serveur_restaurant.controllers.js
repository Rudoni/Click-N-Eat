const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require("../db");

exports.addRestaurant = async (req, res) => {
    const {restaurantName, description, country, city, postalCode, address, mainImage, backgroundImage} = req.body;

    const idUser="";

    const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'INSERT INTO restaurant(restaurant_name, user_id, restaurant_description, image_main_binary, image_back_binary, address_country, address_city, address_postal_code, address_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
        values: [restaurantName, idUser, description, mainImage, backgroundImage, country, city, postalCode, address],
    }

    let response = await client.query(query)

    console.log(response)
    
    if (response.rowCount == 1) {
        return res.json({message: "Création du restaurant "+ restaurantName + " réussie !"});
    } else {
        return res.status(400).json({message: "Probleme lors de la creation du restaurant"});
    }
};
