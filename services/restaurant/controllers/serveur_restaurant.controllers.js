const client = require("../db");

const SECRET_KEY = "votre_cle_secrete"; // À récupérer dans le fichier .env

exports.addRestaurant = async (req, res) => {
    const {restaurantName, description, country, city, postalCode, address, mainImage, backgroundImage} = req.body;

    const token = req.headers.authorization;

    const response = await fetch("http://localhost:3100/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

    console.log(response);

    // const queryInsert = {
    //     // give the query a unique name
    //     name: 'fetch-user',
    //     text: 'INSERT INTO restaurant(restaurant_name, user_id, restaurant_description, image_main_binary, image_back_binary, address_country, address_city, address_postal_code, address_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
    //     values: [restaurantName, idUser, description, mainImage, backgroundImage, country, city, postalCode, address],
    // }
    // try {

    //     let response = await client.query(queryInsert)

    //     console.log(response)

    //     if (response.rowCount == 1) {
    //         return res.json({message: "Création du restaurant "+ restaurantName + " réussie !"});
    //     } else {
    //         return res.status(400).json({message: "Probleme lors de la creation du restaurant"});
    //     }

    // } catch(e){
    //     console.log("error", e)
    //     if(e.code == 23505){
    //         return res.status(400).json({message: "Un restaurant existe deja avec ce nom"});
    //     }
    //     return res.status(400).json({message: "Erreur interne du serveur."});
    // }
};
