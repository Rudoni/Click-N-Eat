const express = require('express');
const axios = require('axios');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

require('./src/routes/gateway.routes')(app);


// Définir un port pour l'API Gateway
const GATEWAY_PORT = 3100;



// Lancer le serveur de l'API Gateway
app.listen(GATEWAY_PORT, () => {
    console.log(`API Gateway est en cours d'exécution sur http://localhost:${GATEWAY_PORT}`);
});
