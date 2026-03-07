import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Favourites from './pages/Favourites'
import MovieDetails from './pages/MovieDetails'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'

const App = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.getItem("theme", newTheme);
  };

  useEffect(() => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
  }, [theme]);

  const addToWatchList = (movie) => {
    const exists = watchlist.some(
      (item) => item.imdbID === movie.imdbID
    );
    if(exists){
      return;
    }

    const updatedList = [...watchlist, {...movie, watched: false}];
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
    toast.success("Added to watchlist");
  };

  const removeFromWatchList = (id) => {
    const updatedList = watchlist.filter(
      movie => movie.imdbID != id
    );
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  const toggleWatched = (id) => {
    const updatedList = watchlist.map((movie) => 
        movie.imdbID === id
        ? {...movie, watched: !movie.watched}
        : movie
      );

      setWatchlist(updatedList);
      localStorage.setItem("watchlist", JSON.stringify(updatedList));
  }

  return (
    <div className='min-h-screen bg-white dark:bg-black dark:text-white'>
      <Toaster position='top-right'/>
      <NavBar theme={theme} toggleTheme={toggleTheme} watchlist={watchlist}/>

      <div className='p-6'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favourites" element={<Favourites/>} />
          <Route path="/movie/:id" element={<MovieDetails watchlist={watchlist} addToWatchList={addToWatchList} removeFromWatchList={removeFromWatchList}/>} />
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} removeFromWatchList={removeFromWatchList} toggleWatched={toggleWatched}/>}/>
        </Routes> 
      </div>
    </div>
  );
}

export default App;