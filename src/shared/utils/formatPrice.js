const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function formatPrice(price) {
  return priceFormatter.format(price);
}

export { formatPrice };
