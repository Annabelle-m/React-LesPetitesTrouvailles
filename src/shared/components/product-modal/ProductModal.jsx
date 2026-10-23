import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "../ui";
import "./ProductModal.css";

function ProductModal({ children }) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const closeModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = [
        ...(dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? []),
      ].filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialogRef.current?.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [closeModal]);

  return (
    <div
      className="product-modal__overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <section
        ref={dialogRef}
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        tabIndex="-1"
      >
        <Button
          variant="icon"
          ref={closeButtonRef}
          className="product-modal__close"
          type="button"
          onClick={closeModal}
          aria-label="Fermer la fenêtre"
        >
          <X size={22} />
        </Button>

        {children}
      </section>
    </div>
  );
}

export default ProductModal;
