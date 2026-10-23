import { Star } from "lucide-react";
import { Button } from "../../../shared/components/ui";
import "./StarRating.css";

import { MAX_REVIEW_RATING } from "../constants/reviewSubmission";

const STAR_COUNT = MAX_REVIEW_RATING;

function StarRating({
  rating,
  onRatingChange,
  readOnly = false,
  disabled = false,
}) {
  const safeRating = Number.isFinite(rating)
    ? Math.min(Math.max(rating, 0), STAR_COUNT)
    : 0;
  const accessibleRating = safeRating.toFixed(1).replace(".", ",");

  return (
    <div
      className="star-rating"
      role={readOnly ? "img" : "group"}
      aria-label={`Note : ${accessibleRating} sur ${STAR_COUNT}`}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const starValue = index + 1;

        if (readOnly) {
          const fillPercentage =
            Math.min(Math.max(safeRating - index, 0), 1) * 100;

          return (
            <span
              key={starValue}
              className="star-rating__visual"
              style={{ "--star-fill": `${fillPercentage}%` }}
              aria-hidden="true"
            >
              <Star className="star-rating__star" />
              <span className="star-rating__fill">
                <Star className="star-rating__star" fill="currentColor" />
              </span>
            </span>
          );
        }

        const isActive = starValue <= safeRating;

        return (
          <Button
            key={starValue}
            className="star-rating__button"
            onClick={() => onRatingChange(starValue)}
            disabled={disabled}
            aria-label={`${starValue} étoile${starValue > 1 ? "s" : ""}`}
            aria-pressed={safeRating === starValue}
          >
            <Star
              className={`star-rating__star ${
                isActive ? "star-rating__star--active" : ""
              }`}
              fill={isActive ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </Button>
        );
      })}
    </div>
  );
}

export default StarRating;
