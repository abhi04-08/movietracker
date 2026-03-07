import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { fetchMovieDetails } from '../services/api';
import { FavouritesContext } from '../context/FavouritesContext';
import toast from 'react-hot-toast';

const MovieDetails = ({ addToWatchList, removeFromWatchList, watchlist }) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favourites, addToFavourites, removeFromFavourites } = useContext(FavouritesContext);
    // const isFavourite = favourites.some(movie => movie.id === Number(id));

    useEffect(() => {
      const fetchDetails = async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await fetchMovieDetails(id);

          if(!res || res.Response === "False") {
            throw new Error("Movie not found.");
          }
          setMovie(res);
        } catch(err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }, [id]);
  
    if (loading) {
      return <p className='text-2xl text-center text-red-300 mt-10'>Loading.......</p>
    }
    

    if (error) {
      return (
        <div className='text-center mt-10'>
          <h2 className='text-red-500 text-3xl mt-4'>{error}</h2>
          <button onClick={() => navigate(-1)}
                  className='bg-red-600 p-3 rounded-xl mt-5'> Go Back</button>
      </div>
    )};

    if(!movie) return null;
    const isFavourite = favourites.some((item) => item.imdbID === movie.imdbID);

    const handleToggleFavourite = () => {
      if (isFavourite) {
        removeFromFavourites(movie.imdbID);
        toast.error("Removed from Favourites.")
      } else{
        addToFavourites(movie);
        toast.success("Added to Favourites 🎉")
      }
    }

    const isWatchlist = watchlist.some((item) => item.imdbID === movie.imdbID)
    const handleToggleWatchlist = () => {
      if (isWatchlist) {
        removeFromWatchList(movie.imdbID);
        toast.error("Removed from Watchlist")
      } else {
        addToWatchList(movie);
        toast.success("Added to watchlist");
      }
    }

    return (
      <div className='min-h-screen dark:bg-gray-900 bg-white text-white'>
        <button onClick={() => navigate(-1)} className='bg-red-600 p-3 text-white rounded-xl mb-5 hover:bg-green-600 hover:scale-95 transition-transform duration-300'>← Back</button>

        <div className='p-6 bg-gray-500 rounded-xl flex flex-col md:flex-row gap-5'>
          <img src={
            movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"
          } 
          alt={movie.Title} 
          className='w-200 rounded-xl'/>
          <div>
            <h1 className='text-white text-4xl font-bold'>{movie.Title}</h1>
            <button onClick={handleToggleFavourite}
                  className={`rounded-xl p-3 mt-3 mb-3 mr-3 bg-green-400 hover:transition-transform duration-300${
                    isFavourite
                      ? "bg-gray-900 hover:bg-red-500 hover:scale-105"
                      : "bg-green-400 hover:bg-green-500 hover:scale-105"
                  }`}>
                    {isFavourite ? "Remove from Favourites" : "Add to Favourites 🤍"}
                  </button>
            <button className={`px-3 py-3 gap-6 bg-green-400 rounded-xl hover:transition-transform duration-300${
                            isWatchlist
                            ? "bg-gray-900 hover:bg-red-500 hover:scale-105"
                            : "bg-green-400 hover:bg-green-500 hover:scale-105"
                        }`}
                    onClick={handleToggleWatchlist}><strong>+ </strong>{isWatchlist ?"Remove from watchlist" : "Add to Watchlist"}</button>
            <p className='text-gray-100 mb-2'>{movie.Year} | {movie.Genre}</p>
            <p className='mb-4'>{movie.Plot}</p>
            <p><strong>Actors:</strong>{movie.Actors}</p>
            <p><strong>IMDB Rating:</strong>⭐ {movie.imdbRating}</p>
          </div>
        </div>
      </div>
      
    );
};

export default MovieDetails;