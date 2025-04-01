import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, type = 'article') => {
    const existing = cartItems.find(i => i.id === item.id && i.type === type);
    if (existing) {
      setCartItems(prev =>
        prev.map(i =>
          i.id === item.id && i.type === type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: 1, type }]);
    }
  };

  const removeFromCart = (itemId, type) => {
    setCartItems(prev =>
      prev.filter(i => !(i.id === itemId && i.type === type))
    );
  };

  const increaseQuantity = (id, type) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.type === type
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  
  const decreaseQuantity = (id, type) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id && item.type === type && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };
  

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
