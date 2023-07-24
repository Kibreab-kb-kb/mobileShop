// ImageGallery.js (updated)
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    const apiKey = 'ByZkXYoysUiu4K9YFl0T7wXBQbF3v5t1Dif2RT8SYiXkKuXcLEXJ6SZg';
    const url = 'https://api.pexels.com/v1/search?query=mobile+phone&per_page=45';

    axios
      .get(url, {
        headers: {
          Authorization: apiKey,
        },
      })
      .then((response) => setImages(response.data.photos))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Mobile Phones</h2>
      <div className="flex justify-between mb-4">
        <span className="text-sm">Total Items in Cart: {cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="rounded-md overflow-hidden transition duration-300 transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={image.src.medium}
                alt={image.photographer}
                className="h-64 w-full object-cover"
              />
              <button
                onClick={() => addToCart(image)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
