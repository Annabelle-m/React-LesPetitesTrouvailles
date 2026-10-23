import { useEffect, useState } from "react";
import {
  getProductRating,
  REVIEWS_CHANGED_EVENT,
} from "../../reviews/services/reviewsService";

function useProductRating(product) {
  const [rating, setRating] = useState(() => getProductRating(product));

  useEffect(() => {
    const updateRating = () => setRating(getProductRating(product));

    updateRating();
    window.addEventListener(REVIEWS_CHANGED_EVENT, updateRating);
    return () =>
      window.removeEventListener(REVIEWS_CHANGED_EVENT, updateRating);
  }, [product]);

  return rating;
}

export { useProductRating };
