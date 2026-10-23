import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { getProductRoute } from "../../../shared/constants/routes";
import "./CartItem.css";

function CartItem({ item, onQuantityChange, onRemove }) {
  const { product, quantity } = item;

  return (
    <li className="cart-page__item">
      <Link
        to={getProductRoute(product.id)}
        className="cart-page__product-image"
        aria-label={`Voir ${product.title}`}
      >
        <img src={product.thumbnail} alt="" />
      </Link>

      <div className="cart-page__item-details">
        <p className="cart-page__category">{product.category}</p>
        <Link
          to={getProductRoute(product.id)}
          className="cart-page__product-title"
        >
          {product.title}
        </Link>
        <p className="cart-page__unit-price">{formatPrice(product.price)}</p>
      </div>

      <div className="cart-page__item-actions">
        <div
          className="cart-page__quantity"
          aria-label={`Quantité de ${product.title}`}
        >
          <Button
            type="button"
            onClick={() => onQuantityChange(product.id, quantity - 1)}
            disabled={quantity <= 1}
            aria-label={`Diminuer la quantité de ${product.title}`}
          >
            <Minus size={15} aria-hidden="true" />
          </Button>
          <span aria-live="polite">{quantity}</span>
          <Button
            type="button"
            onClick={() => onQuantityChange(product.id, quantity + 1)}
            aria-label={`Augmenter la quantité de ${product.title}`}
          >
            <Plus size={15} aria-hidden="true" />
          </Button>
        </div>
        <strong className="cart-page__line-total">
          {formatPrice(product.price * quantity)}
        </strong>
        <Button
          variant="ghost"
          type="button"
          className="cart-page__remove"
          onClick={() => onRemove(product.id)}
          aria-label={`Supprimer ${product.title} du panier`}
        >
          <Trash2 size={17} aria-hidden="true" />
          <span>Supprimer</span>
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
