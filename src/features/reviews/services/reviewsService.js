import {
  MAX_REVIEW_RATING,
  MIN_REVIEW_RATING,
} from "../constants/reviewSubmission";

const REVIEWS_STORAGE_KEY = "petites-trouvailles-reviews";
const REVIEWS_CHANGED_EVENT = "petites-trouvailles-reviews-changed";

const calculateAverageRating = (reviews, fallbackRating = 0) => {
  const ratings = reviews
    .map((review) => review.rating)
    .filter(
      (rating) =>
        Number.isFinite(rating) &&
        rating >= MIN_REVIEW_RATING &&
        rating <= MAX_REVIEW_RATING,
    );

  if (ratings.length === 0) {
    return Number.isFinite(fallbackRating) ? fallbackRating : 0;
  }

  return ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
};

const getReviews = (productId) => {
  const savedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);

  if (!savedReviews) {
    return [];
  }

  try {
    const reviewsByProduct = JSON.parse(savedReviews);

    return reviewsByProduct[productId] || [];
  } catch {
    localStorage.removeItem(REVIEWS_STORAGE_KEY);
    return [];
  }
};

const saveReview = (productId, review) => {
  const savedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
  let reviewsByProduct = {};

  if (savedReviews) {
    try {
      reviewsByProduct = JSON.parse(savedReviews);
    } catch {
      reviewsByProduct = {};
    }
  }

  const productReviews = reviewsByProduct[productId] || [];

  reviewsByProduct[productId] = [...productReviews, review];

  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviewsByProduct));
  window.dispatchEvent(new Event(REVIEWS_CHANGED_EVENT));
};

const getProductRating = (product) => {
  if (!product) {
    return 0;
  }

  const reviews = [
    ...(Array.isArray(product.reviews) ? product.reviews : []),
    ...getReviews(product.id),
  ];

  return calculateAverageRating(reviews, product.rating);
};

export {
  calculateAverageRating,
  getProductRating,
  getReviews,
  REVIEWS_CHANGED_EVENT,
  saveReview,
};
