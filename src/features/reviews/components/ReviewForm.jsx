import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button, Input, Textarea } from "../../../shared/components/ui";
import StarRating from "./StarRating";
import {INITIAL_REVIEW_RATING, MAX_REVIEW_RATING, MIN_REVIEW_RATING, REVIEW_COMMENT_MAX_LENGTH, } from "../constants/reviewSubmission";
import "./ReviewForm.css";

const INITIAL_NAME = "";
const INITIAL_COMMENT = "";

function ReviewForm({ onSubmit }) {
  const [name, setName] = useState(INITIAL_NAME);
  const [rating, setRating] = useState(INITIAL_REVIEW_RATING);
  const [comment, setComment] = useState(INITIAL_COMMENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !comment.trim() ||
      rating < MIN_REVIEW_RATING ||
      rating > MAX_REVIEW_RATING
    ) {
      setError("Indiquez votre prénom, une note et un commentaire.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit({
        name: name.trim(),
        rating,
        comment: comment.trim(),
      });

      setName(INITIAL_NAME);
      setRating(INITIAL_REVIEW_RATING);
      setComment(INITIAL_COMMENT);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <p className="review-form__error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      <h3>Donnez votre avis</h3>

      <label htmlFor="review-name">Votre prénom</label>
      <Input
        id="review-name"
        name="name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ex. Camille"
        autoComplete="given-name"
        required
        disabled={isSubmitting}
      />

      <fieldset
        className="review-form__rating-field"
        aria-describedby="review-rating-description"
      >
        <legend className="review-form__label">Votre note *</legend>
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          disabled={isSubmitting}
        />
        <span
          id="review-rating-description"
          className="review-form__rating-description"
        >
          {rating > 0
            ? `${rating} étoile${rating > 1 ? "s" : ""} sur ${MAX_REVIEW_RATING}`
            : "Choisissez une note"}
        </span>
      </fieldset>

      <label htmlFor="review-comment">Votre commentaire</label>
      <Textarea
        id="review-comment"
        name="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Partagez votre avis sur cet article..."
        rows={4}
        maxLength={REVIEW_COMMENT_MAX_LENGTH}
        required
        disabled={isSubmitting}
      />
      <span className="review-form__character-count">
        {comment.length}/{REVIEW_COMMENT_MAX_LENGTH}
      </span>

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours…" : "Publier mon avis"}
      </Button>
    </form>
  );
}

export default ReviewForm;
