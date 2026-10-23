import { createContext, useContext, useState } from "react";
import { getFavorites, saveFavorites } from "../services/favoritesService";

const FavoritesContext = createContext(null);

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getFavorites);

  const addFavorite = (product) => {
    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite.id === product.id,
    );

    if (isAlreadyFavorite) {
      return;
    }

    const updatedFavorites = [...favorites, product];

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== productId,
    );

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const isFavorite = (productId) => {
    return favorites.some((favorite) => favorite.id === productId);
  };

  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
      return;
    }

    addFavorite(product);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};

export { FavoritesProvider, useFavoritesContext };
