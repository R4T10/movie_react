import React from "react";
import { useEffect, useState } from "react";
import { FavoriteCard } from "../components/FavoriteCard";
import { getFavorite } from "../services/UserService"
export function FavoritePage() {
    const [moviesData, setMoviesData] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const user = localStorage.getItem('user');
                const parsedUser = JSON.parse(user);
                const movies = await getFavorite(parsedUser);
                console.log(movies)
                setMoviesData(movies.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMovies();
    }, []);
    return (
        <div className="p-8">
            <h1 className="font-bold text-2xl px-6 pt-6 text-white">My favorite</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 sml:grid-cols-2 sm:grid-cols-2 mds:grid-cols-3 mdl:grid-cols-4 md:grid-cols-4 lgs:grid-cols-4 lgl:grid-cols-5 lg:grid-cols-5 gap-4 px-6 py-7">
                {moviesData.length > 0 ? (
                    moviesData.map((movie, index) => (
                        <FavoriteCard key={index} movie={movie} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-white">No favorite movies</p>
                )}
            </div>
        </div>
    );
}

export default FavoritePage;

