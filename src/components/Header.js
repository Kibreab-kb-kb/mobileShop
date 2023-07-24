// Header.js
import React from 'react';
import CartIcon from './CartIcon'; // Import the CartIcon component

const Header = ({ setIsCartOpen }) => { // Receive setIsCartOpen prop from App.js
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mobile Shop</h1>
        <CartIcon setIsCartOpen={setIsCartOpen} /> {/* Pass the setIsCartOpen prop to CartIcon */}
      </div>
    </header>
  );
};

export default Header;
