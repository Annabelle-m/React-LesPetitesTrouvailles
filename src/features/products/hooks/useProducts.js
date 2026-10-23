import { useEffect, useRef, useState } from "react";
import { getProducts } from "../services/productsService";
import {
  getProductRating,
  REVIEWS_CHANGED_EVENT,
} from "../../reviews/services/reviewsService";

const INITIAL_PRODUCTS = [];
const INITIAL_LOADING = true;
const INITIAL_ERROR = null;
const EMPTY_CATEGORIES = [];

const useProducts = ({
  searchTerm = "",
  categories = EMPTY_CATEGORIES,
} = {}) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(INITIAL_LOADING);
  const [error, setError] = useState(INITIAL_ERROR);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchProducts = async () => {
      try {
        if (!hasLoadedRef.current) {
          setIsLoading(true);
        }
        setError(null);

        const fetchedProducts = await getProducts({
          searchTerm,
          categories,
        });

        if (isCurrentRequest) {
          setProducts(
            fetchedProducts.map((product) => ({
              ...product,
              rating: getProductRating(product),
            })),
          );
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setError(requestError.message);
        }
      } finally {
        if (isCurrentRequest) {
          hasLoadedRef.current = true;
          setIsLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(fetchProducts, searchTerm.trim() ? 300 : 0);

    return () => {
      isCurrentRequest = false;
      clearTimeout(timeoutId);
    };
  }, [searchTerm, categories]);

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
