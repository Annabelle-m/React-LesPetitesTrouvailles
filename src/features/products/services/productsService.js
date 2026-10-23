import { API_ENDPOINTS, apiGet } from "../../../shared/api/apiClient";

const PRODUCT_CATEGORIES = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
  "tops",
];

const getProducts = async ({ searchTerm, categories }) => {
  const selectedCategories =
    categories.length > 0 ? categories : PRODUCT_CATEGORIES;

  const categoryResults = await Promise.all(
    selectedCategories.map((category) =>
      apiGet(
        `${API_ENDPOINTS.products}/category/${encodeURIComponent(category)}?limit=0`,
      ),
    ),
  );
  const categoryProducts = categoryResults.flatMap((result) => result.products);
  const normalizedSearch = searchTerm.trim();

  if (!normalizedSearch) {
    return categoryProducts;
  }

  const searchResults = await apiGet(
    `${API_ENDPOINTS.products}/search?q=${encodeURIComponent(normalizedSearch)}&limit=0`,
  );
  const matchingIds = new Set(
    searchResults.products.map((product) => product.id),
  );

  return categoryProducts.filter((product) => matchingIds.has(product.id));
};

export { getProducts };
