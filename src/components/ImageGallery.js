// components/ImageGallery.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const { addToCart, cartItems } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [username, setUsername] = useState('');
  const [userReviewed, setUserReviewed] = useState(false);

  useEffect(() => {
    const apiKey = 'YOUR_API_KEY';
    const url = 'https://api.pexels.com/v1/search?query=mobile+phone&per_page=45';

    axios
      .get(url, {
        headers: {
          Authorization: apiKey,
        },
      })
      .then((response) => {
        const photos = response.data.photos.map((photo) => ({
          ...photo,
          reviews: [],
          averageRating: 0,
        }));
        setImages(photos);
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  const handleFilterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleAddReview = () => {
    if (!reviewText || rating === 0 || !username) {
      return; // If review text, rating, or username is empty, do not add the review
    }

    const updatedImages = images.map((image) => {
      if (image.id === selectedImage.id) {
        const updatedReviews = [
          ...image.reviews,
          { id: new Date().getTime(), text: reviewText, rating, username },
        ];
        return { ...image, reviews: updatedReviews, userReviewed: true };
      }
      return image;
    });

    setImages(updatedImages);
    setReviewText('');
    setRating(5);
    setUsername('');
    setUserReviewed(true);
  };

  const handleRemoveReview = (reviewId) => {
    const updatedImages = images.map((image) => {
      if (image.id === selectedImage.id) {
        const updatedReviews = image.reviews.filter((review) => review.id !== reviewId);
        return { ...image, reviews: updatedReviews, userReviewed: false };
      }
      return image;
    });

    setImages(updatedImages);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setReviewText('');
    setRating(5);
    setUsername('');
    setUserReviewed(image.userReviewed);
  };

  const filteredImages = images.filter(
    (image) =>
      (selectedCategory === 'all' || image.category === selectedCategory) &&
      image.photographer.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Mobile Phones</h2>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="category" className="mr-2">
            Category:
          </label>
          <select
            name="category"
            id="category"
            className="border rounded px-2 py-1"
            value={selectedCategory}
            onChange={(e) => handleFilterByCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            type="text"
            id="search"
            className="border rounded px-2 py-1"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="rounded-md overflow-hidden transition duration-300 transform hover:scale-105"
            onClick={() => handleImageClick(image)}
          >
            <div className="relative">
              <img src={image.src.medium} alt={image.photographer} className="h-64 w-full object-cover" />
              <button
                onClick={() => addToCart(image)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-bold">Photographer: </span>
              <span className="text-gray-700">{image.photographer}</span>
            </div>
            {image.reviews.length > 0 ? (
              <div className="flex items-center mt-2">
                <span className="text-gray-700 font-bold">Average Rating: </span>
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        index < image.averageRating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 .25a.75.75 0 0 1 .6.3l3.8 5.1 5.1.8a.75.75 0 0 1 .4 1.3l-3.7 3.7 1.3 5.1a.75.75 0 0 1-1.1.9L10 15.5l-4.4 3a.75.75 0 0 1-1.1-.9l1.3-5.1-3.7-3.7a.75.75 0 0 1 .4-1.3l5.1-.8 3.8-5.1a.75.75 0 0 1 .6-.3z"
                      />
                    </svg>
                  ))}
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-1/2">
            <h2 className="text-3xl font-bold mb-4">{selectedImage.photographer}</h2>
            <div>
              <img src={selectedImage.src.original} alt={selectedImage.photographer} className="h-64 w-full object-cover" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Reviews</h3>
              {selectedImage.reviews.length > 0 ? (
                <div>
                  {selectedImage.reviews.map((review) => (
                    <div key={review.id} className="border-b py-2">
                      <div className="flex items-center">
                        <span className="text-gray-700 font-bold">User Rating: </span>
                        <span className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-6 w-6 ${
                                index < review.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 .25a.75.75 0 0 1 .6.3l3.8 5.1 5.1.8a.75.75 0 0 1 .4 1.3l-3.7 3.7 1.3 5.1a.75.75 0 0 1-1.1.9L10 15.5l-4.4 3a.75.75 0 0 1-1.1-.9l1.3-5.1-3.7-3.7a.75.75 0 0 1 .4-1.3l5.1-.8 3.8-5.1a.75.75 0 0 1 .6-.3z"
                              />
                            </svg>
                          ))}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-700 font-bold">Username: </span>
                        <span className="text-gray-700">{review.username}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-700 font-bold">Review: </span>
                        <span className="text-gray-700">{review.text}</span>
                      </div>
                      <div className="mt-2">
                        <button onClick={() => handleRemoveReview(review.id)} className="text-red-600">
                          Remove Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-700">No reviews for this image.</div>
              )}
            </div>
            {!userReviewed && (
              <div className="mt-4">
                <label htmlFor="username" className="text-gray-700 font-bold">
                  Your Username:
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <label htmlFor="review" className="text-gray-700 font-bold mt-2">
                  Your Rating:
                </label>
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      onClick={() => setRating(index + 1)}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 cursor-pointer ${
                        index < rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 .25a.75.75 0 0 1 .6.3l3.8 5.1 5.1.8a.75.75 0 0 1 .4 1.3l-3.7 3.7 1.3 5.1a.75.75 0 0 1-1.1.9L10 15.5l-4.4 3a.75.75 0 0 1-1.1-.9l1.3-5.1-3.7-3.7a.75.75 0 0 1 .4-1.3l5.1-.8 3.8-5.1a.75.75 0 0 1 .6-.3z"
                      />
                    </svg>
                  ))}
                </span>
                <div className="mt-2">
                  <textarea
                    id="review"
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div className="mt-2">
                  <button onClick={handleAddReview} className="bg-blue-500 text-white px-4 py-2">
                    Submit Review
                  </button>
                </div>
              </div>
            )}
            <div className="mt-4">
              <button onClick={() => setSelectedImage(null)} className="bg-red-500 text-white px-4 py-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
