import { createContext, useState, useEffect } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState(() => {
        const stored = localStorage.getItem("favourites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    const addToFavourites = (movie) => {
        setFavourites((prev) => {
            if (prev.find((item) => item.imdbID === movie.imdbID)) {
                return prev;
            }
            return [...prev, movie];
        });
    };

    const removeFromFavourites = (id) => {
        setFavourites((prev) => 
            prev.filter((movie) => movie.imdbID != id)
        );
    };

    const clearFavourites = () => {
        setFavourites([]);
    }

    return(
        <FavouritesContext.Provider value= {{ favourites, addToFavourites, removeFromFavourites, clearFavourites}}>
            {children}
        </FavouritesContext.Provider>
    );
};