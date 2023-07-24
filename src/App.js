// App.js
import './input.css';
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageGallery from './components/ImageGallery';
import { CartProvider } from './components/CartContext';
import Cart from './components/Cart';
import CartIcon from './components/CartIcon';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header setIsCartOpen={setIsCartOpen} />
        <main className="flex-1">
          <ImageGallery />
        </main>
        <Footer />
        {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />} {/* Pass the setIsCartOpen prop to the Cart component */}
      </div>
    </CartProvider>
  );
}

export default App;
