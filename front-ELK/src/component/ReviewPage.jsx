import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Grid,
} from '@mui/material';

const ReviewPage = () => {
  const [note, setNote] = useState('');
  const [keyword, setKeyword] = useState('');
  const [reviews, setReviews] = useState([]);
  const [from, setFrom] = useState(0); // Position de départ pour la pagination

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/database?rating_review=${note}&keyword=${keyword}`);
      const searchResult = response.data;
      setReviews(searchResult);
      setFrom(0); // Réinitialiser la position de départ
    } catch (error) {
      console.error('Error occurred during API call:', error);
    }
  };

  const handleLoadMoreReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/database?rating_review=${note}&keyword=${keyword}&from=${reviews.length}`);
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>TripAdvisor Reviews</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Note</InputLabel>
                <Select
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                >
                  <MenuItem value="">-- Empty --</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button type="submit" variant="contained" fullWidth>
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Reviews</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Note</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>{review._source.rating_review}</TableCell>
                  <TableCell>{review._source.review_full}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {reviews.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button onClick={handleLoadMoreReviews} variant="outlined">
              Load More Reviews
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ReviewPage;