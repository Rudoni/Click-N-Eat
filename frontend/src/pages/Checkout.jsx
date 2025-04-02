import React, { useState, useContext } from 'react';
import './Checkout.css';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  // Adresse simulée par défaut
  const [address, setAddress] = useState({
    street: '12 rue des Lilas',
    city: 'Paris',
    postalCode: '75010',
    country: 'France'
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(address);

  // Paiement
  const [payment, setPayment] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Calcul des frais
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 3;
  const serviceFee = subtotal * 0.03;
  const total = subtotal + deliveryFee + serviceFee;

  const navigate = useNavigate();
  const handleConfirmOrder = () => {
    const { cardNumber, cardName, expiry, cvv } = payment;
    if (cardNumber && cardName && expiry && cvv) {
      setPaymentConfirmed(true);
      navigate('/confirmation'); // redirection ici
    } else {
      alert('Merci de remplir tous les champs de paiement.');
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setAddress(form);
    setEditMode(false);
  };

  const handlePaymentChange = (e) => {
    setPayment(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <div className="checkout-page">
      <h2>Validation de la commande</h2>

      <section className="checkout-section">
        <h3>Récapitulatif de la commande</h3>
        {cartItems.length === 0 ? (
          <p>Panier vide.</p>
        ) : (
          <ul className="checkout-cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="checkout-cart-item">
                <span>{item.name} - x{item.quantity}</span>
                <span> - {(item.price * item.quantity).toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        )}
        <div className="checkout-summary">
          <p>Sous-total : {subtotal.toFixed(2)} €</p>
          <p>Frais de livraison : {deliveryFee.toFixed(2)} €</p>
          <p>Frais de service (3%) : {serviceFee.toFixed(2)} €</p>
          <hr />
          <p><strong>Total : {total.toFixed(2)} €</strong></p>
        </div>
      </section>

      <section className="checkout-section">
        <h3>Adresse de livraison</h3>
        {!editMode ? (
          <>
            <p>{address.street}</p>
            <p>{address.postalCode} {address.city}, {address.country}</p>
            <button className="btn-edit" onClick={() => setEditMode(true)}>Modifier</button>
          </>
        ) : (
          <div className="address-form">
            <input type="text" name="street" placeholder="Adresse" value={form.street} onChange={handleChange} required />
            <input type="text" name="postalCode" placeholder="Code postal" value={form.postalCode} onChange={handleChange} required />
            <input type="text" name="city" placeholder="Ville" value={form.city} onChange={handleChange} required />
            <input type="text" name="country" placeholder="Pays" value={form.country} onChange={handleChange} required />
            <button className="btn-save" onClick={handleSave}>Enregistrer l’adresse</button>
          </div>
        )}
      </section>

      <section className="checkout-section">
        <h3>Paiement</h3>
        {!paymentConfirmed ? (
          <div className="payment-form">
            <input
              type="text"
              name="cardNumber"
              placeholder="Numéro de carte"
              value={payment.cardNumber}
              onChange={handlePaymentChange}
              required
            />
            <input
              type="text"
              name="cardName"
              placeholder="Nom sur la carte"
              value={payment.cardName}
              onChange={handlePaymentChange}
              required
            />
            <input
              type="text"
              name="expiry"
              placeholder="Date d’expiration (MM/AA)"
              value={payment.expiry}
              onChange={handlePaymentChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={payment.cvv}
              onChange={handlePaymentChange}
              required
            />
            <button className="btn-confirm" onClick={handleConfirmOrder}>
              Confirmer la commande
            </button>
          </div>
        ) : (
          <p className="confirmation-message">✅ Paiement effectué. Merci pour votre commande !</p>
        )}
      </section>
    </div>
  );
};

export default Checkout;
