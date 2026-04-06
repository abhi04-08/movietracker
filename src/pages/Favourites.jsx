import React from 'react'
import { useContext } from 'react'
import { FavouritesContext } from '../context/FavouritesContext'
import MovieCard from '../components/MovieCard';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Favourites = () => {
  const { favourites, removeFromFavourites, clearFavourites } = useContext(FavouritesContext);
  return (
    <>
      <Helmet>
        <title>Favorites - CineTracker</title>
        <meta name="description" content="View your movies in CineTracker" />
      </Helmet>
      <div>
        <h1 className='text-3xl font-bold mb-6'>My Favourites</h1>
        <button onClick={() => {
          if (window.confirm("Are you sure you want to delete all the favourites.")) {
            clearFavourites();
            toast.error("All Favourites are cleared 🗑️");
          }
        }}
          className='rounded-xl p-4 mb-5 hover:bg-red-500'>Clear all Favourites 🗑️</button>

        {favourites.length === 0 ? (
          <p>No favourites yet....</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {favourites.map((movie) => (
              <div className='relative' key={movie.imdbID}>
                <MovieCard key={movie.imdbID} movie={movie} />

                <button onClick={() => {
                  removeFromFavourites(movie.imdbID);
                  toast.error("Removed from Favourites")
                }}
                  className='absolute top-2 right-2 bg-red-500 hover:scale-105 text-white rounded-lg p-3'>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favourites;