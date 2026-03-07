import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

function Navbar({ theme, toggleTheme, watchlist }) {
    const { favourites } = useContext(FavouritesContext);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        // <nav className="dark:bg-gray-400 flex sticky top-0 z-50 shadow-md justify-items-center p-4 bg-black text-white gap-6 ">
        //     <Link to="/" className="text-3xl font-bold text-red-500 mr-5"> 
        //         CineWorld
        //     </Link>

        //     <div className="space-x-10">
        //         <NavLink to="/"
        //                  className={({ isActive }) => (
        //                     isActive
        //                     ? "text-red-600 text-xl "
        //                     : "text-white text-xl hover:text-red-500"
        //                 )}>
        //                 Home
        //         </NavLink>
        //         <NavLink to="/favourites"
        //                  className={({ isActive }) => (
        //                     isActive
        //                     ? "text-red-600 text-xl" 
        //                     : "text-white text-xl hover:text-red-500"
        //                  )}>
        //                 Favourites ({favourites.length})
        //         </NavLink>
        //         <NavLink to="/watchlist"
        //                  className={({ isActive }) => (
        //                     isActive
        //                     ? "text-red-600 text-xl"
        //                     : "text-white text-xl hover:text-red-500"
        //                  )}>
        //                 Watchlist ({watchlist.length})
        //         </NavLink>
        //     </div>

        //     <button onClick={toggleTheme} className="px-4 py-3 rounded-lg border flex gap-6">
        //         {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        //     </button>
        // </nav>

        <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
            <div className="flex items-center justify-between p-4">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-red-500">
                    CineWorld
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-600 text-lg"
                                : "hover:text-red-500"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/favourites"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-600 text-lg"
                                : "hover:text-red-500"
                        }
                    >
                        Favourites ({favourites.length})
                    </NavLink>

                    <NavLink
                        to="/watchlist"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-600 text-lg"
                                : "hover:text-red-500"
                        }
                    >
                        Watchlist ({watchlist.length})
                    </NavLink>

                    <button
                        onClick={toggleTheme}
                        className="px-3 py-2 border rounded-lg"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="flex flex-col gap-4 p-4 bg-black md:hidden">

                    <NavLink to="/" onClick={() => setMenuOpen(false)}>
                        Home
                    </NavLink>

                    <NavLink to="/favourites" onClick={() => setMenuOpen(false)}>
                        Favourites ({favourites.length})
                    </NavLink>

                    <NavLink to="/watchlist" onClick={() => setMenuOpen(false)}>
                        Watchlist ({watchlist.length})
                    </NavLink>

                    <button
                        onClick={toggleTheme}
                        className="px-3 py-2 border rounded-lg w-fit"
                    >
                        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>

                </div>
            )}
        </nav>
    );
}

export default Navbar;