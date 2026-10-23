import { ArrowRight } from "lucide-react";
import { Button } from "../../../shared/components/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import "./CartSummary.css";

function CartSummary({ itemCount, subtotal, onCheckout }) {
  return (
    <aside className="cart-page__summary" aria-label="Résumé de commande">
      <h2>Résumé de commande</h2>
      <div className="cart-page__summary-row">
        <span>
          Sous-total ({itemCount} article{itemCount === 1 ? "" : "s"})
        </span>
        <strong>{formatPrice(subtotal)}</strong>
      </div>
      <div className="cart-page__summary-total">
        <span>Total</span>
        <strong>{formatPrice(subtotal)}</strong>
      </div>
      <p className="cart-page__demo-note">
        Parcours de démonstration : aucun paiement réel ne sera effectué.
      </p>
      <Button
        variant="primary"
        type="button"
        className="cart-page__checkout"
        onClick={onCheckout}
      >
        Simuler le paiement <ArrowRight size={17} aria-hidden="true" />
      </Button>
    </aside>
  );
}

export default CartSummary;
