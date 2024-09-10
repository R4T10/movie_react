import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box, IconButton, Snackbar, Alert } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import { addFavoriteMovie } from '../services/UserService';

export function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const checkCard = (movie) => {
    console.log(movie._id);
    navigate('/movie/detail/' + movie._id);
  }

  const handleAddFavorite = async (event) => {
    event.stopPropagation();
    try {
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      if (!parsedUser) {
        navigate(`/user/login-register`);
      } else {
        await addFavoriteMovie(parsedUser, movie._id);
        console.log('Movie added to favorites');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Failed to add movie to favorites:', error);
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  return (
    <Box
      onClick={() => checkCard(movie)}
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Card>
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
          }}
          image={movie.image}
          alt={movie.name}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
          }}
        >
          <IconButton
            aria-label="add to favorites"
            sx={{ backgroundColor: 'black' }}
            onClick={handleAddFavorite}
          >
            <BookmarkIcon sx={{ color: '#e5b41a' }} />
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {movie.name}
          </Typography>
          <Box mt={1}>
            {movie.genre && movie.genre.map((genre, index) => (
              <Chip
                key={index}
                label={`#${genre}`}
                sx={{ backgroundColor: '#e5b41a', color: 'white', marginRight: 1, marginBottom: 1 }}
              />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" mt={2}>
            Rating: {movie.rate}
          </Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Movie added to favorites!
        </Alert>
      </Snackbar>
    </Box>
  );
}
