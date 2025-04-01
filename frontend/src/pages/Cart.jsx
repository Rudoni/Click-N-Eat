import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Votre panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.name} ({item.type}) x{item.quantity} — {item.price}€</span>
                <button onClick={() => removeFromCart(item.id, item.type)}>Supprimer</button>
              </li>
            ))}
          </ul>
          <p><strong>Total :</strong> {total.toFixed(2)} €</p>
          <button onClick={clearCart}>Vider le panier</button>
        </>
      )}
    </div>
  );
};

export default Cart;
