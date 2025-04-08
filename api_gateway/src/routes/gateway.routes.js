const authController = require("../controllers/getaway.controllers");

module.exports = function(app) {
    app.post("/register", authController.register);
    app.post("/login", authController.login);
    app.post("/addRestaurant", authController.addRestaurant)
    app.delete("/restaurant/delete", authController.deleteRestaurant)
    app.delete("/article/delete", authController.deleteArticle)
    app.post("/addArticle", authController.addArticle)
    app.post("/authenticate", authController.authenticate);

    app.post("/order", authController.order)
    app.post("/testOrderView", authController.testOrderView)


    app.post("/profile", authController.getProfile);
    app.put("/profile/update", authController.updateProfile);
    app.delete("/account/delete", authController.deleteAccount);
    app.post("/getRestaurantInfo", authController.getRestaurantInfos);
    app.put("/restaurant/update", authController.updateRestaurant);
    app.post("/getArticle", authController.getArticle);
    app.post("/getMenu", authController.getMenu);
    app.post("/getListeArticleMenuRestaurant", authController.getListeArticleMenuRestaurant);

    // Address routes
    app.post("/address/create", authController.createAddress);
    app.put("/address/update/:id", authController.updateAddress);
};