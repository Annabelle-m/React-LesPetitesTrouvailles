import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "../../../shared/components/ui";
import { useNotifications } from "../../../shared/components/notifications/useNotifications";
import { NOTIFICATION_TYPES } from "../../../shared/components/notifications/constants";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "./ProductReviews.css";

function ProductReviews({ reviews, addReview }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { notify } = useNotifications();

  const toggleForm = () => {
    setIsFormOpen((isOpen) => !isOpen);
  };

  const handleReviewSubmit = async (review) => {
    const createdReview = await addReview(review);
    setIsFormOpen(false);
    notify({
      type: NOTIFICATION_TYPES.success,
      title: "Avis publié",
      message: `Merci ${createdReview.name}, votre avis a été publié.`,
    });
  };

  return (
    <section className="product-reviews">
      <div className="product-reviews__header">
        <div>
          <h2>Avis de nos clientes</h2>
          <p>
            {reviews.length === 0
              ? "Soyez la première à partager votre avis."
              : `${reviews.length} avis client${reviews.length > 1 ? "s" : ""}`}
          </p>
        </div>

        <Button
          variant="secondary"
          className="product-reviews__toggle"
          onClick={toggleForm}
          aria-expanded={isFormOpen}
        >
          {isFormOpen ? <X size={17} /> : <Plus size={17} />}
          <span>{isFormOpen ? "Annuler" : "Écrire un avis"}</span>
        </Button>
      </div>

      {isFormOpen && (
        <div className="product-reviews__form">
          <ReviewForm onSubmit={handleReviewSubmit} />
        </div>
      )}

      <ReviewList reviews={reviews} />
    </section>
  );
}

export default ProductReviews;
