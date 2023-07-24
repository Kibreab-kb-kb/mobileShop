// ProductListing.js
import React, { useEffect, useState } from 'react';

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the API (replace 'API_URL' with your actual API endpoint)
    fetch('https://api.thecatapi.com/v1/images/search')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
