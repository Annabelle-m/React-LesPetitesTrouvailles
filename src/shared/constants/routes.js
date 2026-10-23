const ROUTES = Object.freeze({
  home: "/",
  products: "/products",
  favorites: "/favorites",
  cart: "/cart",
});

function getProductRoute(productId) {
  return `${ROUTES.products}/${productId}`;
}

export { getProductRoute, ROUTES };
