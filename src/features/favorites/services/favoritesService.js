const FAVORITES_STORAGE_KEY = "petites-trouvailles-favorites";

const getFavorites = () => {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch {
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

export { getFavorites, saveFavorites };
