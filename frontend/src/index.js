import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext'; // ✅ import du Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* ✅ Ajout du Provider ici */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
