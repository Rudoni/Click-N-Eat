const authController = require("../controllers/serveur_restaurant.controllers");

module.exports = function(app) {
    app.post("/addRestaurant", authController.addRestaurant);
    app.post("/addArticle", authController.addArticle);
    app.delete("/restaurant/delete", authController.deleteRestaurant);
    app.delete("/article/delete", authController.deleteArticle);
    app.post("/test", authController.test_api)
    app.post("/getRestaurant", authController.getRestaurantInfos);
    app.put("/restaurant/update", authController.updateRestaurant);
    app.post("/getArticle", authController.getArticle);
    app.post("/getMenu", authController.getMenu);
}