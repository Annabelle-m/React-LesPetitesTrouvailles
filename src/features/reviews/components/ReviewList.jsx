import StarRating from "./StarRating";
import "./ReviewList.css";

const DATE_FORMAT_OPTIONS = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p className="review-list__empty">Aucun avis pour le moment.</p>;
  }

  return (
    <div
      className="review-list"
      role="region"
      aria-label="Liste des avis"
      tabIndex={0}
    >
      {reviews.map((review) => (
        <article className="review-list__item" key={review.id}>
          <div className="review-list__header">
            <h4>{review.name}</h4>

            <time dateTime={review.date}>
              {new Date(review.date).toLocaleDateString(
                "fr-FR",
                DATE_FORMAT_OPTIONS,
              )}
            </time>
          </div>

          <StarRating rating={review.rating} readOnly />

          <p className="review-list__comment">{review.comment}</p>
        </article>
      ))}
    </div>
  );
}

export default ReviewList;
