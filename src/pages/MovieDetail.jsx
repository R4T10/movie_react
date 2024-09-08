import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/MovieService";
import CarouselCard from "../components/CarouselCard";

export function MovieDetailPage() {
  const { id } = useParams();
  const [moviesData, setMoviesData] = useState(null);

  useEffect(() => {
    const fetchMoviesDetail = async () => {
      try {
        const response = await getMovieById(id);
        setMoviesData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMoviesDetail();
  }, [id]);

  return (
    <div className="p-5">
      {moviesData ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={moviesData.image}
              alt={moviesData.name || "Movie Image"}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4 text-white">
              {moviesData.name}
            </h1>
            <p className="text-lg mb-4 text-white">{moviesData.description}</p>
            <p className="text-lg mb-4 text-white">Rate: {moviesData.rate}</p>
            <p className="text-lg mb-4 text-white">
              Genres: {moviesData.genre.join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <p>No movie data available</p>
      )}
        <h1 className="text-3xl font-bold mb-4 text-white mt-5">Other movies</h1>
      <CarouselCard />
    </div>
  );
}

export default MovieDetailPage;
