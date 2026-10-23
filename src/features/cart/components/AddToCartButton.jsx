import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../shared/components/ui";
import { useCartContext } from "../hooks/useCartContext";
import { MAX_SELECTION_QUANTITY, MIN_QUANTITY } from "../constants/cart";
import "./AddToCartButton.css";

function AddToCartButton({ product }) {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  const changeQuantity = (amount) => {
    setQuantity((currentQuantity) =>
      Math.min(
        MAX_SELECTION_QUANTITY,
        Math.max(MIN_QUANTITY, currentQuantity + amount),
      ),
    );
  };

  return (
    <div className="add-to-cart">
      <div className="add-to-cart__quantity">
        <Button
          type="button"
          className="add-to-cart__quantity-button"
          onClick={() => changeQuantity(-1)}
          disabled={quantity === MIN_QUANTITY}
          aria-label={`Diminuer la quantité de ${product.title}`}
        >
          <Minus size={14} aria-hidden="true" />
        </Button>
        <output
          className="add-to-cart__quantity-value"
          aria-label={`Quantité : ${quantity}`}
        >
          {quantity}
        </output>
        <Button
          type="button"
          className="add-to-cart__quantity-button"
          onClick={() => changeQuantity(1)}
          disabled={quantity === MAX_SELECTION_QUANTITY}
          aria-label={`Augmenter la quantité de ${product.title}`}
        >
          <Plus size={14} aria-hidden="true" />
        </Button>
      </div>
      <Button
        variant="primary"
        type="button"
        className="add-to-cart__submit"
        onClick={() => addToCart(product, quantity)}
        aria-label={`Ajouter ${quantity} ${quantity === 1 ? "exemplaire" : "exemplaires"} de ${product.title} au panier`}
      >
        <ShoppingBag size={16} aria-hidden="true" />
        <span>Ajouter</span>
      </Button>
    </div>
  );
}

export default AddToCartButton;
