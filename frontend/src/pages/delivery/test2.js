import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";

const WebSocketComponent = () => {
    const [message, setMessage] = useState(null);
    const [userId, setUserId] = useState(1); // Par exemple, l'ID de l'utilisateur, tu peux le récupérer via ton système d'authentification
    const [restaurantId, setRestaurantId] = useState(1); // Par exemple, l'ID du restaurant
    const socket = useSocket();


    useEffect(() => {


        socket.on("new-delivery", (orderData) => {
            console.log("Nouvelle commande reçue:", orderData);
            setMessage(orderData);
        });

        // Nettoyer lors du démontage du composant
        return () => {
            socket.off("new-delivery"); // Désinscrire l'écouteur quand le composant est démonté
        };
    }, [userId, restaurantId]); // Si l'userId ou restaurantId change, reconnecte-toi

    return (
        <div>
            <h1>Messages reçus du serveur :</h1>
            {message && <pre>{JSON.stringify(message, null, 2)}</pre>}
        </div>
    );
};

export default WebSocketComponent;