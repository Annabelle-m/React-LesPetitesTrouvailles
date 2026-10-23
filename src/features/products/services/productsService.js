import { API_ENDPOINTS, apiGet } from "../../../shared/api/apiClient";

const PRODUCT_CATEGORIES = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
  "tops",
];

const getProducts = async () => {
  // Promise.all attend que toutes les requêtes soient terminées
  const results = await Promise.all(
    PRODUCT_CATEGORIES.map((category) =>
      apiGet(`${API_ENDPOINTS.products}/category/${category}`),
    ),
  );

  return results.flatMap((result) => result.products);
};

export { getProducts };
