// src/context/SocketContext.js
import React, {createContext, useContext, useEffect, useState} from "react";
import { getSocket } from "./socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket] = useState(getSocket);

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")


    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)

        if (!socket.connected) {
            socket.connect();
            socket.emit("authenticate", { token });

        }

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
