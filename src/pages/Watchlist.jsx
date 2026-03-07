import React from "react";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast";

const Watchlist = ({ watchlist, removeFromWatchList, toggleWatched }) => {
    return (
        <div className="mb-4">
            <h2 className="text-2xl font-bold mb-5">My Watchlist</h2>
            {watchlist.length === 0 ? (
                <p>No movies in watchlist yet.</p>
            ):(
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watchlist.map((movie) => (
                    <div className="relative" key={movie.imdbID}>
                        <MovieCard key={movie.imdbID} movie = { movie }/>

                        <button onClick={() => {
                            removeFromWatchList(movie.imdbID);
                            toast.error("Removed from watchlist.")
                        }} className="bg-red-500 absolute top-2 right-2 px-3 py-3 rounded-xl hover:scale-105">
                            Remove
                        </button>
                        <button onClick={() => toggleWatched(movie.imdbID)}
                                className={`bg-green-500 absolute rounded-xl top-2 left-2 px-3 py-3 hover:scale-105${
                                    movie.watched ? "bg-green-500" : "bg-gray-600"
                                }`}>{movie.watched ? "Watched" : "Mark as Watched"}</button>
                    </div>
                ))}   
                </div>
                
            )};
        </div>
    );
};

export default Watchlist;