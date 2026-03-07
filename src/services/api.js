import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
    const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${query}`);
    return response.data.Search ?? [];
};

export const fetchMovieDetails = async (id) => {
    const res = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`);    
    return res.data;
};

// export const getMovieDetails = async (id) => {
//     const res = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${id}`);
//     return res.data;
// };