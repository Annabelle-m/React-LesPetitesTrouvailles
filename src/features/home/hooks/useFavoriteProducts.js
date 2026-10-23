import { useEffect, useMemo } from "react";
import {
  FEATURED_PRODUCT_COUNT,
  FEATURED_PRODUCTS_REFRESH_MS,
  FEATURED_PRODUCTS_STORAGE_KEY,
} from "../constants/featuredProducts";

const getRandomProducts = (products) => {
  const shuffledProducts = [...products];

  for (let index = shuffledProducts.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledProducts[index], shuffledProducts[randomIndex]] = [
      shuffledProducts[randomIndex],
      shuffledProducts[index],
    ];
  }

  return shuffledProducts.slice(0, FEATURED_PRODUCT_COUNT);
};

function getSavedProducts(products) {
  const savedFavorites = localStorage.getItem(FEATURED_PRODUCTS_STORAGE_KEY);

  if (!savedFavorites) {
    return null;
  }

  try {
    const savedData = JSON.parse(savedFavorites);
    const savedProducts = Array.isArray(savedData.productIds)
      ? savedData.productIds
          .map((id) => products.find((product) => product.id === id))
          .filter(Boolean)
      : [];

    if (
      Date.now() < savedData.expiresAt &&
      savedProducts.length === FEATURED_PRODUCT_COUNT
    ) {
      return savedProducts;
    }
  } catch {
    return null;
  }

  return null;
}

function saveFeaturedProducts(products) {
  const productIds = products.map((product) => product.id);

  const savedFavorites = localStorage.getItem(FEATURED_PRODUCTS_STORAGE_KEY);

  if (savedFavorites) {
    try {
      const savedData = JSON.parse(savedFavorites);
      const isCurrentSelection =
        Date.now() < savedData.expiresAt &&
        Array.isArray(savedData.productIds) &&
        savedData.productIds.length === productIds.length &&
        savedData.productIds.every((id, index) => id === productIds[index]);

      if (isCurrentSelection) {
        return;
      }
    } catch {
      localStorage.removeItem(FEATURED_PRODUCTS_STORAGE_KEY);
    }
  }

  localStorage.setItem(
    FEATURED_PRODUCTS_STORAGE_KEY,
    JSON.stringify({
      productIds,
      expiresAt: Date.now() + FEATURED_PRODUCTS_REFRESH_MS,
    }),
  );
}

function useFavoriteProducts(products) {
  const favoriteProducts = useMemo(() => {
    if (products.length === 0) {
      return [];
    }

    return getSavedProducts(products) ?? getRandomProducts(products);
  }, [products]);

  useEffect(() => {
    if (favoriteProducts.length === FEATURED_PRODUCT_COUNT) {
      saveFeaturedProducts(favoriteProducts);
    }
  }, [favoriteProducts]);

  return favoriteProducts;
}

export { useFavoriteProducts };
