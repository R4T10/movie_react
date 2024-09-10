import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/MovieService";
import { addFavoriteMovie, removeFavoriteMovie, checkFavorite } from "../services/UserService";
import CarouselCardOth from "../components/CarouselCardOth";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moviesData, setMoviesData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fetchMoviesDetail = async () => {
      try {
        const response = await getMovieById(id);
        setMoviesData(response.data.data);
        console.log(response.data.data);

        const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        const favoriteResponse = await checkFavorite(parsedUser, id);
        console.log(favoriteResponse.data.isFavorite)
        setIsFavorite(favoriteResponse.data.isFavorite);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMoviesDetail();
  }, [id]);

  const handleAddFavorite = async () => {
    try {
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      if (!parsedUser) {
        navigate(`/user/login-register`);
      } else {
        await addFavoriteMovie(parsedUser, moviesData._id);
        setOpenSnackbar(true);
        setIsFavorite(true)
      }

    } catch (error) {
      console.error('Failed to add movie to favorites:', error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);

      await removeFavoriteMovie(parsedUser, moviesData._id);
      setIsFavorite(false);
    } catch (error) {
      console.error('Failed to remove movie from favorites:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="p-5 bg-black-900 min-h-screen text-white">
      {moviesData ? (
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="md:w-1/2">
              <img
                src={moviesData.image}
                alt={moviesData.name || "Movie Image"}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4 text-yellow-400">
                {moviesData.movie_name}
              </h1>
              <p className="text-xl mb-6 font-bold text-gray-300">
                {moviesData.releaseYear}
              </p>
              <p className="text-xl mb-6 italic text-gray-300">
                {moviesData.description}
              </p>
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-400">Rating: </span>
                <span className="text-lg text-yellow-300">{moviesData.rate} / 5</span>
              </div>
              <div>
                <span className="font-semibold text-lg text-gray-400">Genres: </span>
                <Box mt={1}>
                  {moviesData.genre && moviesData.genre.map((genre, index) => (
                    <Chip
                      key={index}
                      label={`#${genre}`}
                      sx={{ backgroundColor: '#e5b41a', color: 'white', marginRight: 1, marginBottom: 1 }}
                    />
                  ))}
                </Box>
              </div>

              <div className="mt-6">
                {isFavorite ? (
                  <Button variant="contained" color="secondary" onClick={handleRemoveFavorite}>
                    Remove from Favorites
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleAddFavorite}>
                    Add to Favorites
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl font-bold mb-4 text-white">Other Movies You Might Like</h1>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <CarouselCardOth />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">No movie data available</p>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Movie added to favorites!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MovieDetailPage;
