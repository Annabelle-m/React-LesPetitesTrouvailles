import { useMemo, useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";
import { PRODUCT_ITEMS_PER_PAGE } from "../constants/productPagination";
import {INITIAL_MINIMUM_RATING, MIN_PRODUCT_PRICE, } from "../constants/productFilters";
import { PRODUCT_SORT, PRODUCT_SORT_LOCALE } from "../constants/productSorting";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import ProductCatalogToolbar from "../components/ProductCatalogToolbar";
import { Button } from "../../../shared/components/ui";
import Pagination from "../../../shared/components/pagination/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";
import "./ProductsPage.css";

function ProductsPage() {
  const { products, isLoading, error } = useProducts();
  const productGridRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(MIN_PRODUCT_PRICE);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minRating, setMinRating] = useState(INITIAL_MINIMUM_RATING);
  const [sortOrder, setSortOrder] = useState(PRODUCT_SORT.recommended);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const highestPrice = useMemo(
    () =>
      Math.ceil(
        Math.max(
          MIN_PRODUCT_PRICE,
          ...products.map((product) => product.price),
        ),
      ),
    [products],
  );

  const activeMaxPrice = maxPrice ?? highestPrice;

  const categoryCounts = useMemo(
    () =>
      products.reduce((counts, product) => {
        counts[product.category] = (counts[product.category] || 0) + 1;
        return counts;
      }, {}),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchingProducts = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice =
        product.price >= minPrice && product.price <= activeMaxPrice;

      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    switch (sortOrder) {
      case PRODUCT_SORT.priceAscending:
        return [...matchingProducts].sort((a, b) => a.price - b.price);
      case PRODUCT_SORT.priceDescending:
        return [...matchingProducts].sort((a, b) => b.price - a.price);
      case PRODUCT_SORT.nameAscending:
        return [...matchingProducts].sort((a, b) =>
          a.title.localeCompare(b.title, PRODUCT_SORT_LOCALE),
        );
      case PRODUCT_SORT.ratingDescending:
        return [...matchingProducts].sort((a, b) => b.rating - a.rating);
      default:
        return matchingProducts;
    }
  }, [
    products,
    searchTerm,
    selectedCategories,
    minPrice,
    activeMaxPrice,
    minRating,
    sortOrder,
  ]);

  const {
    currentItems: currentProducts,
    currentPage,
    pageCount,
    goToPage,
  } = usePagination(filteredProducts, PRODUCT_ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    goToPage(page);
    productGridRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCategory = (categoryValue) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(categoryValue)
        ? currentCategories.filter((value) => value !== categoryValue)
        : [...currentCategories, categoryValue],
    );
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(Math.max(MIN_PRODUCT_PRICE, Math.min(value, activeMaxPrice)));
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(Math.min(highestPrice, Math.max(minPrice, value)));
  };

  const handleRatingChange = (value) => {
    setMinRating((currentRating) =>
      currentRating === value ? INITIAL_MINIMUM_RATING : value,
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setMinPrice(MIN_PRODUCT_PRICE);
    setMaxPrice(null);
    setMinRating(INITIAL_MINIMUM_RATING);
    setSortOrder(PRODUCT_SORT.recommended);
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategories.length > 0 ||
    minPrice !== MIN_PRODUCT_PRICE ||
    activeMaxPrice !== highestPrice ||
    minRating !== INITIAL_MINIMUM_RATING;

  if (isLoading) {
    return (
      <div className="products-page__status" role="status">
        Chargement de votre sélection…
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page__status" role="alert">
        Une erreur est survenue : {error}
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-page__heading">
        <div className="products-page__intro">
          <p className="products-page__eyebrow">LA SÉLECTION DU MOMENT</p>
          <h1>Vêtements & accessoires</h1>
          <p>Des pièces choisies pour compléter votre style.</p>
        </div>
        <p className="products-page__result-count" aria-live="polite">
          <strong>{filteredProducts.length}</strong>{" "}
          {filteredProducts.length > 1 ? "produits" : "produit"}
        </p>
      </div>

      <div
        className={`products-page__workspace ${
          isFiltersOpen
            ? "products-page__workspace--filters-open"
            : "products-page__workspace--filters-closed"
        }`}
      >
        <aside
          id="products-filter-panel"
          className="products-page__filters"
          aria-hidden={!isFiltersOpen}
          inert={!isFiltersOpen}
        >
          <ProductFilters
            categories={PRODUCT_CATEGORIES}
            categoryCounts={categoryCounts}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onResetCategories={() => setSelectedCategories([])}
            minPrice={minPrice}
            maxPrice={activeMaxPrice}
            highestPrice={highestPrice}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            minRating={minRating}
            onRatingChange={handleRatingChange}
            onResetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        <div className="products-page__catalog">
          <ProductCatalogToolbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            isFiltersOpen={isFiltersOpen}
            onToggleFilters={() => setIsFiltersOpen((open) => !open)}
            hasActiveFilters={hasActiveFilters}
          />

          {filteredProducts.length > 0 ? (
            <section
              ref={productGridRef}
              className="products-page__grid"
              aria-label="Produits disponibles"
            >
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          ) : (
            <div className="products-page__empty">
              <span className="products-page__empty-icon">
                <SlidersHorizontal size={22} />
              </span>
              <h2>Aucun article trouvé</h2>
              <p>
                Essayez d’élargir vos critères pour découvrir d’autres pièces.
              </p>
              <Button variant="primary" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
