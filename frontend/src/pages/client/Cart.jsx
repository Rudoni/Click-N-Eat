import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {

  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2 className="cart-title">Votre panier</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-info">
                  <span className="cart-name">{item.name}</span>
                  <span className="cart-type">({item.type})</span>
                  <div className="cart-qty-controls">
                    <button onClick={() => decreaseQuantity(item.id, item.type)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id, item.type)}>+</button>
                  </div>
                </div>
                <div className="cart-actions">
                  <span className="cart-price">{(item.price * item.quantity).toFixed(2)} €</span>
                  <button className="btn-remove" onClick={() => removeFromCart(item.id, item.type)}>
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="cart-footer">
            <p className="cart-total"><strong>Total :</strong> {total.toFixed(2)} €</p>
                <button className="btn-clear" onClick={clearCart}>Vider le panier</button>
                <button className="btn-validate" onClick={() => navigate('/checkout')}>Valider la commande</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
