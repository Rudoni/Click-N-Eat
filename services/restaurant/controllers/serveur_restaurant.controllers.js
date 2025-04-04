const client = require("../db");

exports.addRestaurant = async (req, res) => {
    const {restaurantName, description, country, city, postalCode, address, mainImage, backgroundImage, data} = req.body;

    try{

    res.status(200).json({ message: "response.data.message"});
    }catch(e){
      res.status(400).json({message: "erreur "+ e.message})
    }

    const idUser = data.user_id;

    const queryInsert = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'INSERT INTO restaurant(restaurant_name, user_id, restaurant_description, image_main_binary, image_back_binary, address_country, address_city, address_postal_code, address_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
        values: [restaurantName, idUser, description, mainImage, backgroundImage, country, city, postalCode, address],
    }
    try {

        let response = await client.query(queryInsert)

        console.log(response)

        if (response.rowCount == 1) {
            return res.json({message: "Création du restaurant "+ restaurantName + " réussie !"});
        } else {
            return res.status(400).json({message: "Probleme lors de la creation du restaurant"});
        }

    } catch(e){
        console.log("error", e)
        if(e.code == 23505){
            return res.status(400).json({message: "Un restaurant existe deja avec ce nom"});
        }
        return res.status(400).json({message: "Erreur interne du serveur."});
    }
};

exports.addArticle = async (req, res) => {
  const { name, type, price, solo, data } = req.body;

  const userId = data.user_id;

  try {
    // recuperation du restaurant_id
    const queryGetRestaurantId = {
      text: "SELECT restaurant_id FROM restaurant WHERE user_id = $1",
      values: [userId],
    };

    const result = await client.query(queryGetRestaurantId);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Aucun restaurant trouvé pour cet utilisateur." });
    }

    const restauID = result.rows[0].restaurant_id;

    // insert l'article
    const queryInsert = {
      text: 'INSERT INTO article(restaurant_id, article_type_id, article_name, price, can_be_sold_individually) VALUES ($1, $2, $3, $4, $5);',
      values: [restauID, type, name, price, solo],
    };

    const insertResult = await client.query(queryInsert);

    if (insertResult.rowCount === 1) {
      return res.status(201).json({ message: "Création de l'article réussie !" });
    } else {
      return res.status(400).json({ message: "Problème lors de la création de l'article." });
    }

  } catch (e) {
    console.error("Erreur lors de l'ajout de l'article :", e);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

exports.deleteRestaurant = async (req, res) => {
    const { user_id } = req.body;
  
    if (!user_id) {
      return res.status(400).json({ message: "ID utilisateur manquant." });
    }
  
    try {
      const query = {
        text: 'DELETE FROM restaurant WHERE user_id = $1',
        values: [user_id],
      };
  
      await client.query(query);
      return res.status(200).json({ message: "Restaurant supprimé avec succès." });
    } catch (error) {
      console.error("Erreur suppression Restaurant :", error);
      return res.status(500).json({ message: "Erreur interne lors de la suppression du Restaurant." });
    }
  };

exports.test_api = (req, res) =>{

  console.log(req.body)
  res   .status(200).json({message: "OK"})
}

exports.getRestaurantInfos = async (req, res) => {

    const {restaurantName, data} = req.body;

    const user_id = data.user_id;

    let query;
    if (restaurantName) {
        query = {
            name: 'get-restau-info-id',
            text: 'SELECT * FROM restaurant WHERE restaurant_name = $1',
            values: [restaurantName],
        };
    } else if (user_id) {
        query = {
            name: 'get-restau-info-nom',
            text: 'SELECT * FROM restaurant WHERE user_id = $1',
            values: [user_id],
        };
    } else {
        return res.status(400).json({ message: "restaurantId ou restaurantName requis" });
    }

    console.log(query)

    try {
        const response = await client.query(query);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: "Restaurant non trouvé" });
        }

        const restaurant = response.rows[0];

        console.log(response)

        return res.status(200).json({ data: restaurant });
    } catch (e) {
        console.error("Erreur lors de la récupération du restaurant:", e);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};