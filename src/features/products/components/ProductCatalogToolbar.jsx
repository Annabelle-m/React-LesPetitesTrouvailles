import { ArrowDownUp, Filter } from "lucide-react";
import { Button, Select } from "../../../shared/components/ui";
import ProductSearchBar from "./ProductSearchBar";
import "./ProductCatalogToolbar.css";
import { PRODUCT_SORT_OPTIONS } from "../constants/productSorting";

function ProductCatalogToolbar({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
  isFiltersOpen,
  onToggleFilters,
  hasActiveFilters,
}) {
  return (
    <div className="product-catalog-toolbar">
      <div className="product-catalog-toolbar__leading">
        <Button
          variant="secondary"
          className={`product-catalog-toolbar__filter ${
            isFiltersOpen ? "product-catalog-toolbar__filter--active" : ""
          }`}
          onClick={onToggleFilters}
          aria-expanded={isFiltersOpen}
          aria-controls="products-filter-panel"
        >
          <Filter size={16} aria-hidden="true" />
          <span>Filtres</span>
          {hasActiveFilters && (
            <span
              className="product-catalog-toolbar__filter-indicator"
              aria-hidden="true"
            />
          )}
        </Button>
        <ProductSearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </div>

      <div className="product-catalog-toolbar__controls">
        <label
          className="product-catalog-toolbar__sort"
          htmlFor="products-sort"
        >
          <ArrowDownUp size={16} aria-hidden="true" />

          <span className="product-catalog-toolbar__sort-label">
            Trier par :
          </span>

          <Select
            id="products-sort"
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Trier les produits"
          >
            {PRODUCT_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
      </div>
    </div>
  );
}

export default ProductCatalogToolbar;
