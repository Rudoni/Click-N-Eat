const authController = require("../controllers/serveur_order.controllers");

module.exports = function(app) {
    app.post("/test", authController.createOrder)
};