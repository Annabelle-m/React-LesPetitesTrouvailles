const PRODUCT_SORT = Object.freeze({
  recommended: "default",
  priceAscending: "price-asc",
  priceDescending: "price-desc",
  nameAscending: "name-asc",
  ratingDescending: "rating-desc",
});
const PRODUCT_SORT_LOCALE = "fr";

const PRODUCT_SORT_OPTIONS = [
  { label: "Recommandés", value: PRODUCT_SORT.recommended },
  { label: "Prix croissant", value: PRODUCT_SORT.priceAscending },
  { label: "Prix décroissant", value: PRODUCT_SORT.priceDescending },
  { label: "Nom A à Z", value: PRODUCT_SORT.nameAscending },
  { label: "Meilleures notes", value: PRODUCT_SORT.ratingDescending },
];

export { PRODUCT_SORT, PRODUCT_SORT_LOCALE, PRODUCT_SORT_OPTIONS };
