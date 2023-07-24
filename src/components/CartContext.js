import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
  };

  const addReview = (id, reviewText, rating) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            reviews: [
              ...item.reviews,
              {
                text: reviewText,
                rating,
              },
            ],
          };
        }
        return item;
      })
    );
  };

  const removeReview = (id, reviewIndex) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            reviews: item.reviews.filter((_, index) => index !== reviewIndex),
          };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, addReview, removeReview }}>
      {children}
    </CartContext.Provider>
  );
};
