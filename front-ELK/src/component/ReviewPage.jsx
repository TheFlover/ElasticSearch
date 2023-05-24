import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewPage = () => {
  const [note, setNote] = useState('');
  const [reviews, setReviews] = useState([]);
  const [from, setFrom] = useState(0); // Position de départ pour la pagination

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/database/${note}`);
      const searchResult = response.data;
      setReviews(searchResult);
      setFrom(0); // Réinitialiser la position de départ
    } catch (error) {
      console.error('Error occurred during API call:', error);
    }
  };

  const handleLoadMoreReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/database/${note}/additional-reviews?from=${reviews.length}`);
      const additionalReviews = response.data;
      setReviews((prevReviews) => [...prevReviews, ...additionalReviews]);
    } catch (error) {
      console.error('Error occurred during API call:', error);
    }
  };

  useEffect(() => {
    // Charger les avis initiaux au chargement de la page
    handleFormSubmit({ preventDefault: () => {} });
  }, []);

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
        {reviews.length > 0 && (
          <button onClick={handleLoadMoreReviews}>Load More Reviews</button>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;