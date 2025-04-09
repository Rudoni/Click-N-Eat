const authController = require("../controllers/serveur_restaurant.controllers");

module.exports = function(app) {
    //get
    app.post("/getRestaurantInfos", authController.getRestaurantInfos);
    app.post("/getRestaurant", authController.getRestaurantInfos);
    app.post("/getArticle", authController.getArticle);
    app.post("/getMenu", authController.getMenu);
    app.post("/getListeArticleMenuRestaurant", authController.getListeArticleMenuRestaurant);

    //add
    app.post("/addRestaurant", authController.addRestaurant);
    app.post("/addArticle", authController.addArticle);
    app.post("/addMenu", authController.addMenu);

    //update
    app.put("/restaurant/update", authController.updateRestaurant);
    app.put("/article/update", authController.updateArticle);
    app.put("/menu/update", authController.updateMenu);
    
    //delete
    app.delete("/restaurant/delete", authController.deleteRestaurant);
    app.delete("/article/delete", authController.deleteArticle);
    app.delete("/menu/delete", authController.deleteMenu);
    
    app.post("/test", authController.test_api)

}