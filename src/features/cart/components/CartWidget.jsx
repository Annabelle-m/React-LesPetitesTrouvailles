import { ShoppingBag } from "lucide-react";
import { useCartContext } from "../hooks/useCartContext";
import "./CartWidget.css";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";

function CartWidget() {
  const { itemCount } = useCartContext();

  return (
    <div className="cart-widget">
      <NavLink
        to={ROUTES.cart}
        className={({ isActive }) =>
          `cart-widget__toggle ${isActive ? "cart-widget__toggle--active" : ""}`
        }
        aria-label={`Panier, ${itemCount} article${itemCount === 1 ? "" : "s"}`}
      >
        <ShoppingBag size={20} strokeWidth={1.7} aria-hidden="true" />
        <span>Panier</span>
        <span className="cart-widget__count" aria-hidden="true">
          {itemCount}
        </span>
      </NavLink>
    </div>
  );
}

export default CartWidget;
