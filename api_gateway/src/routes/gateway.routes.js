const authController = require("../controllers/getaway.controllers");

module.exports = function(app) {
    app.post("/register", authController.register);
    app.post("/login", authController.login);
    app.post("/getUserInfos", authController.getUserInfos)
};