const authController = require("../controllers/serveur_restaurant.controllers");

module.exports = function(app) {
    app.post("/addRestaurant", authController.addRestaurant);
};