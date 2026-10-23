import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCartContext } from "../hooks/useCartContext";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { ROUTES } from "../../../shared/constants/routes";
import "./CartPage.css";

function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    removeFromCart,
    setItemQuantity,
    clearCart,
  } = useCartContext();
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const handleDemoCheckout = () => {
    setOrderConfirmation({ itemCount, subtotal });
    clearCart();
  };

  if (orderConfirmation) {
    return (
      <section className="cart-page cart-page--confirmation" role="status">
        <span className="cart-page__confirmation-icon">
          <ShoppingBag size={26} aria-hidden="true" />
        </span>
        <p className="cart-page__eyebrow">COMMANDE DE DÉMONSTRATION</p>
        <h1>Merci pour votre commande !</h1>
        <p className="cart-page__confirmation-message">
          Votre commande de {orderConfirmation.itemCount} article
          {orderConfirmation.itemCount === 1 ? "" : "s"} d’un montant de{" "}
          {formatPrice(orderConfirmation.subtotal)} est confirmée.
          <br />
          Aucun paiement réel n’a été effectué.
        </p>
        <Link to={ROUTES.products} className="cart-page__primary-link">
          Continuer mes achats <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-page__header">
        <p className="cart-page__eyebrow">VOTRE SÉLECTION</p>
        <h1>Mon panier</h1>
        <p>
          {itemCount} article{itemCount === 1 ? "" : "s"} dans votre panier
        </p>
      </header>

      {items.length === 0 ? (
        <section className="cart-page__empty">
          <span className="cart-page__empty-icon">
            <ShoppingBag size={25} aria-hidden="true" />
          </span>
          <h2>Votre panier est vide</h2>
          <p>
            Découvrez la collection et ajoutez les pièces qui vous plaisent.
          </p>
          <Link to={ROUTES.products} className="cart-page__primary-link">
            Découvrir la collection <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </section>
      ) : (
        <div className="cart-page__layout">
          <section
            className="cart-page__products"
            aria-label="Articles du panier"
          >
            <ul className="cart-page__list">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onQuantityChange={setItemQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </ul>
            <Link to={ROUTES.products} className="cart-page__continue-link">
              <ArrowRight size={16} aria-hidden="true" />
              Continuer mes achats
            </Link>
          </section>

          <CartSummary
            itemCount={itemCount}
            subtotal={subtotal}
            onCheckout={handleDemoCheckout}
          />
        </div>
      )}
    </div>
  );
}

export default CartPage;
