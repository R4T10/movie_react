import { Card, CardMedia, CardContent, Typography, Chip, Box, IconButton} from '@mui/material';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useNavigate } from 'react-router-dom';
import { removeFavoriteMovie } from '../services/UserService';

export function FavoriteCard({ movie }) {
    const navigate = useNavigate();
    const checkCard = (movie) => {
        console.log(movie._id);
        navigate('/movie/detail/' + movie._id);
    }

    const handleRemoveFavorite = async (event) => {
        event.stopPropagation();
        try {
            const user = localStorage.getItem('user');
            const parsedUser = JSON.parse(user);
            if(!parsedUser){
                navigate(`/user/login-register`);
            }else{
                await removeFavoriteMovie(parsedUser, movie._id);
                console.log('Movie removed from favorites');
                window.location.reload();
            }
        } catch (error) {
            console.error('Failed to update favorite status:', error);
        }
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
                        aria-label={'remove from favorites'}
                        sx={{ backgroundColor: 'black' }}
                        onClick={handleRemoveFavorite}
                    >
                        <BookmarkRemoveIcon sx={{ color: '#e5b41a' }} />
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
        </Box>
    );
}
