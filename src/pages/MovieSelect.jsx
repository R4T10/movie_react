import { useEffect, useState } from 'react';
import { getMoviePagination } from '../services/MovieService';
import { MovieCard } from "../components/Card";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function MovieSelectPage() {
    const [moviesData, setMoviesData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Convert 'page' and 'limit' to numbers
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limit = parseInt(searchParams.get('limit'), 10) || 6;
    const genre = searchParams.get('genre') || '';

    const handlePageChange = (newPage) => {
        navigate(`/movie/list?page=${newPage}&limit=${limit}&genre=${encodeURIComponent(genre)}`);
    };

    useEffect(() => {
        const fetchMoviesSelect = async () => {
            try {
                const response = await getMoviePagination(page, limit, genre);
                if (response.data && response.data.data && response.data.data[0] && response.data.data[0].metaData) {
                    setMoviesData(response.data.data[0].data);
                    setTotalPages(response.data.data[0].metaData[0].totalPages);
                } else {
                    console.error('Unexpected response structure:', response);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
    
        fetchMoviesSelect();
    }, [page, limit, genre]);

    return (
        <div className="p-8">
            <h1 className="font-bold text-2xl px-6 pt-6">{genre}</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 mdl:grid-cols-3 mdl:grid-cols-3 md:grid-cols-4 lgs:grid-cols-4 lgl:grid-cols-4 lg:grid-cols-6 gap-4 px-6 py-7">
                {moviesData.length > 0 ? (
                    moviesData.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-white">No movies available</p>
                )}
            </div>
            <div className="flex justify-between items-center px-6 py-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 bg-gray-800 text-white rounded"
                >
                    Previous
                </button>
                <span className="text-white">Page {page} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages || totalPages === 0}
                    className="px-4 py-2 bg-gray-800 text-white rounded"
                >
                    Next
                </button>
            </div>
            {totalPages === 0 && (
                <p className="text-center text-white">No movies available</p>
            )}
        </div>
    );
}

export default MovieSelectPage;
