const authController = require("../controllers/getaway.controllers");

module.exports = function(app) {
    app.post("/register", authController.register);
    app.post("/login", authController.login);
    app.post("/addRestaurant", authController.addRestaurant)
    app.post("/addArticle", authController.addArticle)
    app.post("/authenticate", authController.authenticate);
    app.post("/testOrder", authController.testOrder)
    app.post("/profile", authController.getProfile);
    app.put("/profile/update", authController.updateProfile);
    app.delete("/account/delete", authController.deleteAccount);

    // Address routes
    app.post("/address/create", authController.createAddress);
    app.put("/address/update/:id", authController.updateAddress);
};