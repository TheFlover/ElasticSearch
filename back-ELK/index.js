const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const { tokenizer } = require('@elastic/elasticsearch');
const cors = require('cors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const client = new Client({
  node: 'https://localhost:9200/',
  auth: {
    username: 'elastic',
    password: 'Florian'
  },
  customTokenizers: {
    myTokenizer: tokenizer('standard')
  }
});

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/database', async function (req, res) {
  const { rating_review, keyword, from } = req.query;

  async function searchReviews() {
    const query = {
      bool: {
        must: []
      }
    };

    if (rating_review) {
      query.bool.must.push({
        term: {
          rating_review: {
            value: parseInt(rating_review)
          }
        }
      });
    }

    if (keyword) {
      query.bool.must.push({
        match: {
          review_full: {
            query: keyword,
            analyzer: 'myTokenizer'
          }
        }
      });
    }

    const body = await client.search({
      index: 'tripreviews',
      body: {
        query,
        size: 10,
        from: parseInt(from) || 0 // Utiliser la position de départ fournie ou 0 par défaut
      }
    });

    return body.hits.hits;
  }

  try {
    const searchResult = await searchReviews();
    res.send(searchResult);
    console.log(searchResult);
  } catch (error) {
    console.error('Error occurred during search:', error);
    res.status(500).send('An error occurred during search.');
  }
});

app.listen(3000, () => console.log('Server ready'));