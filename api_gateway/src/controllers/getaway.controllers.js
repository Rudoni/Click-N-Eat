const axios = require("axios");
const { response } = require("express");

const SERVICE_URL_account = "http://account-service:3001";
const SERVICE_URL_restaurant = "http://restaurant-service:3003";
const SERVICE_URL_order = "http://order-service:3004";
const SERVICE_URL_referral = 'http://referral-service:3200';

async function authenticated(token) {
    console.log("token", token)
    try {
        if (token) {

            console.log("token authenticate", token)

            // Configuration des headers
            const config = {
                headers: {
                    'Authorization': token,  // Ajout du token
                    'Content-Type': 'application/json' // Type de contenu
                }
            };

            const response = await axios.post(`${SERVICE_URL_account}/authenticate`, {}, config);

            // console.log("rep auth", response)
            if (response.status == 200) {
                return { response: true, info: response.data.data }
            } else {
                return { response: false }
            }

        } else {
            return { response: false }
        }
    } catch (error) {
        console.log("error auth", error)
        return { response: false }

    }

}

exports.addRestaurant = async (req, res) => {
    try {

        const token = req.headers.authorization || '';

        auth = await authenticated(token)

        if (auth.response) {

            req.body.data = auth.info
            console.log(req.body)

            const response = await axios.post(`${SERVICE_URL_restaurant}/addRestaurant`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "vous n'etes pas authentifié" });
        }
    } catch (error) {
        console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        const token = req.headers.authorization || '';
        const auth = await authenticated(token);
  
        if (!auth.response) {
          return res.status(403).json({ message: "Non autorisé." });
        }
  
        const response = await axios.delete(`${SERVICE_URL_restaurant}/restaurant/delete`, {
          data: { user_id: auth.info.user_id },
        });
  
        return res.status(200).json(response.data);
      } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
      }
};

exports.deleteArticle = async (req, res) => {
    try {
        const token = req.headers.authorization || '';
        const auth = await authenticated(token);
  
        if (!auth.response) {
          return res.status(403).json({ message: "Non autorisé." });
        }
  
        const response = await axios.delete(`${SERVICE_URL_restaurant}/article/delete`, {
          data: { article_id: req.body.article_id },
        });
  
        return res.status(200).json(response.data);
      } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
      }
};

exports.getRestaurantInfos = async (req, res) => {

    try {

        const token = req.headers.authorization || '';

        auth = await authenticated(token)

        if (auth.response) {

            req.body.data = auth.info
            const response = await axios.post(`${SERVICE_URL_restaurant}/getRestaurantInfos`, req.body);
            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "vous n'etes pas authentifié" });
        }
    } catch (error) {
        console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.addArticle = async (req, res) => {
    try {

        const token = req.headers.authorization || '';

        auth = await authenticated(token)

        if (auth.response) {

            req.body.data = auth.info
            console.log(req.body)

            const response = await axios.post(`${SERVICE_URL_restaurant}/addArticle`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "vous n'etes pas authentifié" });
        }
    } catch (error) {
        console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};


exports.login = async (req, res) => {
    try {

        console.log("req.body", req.body)
        // Redirection de la requête POST vers le serveur d'authentification (localhost:3000)
        const response = await axios.post(`${SERVICE_URL_account}/login`, req.body);

        console.log("rep", response)
        // Retourner la réponse du serveur d'authentification au client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.register = async (req, res) => {
  try {
    const { referralCode, ...userData } = req.body;

    console.log("Données reçues pour inscription :", req.body);

    // 1. Création du compte via le microservice account
    const response = await axios.post(`${SERVICE_URL_account}/register`, userData);
    const createdUser = response.data;

    console.log("CREATED USER:", createdUser);

    // 2. Si un code de parrainage est fourni, tenter de l’enregistrer
    if (referralCode && createdUser.user_id) {
      try {
        console.log("Envoi useReferralCode:", {
          user_id: createdUser.user_id,
          code: referralCode
        });

        await axios.post(`${SERVICE_URL_referral}/use-referral-code`, {
          user_id: createdUser.user_id,
          code: referralCode
        });

        console.log("Code de parrainage utilisé avec succès !");
      } catch (referralError) {
        console.error("Erreur lors de l’utilisation du code de parrainage :", referralError.response?.data || referralError.message);
        // On log seulement, mais on ne bloque pas l'inscription
      }
    }

    // 3. Réponse finale au client
    res.status(response.status).json(createdUser);

  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn("Erreur 400 création compte :", error.response.data.message);
      res.status(400).json({ message: error.response.data.message });
    } else {
      console.error("Erreur Axios (register):", error.message);
      res.status(500).send("Erreur interne du serveur");
    }
  }
};




exports.authenticate = async (req, res) => {

    try {
        const token = req.headers.authorization || '';

        // console.log("token authenticate", token)

        // Configuration des headers
        const config = {
            headers: {
                'Authorization': token,  // Ajout du token
                'Content-Type': 'application/json' // Type de contenu
            }
        };

        // Envoi de la requête avec les headers
        const response = await axios.post(`${SERVICE_URL_account}/authenticate`, req.body, config);
        // console.log("response auth", response);
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            res.status(400).json({ message: error.response.data.message });
        } else {
            // Si c'est une autre erreur, on envoie une réponse générique
            // console.error('Erreur Axios:', error.message);
            res.status(500).send('Erreur interne du serveur');
        }
    }

};

