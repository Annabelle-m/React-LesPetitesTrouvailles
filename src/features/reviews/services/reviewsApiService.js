import { API_ENDPOINTS, apiPost } from "../../../shared/api/apiClient";
import {
  REVIEW_AUTHOR_USER_ID,
  REVIEW_SOURCE_API,
} from "../constants/reviewSubmission";

async function createProductReview(productId, review) {
  const createdComment = await apiPost(API_ENDPOINTS.addComment, {
    body: review.comment,
    postId: productId,
    userId: REVIEW_AUTHOR_USER_ID,
    reviewerName: review.name,
    rating: review.rating,
  });

  if (
    !createdComment ||
    typeof createdComment !== "object" ||
    !Number.isInteger(createdComment.id) ||
    typeof createdComment.body !== "string"
  ) {
    throw new Error("La réponse de création de l’avis est invalide.");
  }

  return {
    ...review,
    id: crypto.randomUUID(),
    apiId: createdComment.id,
    name: createdComment.reviewerName ?? review.name,
    rating: createdComment.rating ?? review.rating,
    comment: createdComment.body,
    date: new Date().toISOString(),
    source: REVIEW_SOURCE_API,
  };
}

const getProductReviews = (product) => {
  if (!Array.isArray(product.reviews)) {
    return [];
  }

  return product.reviews.map((review, index) => ({
    id: `api-${product.id}-${index}`,
    name: review.reviewerName,
    rating: review.rating,
    comment: review.comment,
    date: review.date,
    source: REVIEW_SOURCE_API,
  }));
};

export { createProductReview, getProductReviews };
