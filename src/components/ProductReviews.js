import React, { useState } from 'react';

const ProductReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    setNewReview((prevReview) => ({ ...prevReview, rating }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setNewReview({ name: '', rating: 0, comment: '' });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Product Reviews</h2>
      <div className="mb-4">
        <p>Average Rating: {calculateAverageRating().toFixed(1)}</p>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((rating) => (
            <svg
              key={rating}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 fill-current ${
                rating <= calculateAverageRating() ? 'text-yellow-500' : 'text-gray-400'
              }`}
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0c-.356 0-.693.116-.964.315L6.7 3.018 2.29 3.747c-.741.083-1.292.696-1.209 1.437l.51 4.588-2.05 5.253c-.21.55.177 1.155.786 1.246l4.831.715 3.542 3.242c.397.364.941.558 1.483.515l4.355-.548 2.117 4.138c.203.396.693.62 1.154.52.46-.099.79-.487.77-.957l-.262-4.71 2.743-3.557c.455-.59.29-1.438-.317-1.803L16.56 12.02l-.333-4.713c.155-.55-.16-1.132-.7-1.294l-4.66-1.292L10.961.314A1.49 1.49 0 0 0 10 0"
              />
            </svg>
          ))}
          <span className="ml-2">{reviews.length} reviews</span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold">Name:</label>
            <input
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              className="px-2 py-1 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Rating:</label>
            <div>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="inline-block mr-2">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={rating === newReview.rating}
                    onChange={handleRatingChange}
                    className="mr-1"
                  />
                  {rating}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-bold">Comment:</label>
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              className="px-2 py-1 border border-gray-300 rounded w-full"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold my-4">All Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div>
            {reviews.map((review, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{review.name}</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <svg
                      key={rating}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 fill-current ${
                        rating <= review.rating ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0c-.356 0-.693.116-.964.315L6.7 3.018 2.29 3.747c-.741.083-1.292.696-1.209 1.437l.51 4.588-2.05 5.253c-.21.55.177 1.155.786 1.246l4.831.715 3.542 3.242c.397.364.941.558 1.483.515l4.355-.548 2.117 4.138c.203.396.693.62 1.154.52.46-.099.79-.487.77-.957l-.262-4.71 2.743-3.557c.455-.59.29-1.438-.317-1.803L16.56 12.02l-.333-4.713c.155-.55-.16-1.132-.7-1.294l-4.66-1.292L10.961.314A1.49 1.49 0 0 0 10 0"
                      />
                    </svg>
                  ))}
                  <span className="ml-2">{review.comment}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
