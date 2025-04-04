const authController = require("../controllers/serveur_restaurant.controllers");

module.exports = function(app) {
    app.post("/addRestaurant", authController.addRestaurant);
    app.post("/addArticle", authController.addArticle);
    app.post("/test", authController.test_api)
};