// src/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io("http://localhost:3004", {
            autoConnect: false, // connexion manuelle après login si besoin
        });
    }

    console.log("socek recuperer")
    return socket;
};
