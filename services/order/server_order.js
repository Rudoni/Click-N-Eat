const http = require("http");
const express = require('express');
const { Server } = require("socket.io");

const port = 3004;
const app = express();
const server = http.createServer(app); // Le vrai serveur HTTP

const userSockets = new Map();

app.use(express.json());
require('./routes/serveur_order.routes.js')(app);

// ✅ C’est ce serveur-là qu’on doit écouter (pas app.listen)
server.listen(port, "0.0.0.0", () => {
    console.log("Server running on http://0.0.0.0:" + port);
});

// WebSocket sur ce serveur HTTP
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("Un restaurateur connecté :", socket.id);

    socket.on("authenticate", async (data) => {
        const {token} = data;

        const res = await fetch("http://api-gateway:3100/authenticate", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({})
        });
        const data_token = await res.json();
        console.log(data_token)
        const val = data_token.data.user_id
        if(data_token.data.user_type == 2){
            userSockets.set(socket.id, {val});
            console.log(`Utilisateur ${data_token.data.user_id} connecté avec le socket ${socket.id}`);
        }
    });


    socket.on("disconnect", () => {
        console.log("Restaurateur déconnecté :", socket.id);
        userSockets.delete(socket.id)
    });
});

exports.notifyNewOrder = (restaurantId, orderData) => {
    console.log(userSockets)
    // Filtrer les sockets qui appartiennent au restaurantId spécifique
    userSockets.forEach((value, socketId) => {
        console.log("valuse", value, " rest id ", restaurantId)
        if (value.val == restaurantId) {
            console.log("id ", socketId)
            io.to(socketId).emit("new-order", orderData);
        }
    });
}