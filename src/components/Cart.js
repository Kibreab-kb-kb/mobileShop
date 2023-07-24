// Cart.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = ({ setIsCartOpen }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const groupedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((el) => el.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const getTotalItems = () => {
    return groupedCartItems.reduce((total, item) => total + Number(item.quantity), 0);
  };

  return (
    <div className="bg-white p-4 absolute right-0 top-12 shadow-md">
      <h3 className="text-lg font-bold mb-2">Your Cart</h3>
      {groupedCartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col">
          {groupedCartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-300 py-2 last:border-b-0"
            >
              <img src={item.src.medium} alt={item.photographer} className="h-16 w-16 mr-2" />
              <div className="flex flex-col flex-grow">
                <span className="text-gray-700">{item.photographer}</span>
                <span className="text-gray-500 text-sm">Quantity: {item.quantity}</span>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600 font-bold">
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <span className="font-bold">Total Items:</span>
            <span>{getTotalItems()}</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 w-full"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
