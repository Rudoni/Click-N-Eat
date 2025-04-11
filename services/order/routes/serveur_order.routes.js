const authController = require("../controllers/serveur_order.controllers");

module.exports = function(app) {
    app.post("/order", authController.createOrder)
    app.post("/testView", authController.viewOrder)
    app.post("/supprimer", authController.supprimer)
    app.post("/acceptOrder", authController.validerCommandeResto)
};