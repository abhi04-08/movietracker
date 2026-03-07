import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

function Navbar({ theme, toggleTheme, watchlist }) {
    const { favourites } = useContext(FavouritesContext);
    return (
        <nav className="dark:bg-gray-400 flex sticky top-0 z-50 shadow-md justify-items-center p-4 bg-black text-white gap-6 ">
            <Link to="/" className="text-3xl font-bold text-red-500 mr-5"> 
                CineWorld
            </Link>

            <div className="space-x-10">
                <NavLink to="/"
                         className={({ isActive }) => (
                            isActive
                            ? "text-red-600 text-xl "
                            : "text-white text-xl hover:text-red-500"
                        )}>
                        Home
                </NavLink>
                <NavLink to="/favourites"
                         className={({ isActive }) => (
                            isActive
                            ? "text-red-600 text-xl" 
                            : "text-white text-xl hover:text-red-500"
                         )}>
                        Favourites ({favourites.length})
                </NavLink>
                <NavLink to="/watchlist"
                         className={({ isActive }) => (
                            isActive
                            ? "text-red-600 text-xl"
                            : "text-white text-xl hover:text-red-500"
                         )}>
                        Watchlist ({watchlist.length})
                </NavLink>
            </div>

            <button onClick={toggleTheme} className="px-4 py-3 rounded-lg border flex gap-6">
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
        </nav>
    );
}

export default Navbar;