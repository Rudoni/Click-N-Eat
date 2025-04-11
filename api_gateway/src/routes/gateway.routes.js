const authController = require("../controllers/getaway.controllers");

module.exports = function(app) {
    app.post("/register", authController.register);
    app.post("/login", authController.login);
    app.post("/addRestaurant", authController.addRestaurant)
    app.delete("/restaurant/delete", authController.deleteRestaurant)
    app.delete("/article/delete", authController.deleteArticle)
    app.post("/addArticle", authController.addArticle)
    app.post("/authenticate", authController.authenticate);
    app.delete("/menu/delete", authController.deleteMenu)

    app.post("/order", authController.order)
    app.post("/testOrderView", authController.testOrderView)
    app.post("/supprimerCommande", authController.supprimerOrder)
    app.post("/acceptOrder", authController.acceptOrder)
    app.post("/restaurant/details", authController.getRestaurantDetails);



    app.post("/profile", authController.getProfile);
    app.put("/profile/update", authController.updateProfile);
    app.delete("/account/delete", authController.deleteAccount);
    app.post("/getRestaurantInfo", authController.getRestaurantInfos);
    app.put("/restaurant/update", authController.updateRestaurant);
    app.post("/getArticle", authController.getArticle);
    app.post("/getMenu", authController.getMenu);
    app.post("/getListeArticleMenuRestaurant", authController.getListeArticleMenuRestaurant);
    app.post("/addMenu", authController.addMenu)
    app.put("/article/update", authController.updateArticle);
    app.put("/menu/update", authController.updateMenu);
    app.post("/restaurant/list", authController.getRestaurantsList);

    // Address routes
    app.post("/address/create", authController.createAddress);
    app.put("/address/update/:id", authController.updateAddress);

    // Referral routes
    app.post("/referral-code", authController.createReferralCode);
    app.post("/referral-code/get", authController.getReferralCode);
    app.get('/referred-users', authController.getReferredUsers);

};