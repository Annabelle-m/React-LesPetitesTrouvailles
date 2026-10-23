import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext doit être utilisé dans CartProvider.");
  }

  return context;
}

export { useCartContext };
