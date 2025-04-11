const http = require("http");
const express = require('express');
const {Server} = require("socket.io");

const port = 3004;
const app = express();
const server = http.createServer(app); // Le vrai serveur HTTP

const restoSocket = new Map();
const deliverySocket = new Map()

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
        if (res.ok) {
            const val = data_token.data.user_id
            if (data_token.data.user_type == 2) {
                restoSocket.set(socket.id, {val});
                console.log(`Utilisateur ${data_token.data.user_id} connecté avec le socket ${socket.id}`);
            }
            if (data_token.data.user_type == 4) {
                deliverySocket.set(socket.id, {val});
                console.log(`Utilisateur ${data_token.data.user_id} connecté avec le socket ${socket.id}`);
            }
        }
    });


    socket.on("disconnect", () => {
        console.log("Restaurateur déconnecté :", socket.id);
        restoSocket.delete(socket.id)
        deliverySocket.delete(socket.id)
    });
});

exports.notifyNewOrder = (restaurantId, orderData) => {
    console.log(restoSocket)
    // Filtrer les sockets qui appartiennent au restaurantId spécifique
    restoSocket.forEach((value, socketId) => {
        console.log("valuse", value, " rest id ", restaurantId)
        if (value.val == restaurantId) {
            console.log("id ", socketId)
            io.to(socketId).emit("new-order", orderData);
        }
    });
}

exports.notifyDelivery = (orderData) => {
    // Filtrer les sockets qui appartiennent au restaurantId spécifique
    let keys = Array.from(deliverySocket.keys());
    const key = keys[Math.floor(Math.random() * keys.length)];
    console.log(deliverySocket)
    console.log(deliverySocket.get(key))

    deliverySocket.forEach((value, socketId) => {
        if (value.val == deliverySocket.get(key).val) {
            console.log("id ", socketId)
            io.to(socketId).emit("new-delivery", orderData);
        }
    });
}
