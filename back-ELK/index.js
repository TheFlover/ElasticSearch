const express = require('express')
const { Client } = require('@elastic/elasticsearch')
const cors = require('cors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const client = new Client({ 
    node: 'https://localhost:9200/',
    auth: {
        username: 'elastic',
        password: 'Florian'
    } 
})

const app = express()

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.get('/database', async function (req, res) {
    async function Search () {
      const body = await client.search({
        index: 'tripreviews',
        body: {
          query: {
            match_all: {}
          }
        }
      })

      return body.hits.hits
    }
    var SearchResult = await Search()
    res.send(SearchResult)
    console.log(SearchResult)
})

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

app.listen(3000, () => console.log('Server ready'));