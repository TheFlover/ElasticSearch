import React, { useState } from 'react';
import axios from 'axios';

const ReviewPage = () => {
  const [note, setNote] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/database/${note}`);
      const searchResult = response.data;
      setReviews(searchResult);
    } catch (error) {
      console.error('Error occurred during API call:', error);
    }
  };

  return (
    <div>
      <h1>Review Page</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Note:
          <input
            type="number"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      <div>
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review._id}>
            <p>Note: {review._source.rating_review}</p>
            <p>Comment: {review._source.review_full}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;