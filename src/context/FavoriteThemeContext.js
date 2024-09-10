
import { createContext, useContext, useState } from "react";
const FavoriteThemeContext = createContext([]);

export function FavoriteThemeContextProvider({children}) {
    const [favorite, setFavorite] = useState([]);
    const isFavorite = (id) => {
        return favorite.findIndex(item => item.id == id) > -1;
    }

    const toggleFavorite = (data) => {
        const id = data.id
        const existed = isFavorite(id)
        if(existed) {
            setFavorite((prevItems) => prevItems.filter((value) => value.id != id ))
        } else {
            setFavorite((prevItems) => [...prevItems, data])
        }
    }

    return (
        <FavoriteThemeContext.Provider value={{favorite, isFavorite, toggleFavorite, setFavorite}}>
            {children}
        </FavoriteThemeContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoriteThemeContext);
}

