import { useEffect, useState } from "react";
import { getReviews, saveReview } from "../services/reviewsService";
import {
  createProductReview,
  getProductReviews,
} from "../services/reviewsApiService";

const INITIAL_REVIEWS = [];

const useProductReviews = (product) => {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  useEffect(() => {
    if (!product) {
      setReviews(INITIAL_REVIEWS);
      return;
    }

    const apiReviews = getProductReviews(product);
    const localReviews = getReviews(product.id);

    setReviews([...localReviews, ...apiReviews]);
  }, [product]);

  const addReview = async (review) => {
    if (!product) {
      throw new Error("Impossible d’ajouter un avis sans produit.");
    }

    const newReview = await createProductReview(product.id, review);

    saveReview(product.id, newReview);

    setReviews((currentReviews) => [newReview, ...currentReviews]);

    return newReview;
  };

  return { reviews, addReview };
};

export { useProductReviews };
