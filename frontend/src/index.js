import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CartProvider} from './context/CartContext';
import {SocketProvider} from "./context/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SocketProvider>
        <CartProvider>
            <App/>
        </CartProvider>
    </SocketProvider>
);
