import React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieCard } from "../components/Card";
import { getRandomMovieList } from "../services/MovieService";

export function CarouselCardOth() {
    const [moviesData, setMoviesData] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await getRandomMovieList();
                setMoviesData(movies.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMovies();
    }, []);

    const settings = {
        className: "normal-carousel",
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3, 
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 2, 
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 690,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, 
                settings: {
                    slidesToShow: 1, 
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full mx-auto px-10 py-10 relative">
            <Slider {...settings}>
                {moviesData.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </Slider>
        </div>
    );
}

export default CarouselCardOth;
