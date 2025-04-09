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

  exports.updateRestaurant = async (req, res) => {
    const {restaurantName, description, country, city, postalCode, address, mainImage, backgroundImage, data} = req.body;
    
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

      let query = {
        text: 'UPDATE restaurant SET restaurant_name = $1, user_id = $2, restaurant_description = $3, image_main_binary = $4, image_back_binary = $5, address_country = $6, address_city = $7, address_postal_code = $8, address_name = $9 WHERE restaurant_id = $10',
        values: [restaurantName, userId, description, mainImage, backgroundImage, country, city, postalCode, address, restauID],
      };

      const result1 = await client.query(query);

      if (result1.rowCount === 0) {
        return res.status(404).json({ message: "Restaurant non trouvé." });
      }
  
      res.status(200).json({ message: "Restaurant mis à jour avec succès." });
    } catch (e) {
      console.error("Erreur updateRestaurant :", e);
      res.status(500).json({ message: "Erreur interne du serveur."    });
    }    
    
  };

  exports.deleteArticle = async (req, res) => {
    const { article_id } = req.body;
  
    if (!article_id) {
      return res.status(400).json({ message: "ID article manquant." });
    }
  
    try {
      const query = {
        text: 'DELETE FROM article WHERE article_id = $1',
        values: [article_id],
      };
  
      await client.query(query);
      return res.status(200).json({ message: "Article supprimé avec succès." });
    } catch (error) {
      console.error("Erreur suppression Article :", error);
      return res.status(500).json({ message: "Erreur interne lors de la suppression de l'Article." });
    }
  };

