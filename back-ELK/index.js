const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const client = new Client({
  node: 'https://localhost:9200/',
  auth: {
    username: 'elastic',
    password: 'Florian'
  }
});

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/database', async function (req, res) {
  async function searchAllReviews() {
    const body = await client.search({
      index: 'tripreviews',
      body: {
        query: {
          match_all: {}
        }
      }
    });

    return body.hits.hits;
  }

  try {
    const searchResult = await searchAllReviews();
    res.send(searchResult);
    console.log(searchResult);
  } catch (error) {
    console.error('Error occurred during search:', error);
    res.status(500).send('An error occurred during search.');
  }
});

app.get('/database/:rating_review', async (req, res) => {
  const { rating_review } = req.params;

  async function searchReviewsByRatingReview() {
    const body = await client.search({
      index: 'tripreviews',
      body: {
        query: {
          term: {
            rating_review: {
              value: parseInt(rating_review)
            }
          }
        }
      }
    });

    return body.hits.hits;
  }

  try {
    const searchResult = await searchReviewsByRatingReview();
    res.send(searchResult);
    console.log(searchResult);
  } catch (error) {
    console.error('Error occurred during search:', error);
    res.status(500).send('An error occurred during search.');
  }
});

app.get('/database/:rating_review/additional-reviews', async (req, res) => {
  const { rating_review } = req.params;
  const { from } = req.query; // Récupérer la position de départ des résultats

  async function searchAdditionalReviewsByRatingReview() {
    const body = await client.search({
      index: 'tripreviews',
      body: {
        query: {
          term: {
            rating_review: {
              value: parseInt(rating_review)
            }
          }
        },
        size: 10,
        from: parseInt(from) || 0 // Utiliser la position de départ fournie ou 0 par défaut
      }
    });

    return body.hits.hits;
  }

  try {
    const additionalReviews = await searchAdditionalReviewsByRatingReview();
    res.send(additionalReviews);
    console.log(additionalReviews);
  } catch (error) {
    console.error('Error occurred during search:', error);
    res.status(500).send('An error occurred during search.');
  }
});

app.listen(3000, () => console.log('Server ready'));