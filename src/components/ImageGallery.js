import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const { addToCart, cartItems, addReview, removeReview } = useContext(CartContext);

  useEffect(() => {
    const apiKey = 'Your_Pexels_API_Key';
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

  const handleFilterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredImages = images.filter(
    (image) =>
      (selectedCategory === 'all' || image.category === selectedCategory) &&
      image.photographer.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddReview = (id, reviewText, rating) => {
    addReview(id, reviewText, rating);
    setReviewText('');
    setRating(5);
  };

  const handleRemoveReview = (id, reviewIndex) => {
    removeReview(id, reviewIndex);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Mobile Phones</h2>
      <div className="flex justify-between mb-4">
        <span className="text-sm">Total Items in Cart: {cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
        <div>
          <input
            type="text"
            placeholder="Search by photographer name"
            value={searchText}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => handleFilterByCategory(e.target.value)}
            className="ml-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="rounded-md overflow-hidden transition duration-300 transform hover:scale-105">
            <div className="relative">
              <img src={image.src.medium} alt={image.photographer} className="h-64 w-full object-cover" />
              <button
                onClick={() => addToCart(image)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity"
              >
                Add to Cart
              </button>
            </div>
            {image.reviews && image.reviews.length > 0 ? (
              <div>
                <h3 className="text-lg font-bold mt-2">User Reviews</h3>
                <ul className="mb-4">
                  {image.reviews.map((review, index) => (
                    <li key={index} className="mt-2">
                      <p className="text-gray-700">{review.text}</p>
                      <button
                        onClick={() => handleRemoveReview(image.id, index)}
                        className="text-red-600 font-bold mt-1"
                      >
                        Remove Review
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <div className="flex items-center mt-2">
                  <span className="text-gray-700 font-bold">Rating: </span>
                  <span className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        onClick={() => setRating(index + 1)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 .25a.75.75 0 0 1 .6.3l3.8 5.1 5.1.8a.75.75 0 0 1 .4 1.3l-3.7 3.7 1.3 5.1a.75.75 0 0 1-1.1.9L10 15.5l-4.4 3a.75.75 0 0 1-1.1-.9l1.3-5.1-3.7-3.7a.75.75 0 0 1 .4-1.3l5.1-.8 3.8-5.1a.75.75 0 0 1 .6-.3z"
                        />
                      </svg>
                    ))}
                  </span>
                </div>
                <button
                  onClick={() => handleAddReview(image.id, reviewText, rating)}
                  className="bg-blue-500 text-white px-4 py-2 mt-2"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
