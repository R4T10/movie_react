import React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/carousel.css'
import { useNavigate } from 'react-router-dom';
import { getMovieListNewest } from '../services/MovieService'

export function CarouselCenter() {
  const navigate = useNavigate();
  const [moviesData, setMoviesData] = useState([]);
  const goToDetail = (movie) => {
    console.log(movie._id)
    navigate('/movie/detail/'+movie._id)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovieListNewest();
        setMoviesData(movies.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);
  
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 1000,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  
  return (
    <div className="w-full mx-auto px-10 py-10 relative">
      <Slider {...settings}>
        {moviesData.map((movie, index) => (
          <div
          onClick={()=>goToDetail(movie)}
            key={index}
            className="relative flex items-center justify-center rounded-lg shadow-lg h-80 overflow-hidden"
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <span className="absolute bottom-4 left-4 text-white font-bold text-2xl">
              {movie.name}
            </span>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarouselCenter;
