// CartIcon.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CartIcon = ({ setIsCartOpen }) => { // Receive setIsCartOpen prop
  const { cartItems } = useContext(CartContext);

  return (
    <div onClick={() => setIsCartOpen(true)} className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* SVG icon for the cart */}
      </svg>
      <span className="ml-1">{cartItems.length}</span>
    </div>
  );
};

export default CartIcon;
