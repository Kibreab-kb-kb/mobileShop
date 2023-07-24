import React from 'react';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      image: 'https://via.placeholder.com/150',
      category: 'category1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 149.99,
      image: 'https://via.placeholder.com/150',
      category: 'category2',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 199.99,
      image: 'https://via.placeholder.com/150',
      category: 'category1',
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {featuredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4" />
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-500">${product.price.toFixed(2)}</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-4">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
