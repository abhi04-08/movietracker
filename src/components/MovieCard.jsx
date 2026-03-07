import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
        <div className='bg-gray-800 rounded-xl mt-6 overflow-hidden hover:scale-105 transition-transform duration-300' >
            <img src={movie.Poster !== "N/A" ? movie.Poster : ""} 
                alt={movie.Title}
                width="350" 
                className='h-80 cursor-pointer'
            />
            <div className='p-4'>
                <h2 className='text-lg font-semibold dark:text-white text-white'>{movie.Title}</h2>
                <p className='text-sm text-gray-400'>{movie.Year}</p>
            </div>
        </div>
    </Link>
  ) 
}

export default MovieCard