exports.order = async (req, res) => {
    console.log("test order")
    try {

        const token = req.headers.authorization || '';

        auth = await authenticated(token)

        if (auth.response) {

            req.body.data = auth.info
            console.log(JSON.stringify(req.body))

            const response = await axios.post(`${SERVICE_URL_order}/order`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "vous n'etes pas authentifié" });
        }
    } catch (error) {
        // console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.testOrderView = async (req, res) => {
    console.log("test order")
    try {

        const token = req.headers.authorization || '';

        auth = await authenticated(token)

        if (auth.response) {

            req.body.data = auth.info
            // console.log(req.body)

            const response = await axios.post(`${SERVICE_URL_order}/testView`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "vous n'etes pas authentifié" });
        }
    } catch (error) {
        // console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.supprimerOrder = async (req, res) => {
    console.log("test order")
    try {

        const token = req.headers.authorization || '';

        auth = await authenticated(token)

        if (auth.response) {

            req.body.data = auth.info
            // console.log(req.body)

            const response = await axios.post(`${SERVICE_URL_order}/supprimer`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "vous n'etes pas authentifié" });
        }
    } catch (error) {
        // console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.getProfile = async (req, res) => {
    try {

        const token = req.headers.authorization || '';

        auth = await authenticated(token)

        if (auth.response) {

            req.body.data = auth.info
            console.log(req.body)

            const response = await axios.post(`${SERVICE_URL_account}/profile`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "vous n'etes pas authentifié" });
        }
    } catch (error) {
        console.error('Erreur Axios:', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.updateProfile = async (req, res) => {
    try {
      const token = req.headers.authorization || '';
      const auth = await authenticated(token);

      if (auth.response) {
        req.body.user_id = auth.info.user_id;

        const response = await axios.put(`${SERVICE_URL_account}/profile/update`, req.body, {
          headers: { Authorization: `Bearer ${token}` }
        });

        res.status(response.status).json(response.data);
      } else {
        res.status(400).json({ message: "vous n'êtes pas authentifié" });
      }
    } catch (error) {
      // console.error("Erreur Axios (updateProfile):", error.message);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
      const token = req.headers.authorization || '';
      const auth = await authenticated(token);

      if (!auth.response) {
        return res.status(403).json({ message: "Non autorisé." });
      }

      const response = await axios.delete(`${SERVICE_URL_account}/account/delete`, {
        data: { user_id: auth.info.user_id },
      });

      return res.status(200).json(response.data);
    } catch (error) {
      // console.error("Erreur suppression via gateway :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  };





// address
exports.createAddress = async (req, res) => {
    try {
      const token = req.headers.authorization || '';
      const auth = await authenticated(token);

      if (auth.response) {
        req.body.user_id = auth.info.user_id;

        const response = await axios.post(`${SERVICE_URL_account}/address/create`, req.body, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        res.status(response.status).json(response.data);
      } else {
        res.status(400).json({ message: "vous n'êtes pas authentifié" });
      }
    } catch (error) {
      // console.error('Erreur Axios (createAddress):', error.message);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

exports.updateAddress = async (req, res) => {
    try {
      const token = req.headers.authorization || '';
      const auth = await authenticated(token);

      if (auth.response) {
        const addressId = req.params.id;

        const response = await axios.put(`${SERVICE_URL_account}/address/update/${addressId}`, req.body, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        res.status(response.status).json(response.data);
      } else {
        res.status(400).json({ message: "vous n'êtes pas authentifié" });
      }
    } catch (error) {
      // console.error('Erreur Axios (updateAddress):', error.message);
      res.status(500).send('Erreur interne du serveur');
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
      const token = req.headers.authorization || '';
      const auth = await authenticated(token);

      if (auth.response) {
        req.body.user_id = auth.info.user_id;

        const response = await axios.put(`${SERVICE_URL_restaurant}/restaurant/update`, req.body, {
          headers: { Authorization: `Bearer ${token}` }
        });

        res.status(response.status).json(response.data);
      } else {
        res.status(400).json({ message: "vous n'êtes pas authentifié" });
      }
    } catch (error) {
      // console.error("Erreur Axios (updateProfile):", error.message);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

exports.getArticle = async (req, res) => {
    try {
        const token = req.headers.authorization || '';
        const auth = await authenticated(token);

        if (auth.response) {
            req.body.data = auth.info;

            const response = await axios.post(`${SERVICE_URL_restaurant}/getArticle`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "Vous n'êtes pas authentifié" });
        }
    } catch (error) {
        console.error('Erreur Axios (getArticle):', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.getMenu = async (req, res) => {
    try {
        const token = req.headers.authorization || '';
        const auth = await authenticated(token);

        if (auth.response) {
            req.body.data = auth.info;

            const response = await axios.post(`${SERVICE_URL_restaurant}/getMenu`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "Vous n'êtes pas authentifié" });
        }
    } catch (error) {
        console.error('Erreur Axios (getMenu):', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.getListeArticleMenuRestaurant = async (req, res) => {
    try {
        const token = req.headers.authorization || '';
        const auth = await authenticated(token);

        if (auth.response) {
            req.body.data = auth.info;

            const response = await axios.post(`${SERVICE_URL_restaurant}/getListeArticleMenuRestaurant`, req.body);

            res.status(response.status).json(response.data);
        } else {
            res.status(400).json({ message: "Vous n'êtes pas authentifié" });
        }
    } catch (error) {
        console.error('Erreur Axios (getListeArticleMenuRestaurant):', error.message);
        res.status(500).send('Erreur interne du serveur');
    }
};


// referral
exports.getReferralCode = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const auth = await authenticated(token);

    if (!auth.response) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const response = await axios.post(`${SERVICE_URL_referral}/referral-code`, {
      user_id: auth.info.user_id
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Erreur getReferralCode (gateway) :', err.message);
    res.status(500).json({ message: 'Erreur serveur (gateway)' });
  }
};



exports.createReferralCode = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const auth = await authenticated(token);

    if (!auth.response) return res.status(401).json({ message: 'Non authentifié' });

    const response = await axios.post(`${SERVICE_URL_referral}/referral-code`, {
      user_id: auth.info.user_id
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Erreur createReferralCode (gateway) :', err.message);
    res.status(500).json({ message: 'Erreur serveur (gateway)' });
  }
};

exports.getReferredUsers = async (req, res) => {
  const token = req.headers.authorization || '';
  const auth = await authenticated(token);

  if (!auth.response) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const response = await axios.get(`${SERVICE_URL_referral}/referrals/${auth.info.user_id}`);
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Erreur getReferredUsers (gateway) :", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.addMenu = async (req, res) => {
  try {
    const token = req.headers.authorization || '';

    const auth = await authenticated(token);

    if (auth.response) {
      // Ajout des infos utilisateur dans le corps
      req.body.data = auth.info;

      const form = new FormData();

      // On reconstruit le body comme FormData
      form.append("name", req.body.name);
      form.append("price", req.body.price);
      form.append("selectedArticles", JSON.stringify(req.body.selectedArticles));
      form.append("data", JSON.stringify(auth.info));

      if (req.file) {
        form.append("image", req.file.buffer, {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        });
      }

      const response = await axios.post(`${SERVICE_URL_restaurant}/addMenu`, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: token,
        },
      });

      res.status(response.status).json(response.data);
    } else {
      res.status(400).json({ message: "vous n'êtes pas authentifié" });
    }
  } catch (error) {
    console.error('Erreur Axios:', error.message);
    res.status(500).send('Erreur interne du serveur');
  }
};

exports.deleteMenu = async (req, res) => {
  try {
      const token = req.headers.authorization || '';
      const auth = await authenticated(token);

      if (!auth.response) {
        return res.status(403).json({ message: "Non autorisé." });
      }

      const response = await axios.delete(`${SERVICE_URL_restaurant}/menu/delete`, {
        data: { menu_id: req.body.menu_id },
      });

      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.updateArticle = async (req, res) => {
  try {
    const token = req.headers.authorization || '';
    const auth = await authenticated(token);

    if (!auth.response) {
      return res.status(400).json({ message: "Vous n'êtes pas authentifié." });
    }

    // On insère les infos utilisateur dans le body
    req.body.data = auth.info;

    // Appel vers le microservice restaurant
    const response = await axios.post(`${SERVICE_URL_restaurant}/updateArticle`, req.body);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Erreur API Gateway (updateArticle) :", error.message);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const token = req.headers.authorization || '';
    const auth = await authenticated(token);

    if (!auth.response) {
      return res.status(400).json({ message: "Vous n'êtes pas authentifié." });
    }

    req.body.data = auth.info;

    const response = await axios.post(`${SERVICE_URL_restaurant}/updateMenu`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Erreur API Gateway (updateMenu) :", error.message);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
