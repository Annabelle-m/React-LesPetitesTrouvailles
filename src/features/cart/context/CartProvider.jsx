import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContext";
import { MIN_QUANTITY } from "../constants/cart";
import { getCartItems, saveCartItems } from "../services/cartService";
import { useNotifications } from "../../../shared/components/notifications/useNotifications";
import { NOTIFICATION_TYPES } from "../../../shared/components/notifications/constants";

function CartProvider({ children }) {
  const [items, setItems] = useState(getCartItems);
  const { notify } = useNotifications();

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [items],
  );

  useEffect(() => {
    saveCartItems(items);
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    const safeQuantity = Number.isFinite(quantity)
      ? Math.max(MIN_QUANTITY, Math.floor(quantity))
      : MIN_QUANTITY;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        );
      }

      return [...currentItems, { product, quantity: safeQuantity }];
    });

    notify({
      type: NOTIFICATION_TYPES.cartAdded,
      data: {
        product,
        quantity: safeQuantity,
      },
    });
  };

  const removeFromCart = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  };

  const setItemQuantity = (productId, quantity) => {
    const safeQuantity = Number.isFinite(quantity)
      ? Math.max(MIN_QUANTITY, Math.floor(quantity))
      : MIN_QUANTITY;

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: safeQuantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addToCart,
        removeFromCart,
        setItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
