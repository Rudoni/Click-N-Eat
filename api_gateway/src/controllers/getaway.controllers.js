const axios = require("axios");
const { response } = require("express");

const SERVICE_URL_account = "http://account-service:3001";
const SERVICE_URL_restaurant = "http://restaurant-service:3003";
const SERVICE_URL_order = "http://order-service:3004";

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
    let response;

    try {
        console.log("req.body", req.body);
        const response = await axios.post(`${SERVICE_URL_account}/register`, req.body);
        console.log(response);
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            res.status(400).json({message: error.response.data.message});
        } else {
            // Si c'est une autre erreur, on envoie une réponse générique
            console.error('Erreur Axios:', error.message);
            res.status(500).send('Erreur interne du serveur');
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

exports.testOrder = async (req, res) => {
    console.log("test order")
    try {

        const token = req.headers.authorization || '';

        auth = await authenticated(token)

        if (auth.response) {

            req.body.data = auth.info
            // console.log(req.body)

            const response = await axios.post(`${SERVICE_URL_order}/test`, req.body);

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
