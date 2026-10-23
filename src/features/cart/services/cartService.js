import { CART_STORAGE_KEY } from "../constants/cart";

function isValidCartItem(item) {
  return (
    item &&
    typeof item === "object" &&
    item.product &&
    typeof item.product.id === "number" &&
    typeof item.product.title === "string" &&
    typeof item.product.thumbnail === "string" &&
    Number.isFinite(item.product.price) &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function getCartItems() {
  const savedItems = localStorage.getItem(CART_STORAGE_KEY);

  if (!savedItems) {
    return [];
  }

  try {
    const items = JSON.parse(savedItems);

    if (Array.isArray(items) && items.every(isValidCartItem)) {
      return items;
    }
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }

  localStorage.removeItem(CART_STORAGE_KEY);
  return [];
}

function saveCartItems(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export { getCartItems, saveCartItems };
