import React from 'react'
import { useEffect, useState } from 'react'
import { searchMovies } from '../services/api'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { Helmet } from 'react-helmet-async'

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    });

    useEffect(() => {
        if (!debouncedQuery) {
            setMovies([]);
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            const res = await searchMovies(debouncedQuery);
            console.log(res);
            setMovies(res);
            setLoading(false);
        };

        fetchData();
    }, [debouncedQuery]);

    return (
        <>
            <Helmet>
                <title>CineTracker</title>
                <meta name="description" content="Search movies in CineTracker" />
            </Helmet>
            <div>
                <h1 className='text-xl font-bold text-red-500 mb-6'>Track Movies & Manage Your Watchlist Easily</h1>
                <p className='text-md font-semibold mb-6'>
                    CineTracker is a free movie tracker app that helps you manage your watchlist,
                    save favorite movies, and organize what to watch next. Discover, track, and
                    never miss your favorite films again.
                </p>
                <h1 className='text-3xl font-bold mb-6'>Search Movies</h1>
                <input type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search Movies....'
                    className='p-2 dark:border-white rounded-xl text-black w-full border-black' />

                {loading ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4'>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;