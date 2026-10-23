import { useEffect, useState } from "react";
import { getProducts } from "../services/productsService";
import {
  getProductRating,
  REVIEWS_CHANGED_EVENT,
} from "../../reviews/services/reviewsService";

const INITIAL_PRODUCTS = [];
const INITIAL_LOADING = true;
const INITIAL_ERROR = null;

const useProducts = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(INITIAL_LOADING);
  const [error, setError] = useState(INITIAL_ERROR);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const fetchedProducts = await getProducts();
        setProducts(
          fetchedProducts.map((product) => ({
            ...product,
            rating: getProductRating(product),
          })),
        );
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const refreshProductRatings = () => {
      setProducts((currentProducts) =>
        currentProducts.map((product) => ({
          ...product,
          rating: getProductRating(product),
        })),
      );
    };

    window.addEventListener(REVIEWS_CHANGED_EVENT, refreshProductRatings);
    return () =>
      window.removeEventListener(REVIEWS_CHANGED_EVENT, refreshProductRatings);
  }, []);

  return { products, isLoading, error };
};

export { useProducts };
