const port = 3001;
const express = require('express');
const app = express();
app.use(express.json());
require('./routes/serveur_node.routes')(app);


app.listen(port, "0.0.0.0", () => {
    console.log("Server running on http://0.0.0.0:"+port);
});