const authController = require("../controllers/serveur_node.controllers");
const accountController = require("../controllers/addressController");

module.exports = function(app) {
    app.post("/register", authController.register);
    app.post("/login", authController.login);
    app.post("/authenticate", authController.authenticate);
    app.post("/profile", authController.profile);
    app.put("/profile/update", authController.updateProfile);
    app.delete("/account/delete", authController.deleteAccount);


    app.post("/address/create", accountController.createAddress);
    app.put("/address/update/:id", accountController.updateAddress);
};