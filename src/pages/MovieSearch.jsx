import { useEffect, useState } from 'react';
import { searchMovie } from '../services/MovieService';
import { MovieCard } from "../components/Card";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function MovieSearchPage() {
    const [moviesData, setMoviesData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limit = parseInt(searchParams.get('limit'), 10) || 10;
    const input = searchParams.get('input') || '';

    const handlePageChange = (newPage) => {
        navigate(`/movie/search?page=${newPage}&limit=${limit}&input=${encodeURIComponent(input)}`);
    };

    useEffect(() => {
        const fetchMoviesSelect = async () => {
            try {
                const response = await searchMovie(page, limit, input);
                console.log(response.data)
                if (response.data && response.data.data && response.data.data[0] && response.data.data[0].metaData) {
                    setMoviesData(response.data.data[0].data);
                    setTotalPages(response.data.data[0].metaData[0].totalPages);
                } else {
                    setMoviesData([]);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
    
        fetchMoviesSelect();
    }, [page, limit, input]);

    return (
        <div className="p-8">
            <h1 className="font-bold text-2xl px-6 pt-6 text-white">From your search : "{input}"</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 sml:grid-cols-2 sm:grid-cols-2 mds:grid-cols-3 mdl:grid-cols-4 md:grid-cols-4 lgs:grid-cols-4 lgl:grid-cols-5 lg:grid-cols-5 gap-4 px-6 py-7">
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
        </div>
    );
}

export default MovieSearchPage;