exports.test_api = (req, res) =>{

  console.log(req.body)
  res.status(200).json({message: "OK"})
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

exports.getArticle = async (req, res) => {
  const { article_id } = req.body;

  if (!article_id) {
      return res.status(400).json({ message: "article_id requis" });
  }

  const query = {
      name: 'get-article-by-id',
      text: 'SELECT * FROM article WHERE article_id = $1',
      values: [article_id],
  };

  try {
      const response = await client.query(query);

      if (response.rows.length === 0) {
          return res.status(404).json({ message: "Article non trouvé" });
      }

      const article = response.rows[0];

      return res.status(200).json({ data: article });
  } catch (e) {
      console.error("Erreur lors de la récupération de l'article:", e);
      return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.getMenu = async (req, res) => {
  const { menu_id } = req.body;

  if (!menu_id) {
      return res.status(400).json({ message: "menu_id requis" });
  }

  try {
      // Récupérer les infos du menu
      const menuQuery = {
          name: 'get-menu-by-id',
          text: 'SELECT * FROM menu WHERE menu_id = $1',
          values: [menu_id],
      };

      const menuResult = await client.query(menuQuery);

      if (menuResult.rows.length === 0) {
          return res.status(404).json({ message: "Menu non trouvé" });
      }

      const menu = menuResult.rows[0];

      // Récupérer les articles liés au menu
      const articlesQuery = {
          name: 'get-articles-from-menu',
          text: `
              SELECT a.*
              FROM list_article_menu lam
              JOIN article a ON lam.article_id = a.article_id
              WHERE lam.menu_id = $1
          `,
          values: [menu_id],
      };

      const articlesResult = await client.query(articlesQuery);
      const articles = articlesResult.rows;

      return res.status(200).json({
          data: {
              menu,
              articles
          }
      });

  } catch (e) {
      console.error("Erreur lors de la récupération du menu et des articles:", e);
      return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.getListeArticleMenuRestaurant = async (req, res) => {
  const { data } = req.body;
  const user_id = data.user_id

  if (!user_id) {
      return res.status(400).json({ message: "user_id requis" });
  }

  try {
      // 1. Chercher restaurant_id depuis user_id
      const restauQuery = {
          name: 'get-restaurant-id-by-user',
          text: 'SELECT restaurant_id FROM restaurant WHERE user_id = $1',
          values: [user_id],
      };

      const restauResult = await client.query(restauQuery);

      if (restauResult.rows.length === 0) {
          return res.status(404).json({ message: "Aucun restaurant associé à cet utilisateur" });
      }

      const restaurant_id = restauResult.rows[0].restaurant_id;

      // 2. Requête pour les articles
      const articlesQuery = {
          name: 'get-articles-by-restaurant',
          text: `
              SELECT article_id AS id, article_name AS nom, article_image AS image, can_be_sold_individually as venduSolo
              FROM article
              WHERE restaurant_id = $1
          `,
          values: [restaurant_id],
      };

      // 3. Requête pour les menus
      const menusQuery = {
          name: 'get-menus-by-restaurant',
          text: `
              SELECT menu_id AS id, menu_name AS nom, menu_image AS image
              FROM menu
              WHERE restaurant_id = $1
          `,
          values: [restaurant_id],
      };

      const [articlesResult, menusResult] = await Promise.all([
          client.query(articlesQuery),
          client.query(menusQuery),
      ]);

      const articles = articlesResult.rows;
      const menus = menusResult.rows;

      return res.status(200).json({
          data: {
              articles,
              menus
          }
      });

  } catch (e) {
      console.error("Erreur lors de la récupération des articles et menus:", e);
      return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.addMenu = async (req, res) => {
  const { name, price, image, selectedArticles, data } = req.body;
  
  const userId = data.user_id;

  try {
    // Étape 1 - Récupération du restaurant_id
    const queryGetRestaurantId = {
      text: "SELECT restaurant_id FROM restaurant WHERE user_id = $1",
      values: [userId],
    };

    const result = await client.query(queryGetRestaurantId);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Aucun restaurant trouvé pour cet utilisateur." });
    }

    const restaurantId = result.rows[0].restaurant_id;

    // Étape 2 - Insertion du menu
    const queryInsertMenu = {
      text: `INSERT INTO menu(restaurant_id, menu_name, price, menu_image)
             VALUES ($1, $2, $3, $4)
             RETURNING menu_id`,
      values: [restaurantId, name, price, image],
    };

    const menuResult = await client.query(queryInsertMenu);

    if (menuResult.rowCount !== 1) {
      return res.status(400).json({ message: "Problème lors de la création du menu." });
    }

    const menuId = menuResult.rows[0].menu_id;

    // Étape 3 - Insertion des liens articles <-> menu
    const articlesArray = typeof selectedArticles === 'string'
      ? JSON.parse(selectedArticles)
      : selectedArticles;

    for (const articleId of articlesArray) {
      const linkQuery = {
        text: 'INSERT INTO list_article_menu(menu_id, article_id) VALUES ($1, $2)',
        values: [menuId, articleId],
      };
      await client.query(linkQuery);
    }

    return res.status(201).json({ message: "Création du menu réussie !" });

  } catch (e) {
    console.error("Erreur lors de la création du menu :", e);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

exports.deleteMenu = async (req, res) => {
  const { menu_id } = req.body;

  if (!menu_id) {
    return res.status(400).json({ message: "ID menu manquant." });
  }

  try {
    const query = {
      text: 'DELETE FROM menu WHERE menu_id = $1',
      values: [menu_id],
    };

    await client.query(query);
    return res.status(200).json({ message: "Menu supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression Menu :", error);
    return res.status(500).json({ message: "Erreur interne lors de la suppression du menu." });
  }
};

exports.updateArticle = async (req, res) => {
  const { article_id, name, type, price, solo, image, data } = req.body;

  const userId = data.user_id;

  try {
    // Étape 1 – Vérifier que le restaurant existe pour ce user
    const queryGetRestaurantId = {
      text: "SELECT restaurant_id FROM restaurant WHERE user_id = $1",
      values: [userId],
    };

    const result = await client.query(queryGetRestaurantId);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Aucun restaurant trouvé pour cet utilisateur." });
    }

    const restaurantId = result.rows[0].restaurant_id;

    // Étape 2 – Mettre à jour l'article (en sécurisant bien avec restaurant_id)
    const queryUpdateArticle = {
      text: `UPDATE article 
             SET article_name = $1, 
                 article_type_id = $2, 
                 price = $3, 
                 can_be_sold_individually = $4, 
                 article_image = $5 
             WHERE article_id = $6 AND restaurant_id = $7`,
      values: [name, type, price, solo, image, article_id, restaurantId],
    };

    const updateResult = await client.query(queryUpdateArticle);

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ message: "Aucun article trouvé ou vous n'avez pas les droits." });
    }

    res.status(200).json({ message: "Article mis à jour avec succès." });

  } catch (e) {
    console.error("Erreur updateArticle :", e);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

exports.updateMenu = async (req, res) => {
  const { menu_id, name, price, image, selectedArticles, data } = req.body;

  const userId = data.user_id;

  try {
    // Étape 1 – Récupérer le restaurant_id
    const queryRestaurant = {
      text: "SELECT restaurant_id FROM restaurant WHERE user_id = $1",
      values: [userId],
    };

    const resultRestaurant = await client.query(queryRestaurant);
    if (resultRestaurant.rows.length === 0) {
      return res.status(404).json({ message: "Aucun restaurant trouvé pour cet utilisateur." });
    }

    const restaurantId = resultRestaurant.rows[0].restaurant_id;

    // Étape 2 – Vérifier que le menu appartient bien à ce restaurant
    const queryCheckMenu = {
      text: "SELECT * FROM menu WHERE menu_id = $1 AND restaurant_id = $2",
      values: [menu_id, restaurantId],
    };

    const resultMenu = await client.query(queryCheckMenu);
    if (resultMenu.rows.length === 0) {
      return res.status(403).json({ message: "Ce menu ne vous appartient pas." });
    }

    // Étape 3 – Update table menu
    const queryUpdateMenu = {
      text: `UPDATE menu 
             SET menu_name = $1, price = $2, menu_image = $3 
             WHERE menu_id = $4`,
      values: [name, price, image, menu_id],
    };
    await client.query(queryUpdateMenu);

    // Étape 4 – Mettre à jour les articles liés à ce menu
    // On récupère les articles actuellement liés
    const currentArticlesQuery = {
      text: "SELECT article_id FROM list_article_menu WHERE menu_id = $1",
      values: [menu_id],
    };

    const currentArticlesResult = await client.query(currentArticlesQuery);
    const currentArticleIds = currentArticlesResult.rows.map(row => row.article_id);

    // Déterminer les articles à ajouter et à supprimer
    const toAdd = selectedArticles.filter(id => !currentArticleIds.includes(id));
    const toRemove = currentArticleIds.filter(id => !selectedArticles.includes(id));

    // Supprimer les anciens
    for (const articleId of toRemove) {
      await client.query("DELETE FROM list_article_menu WHERE menu_id = $1 AND article_id = $2", [menu_id, articleId]);
    }

    // Ajouter les nouveaux
    for (const articleId of toAdd) {
      await client.query("INSERT INTO list_article_menu(menu_id, article_id) VALUES ($1, $2)", [menu_id, articleId]);
    }

    return res.status(200).json({ message: "Menu mis à jour avec succès." });

  } catch (e) {
    console.error("Erreur updateMenu :", e);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
