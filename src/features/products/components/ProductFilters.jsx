import "./ProductFilters.css";
import { Button, Input } from "../../../shared/components/ui";
import {
  ALL_PRODUCTS_CATEGORY,
  FILTER_PRICE_RANGE_FLOOR,
  FILTER_RANGE_MIN,
  FILTER_RANGE_MAX,
  FILTER_RANGE_STEP,
  MINIMUM_RATINGS,
  MIN_PRODUCT_PRICE,
} from "../constants/productFilters";
import { formatPrice } from "../../../shared/utils/formatPrice";

function ProductFilters({
  categories,
  categoryCounts,
  selectedCategories,
  onToggleCategory,
  onResetCategories,
  minPrice,
  maxPrice,
  highestPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onResetPrice,
  minRating,
  onRatingChange,
  onResetFilters,
  hasActiveFilters,
}) {
  const priceRange = Math.max(FILTER_PRICE_RANGE_FLOOR, highestPrice);

  const priceToPosition = (price) =>
    (Math.log1p(Math.max(MIN_PRODUCT_PRICE, price)) / Math.log1p(priceRange)) *
    FILTER_RANGE_MAX;

  const positionToPrice = (position) =>
    Math.expm1((position / FILTER_RANGE_MAX) * Math.log1p(priceRange));

  const minPosition = priceToPosition(minPrice);
  const maxPosition = priceToPosition(maxPrice);

  const handleMinChange = (event) => {
    const value = Math.round(positionToPrice(Number(event.target.value)));

    onMinPriceChange(Math.min(value, maxPrice));
  };

  const handleMaxChange = (event) => {
    const value = Math.round(positionToPrice(Number(event.target.value)));

    onMaxPriceChange(Math.max(value, minPrice));
  };

  return (
    <aside className="product-filters">
      <div className="product-filters__header">
        <h2>Filtres</h2>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            className="product-filters__reset"
            onClick={onResetFilters}
          >
            Tout effacer
          </Button>
        )}
      </div>

      <section className="product-filters__section">
        <div className="product-filters__section-header">
          <h3>Catégories</h3>

          {selectedCategories.length > 0 && (
            <Button variant="ghost" onClick={onResetCategories}>
              Effacer
            </Button>
          )}
        </div>

        <div className="product-filters__options">
          {categories
            .filter((category) => category.value !== ALL_PRODUCTS_CATEGORY)
            .map((category) => (
              <label className="product-filters__option" key={category.value}>
                <Input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => onToggleCategory(category.value)}
                />

                <span>{category.label}</span>

                <span className="product-filters__option-count">
                  {categoryCounts[category.value] || 0}
                </span>
              </label>
            ))}
        </div>
      </section>

      <section className="product-filters__section">
        <div className="product-filters__section-header">
          <h3>Prix</h3>

          <Button variant="ghost" onClick={onResetPrice}>
            Réinitialiser
          </Button>
        </div>

        <div className="product-filters__price-values">
          <span>{formatPrice(minPrice)}</span>
          <span>{formatPrice(maxPrice)}</span>
        </div>

        <div
          className="product-filters__range"
          style={{
            "--range-min": `${minPosition}%`,
            "--range-max": `${maxPosition}%`,
          }}
        >
          <div className="product-filters__range-track" />
          <div className="product-filters__range-selected" />

          <Input
            className="product-filters__range-min"
            type="range"
            min={FILTER_RANGE_MIN}
            max={FILTER_RANGE_MAX}
            step={FILTER_RANGE_STEP}
            value={minPosition}
            aria-label="Prix minimum"
            onChange={handleMinChange}
          />

          <Input
            className="product-filters__range-max"
            type="range"
            min={FILTER_RANGE_MIN}
            max={FILTER_RANGE_MAX}
            step={FILTER_RANGE_STEP}
            value={maxPosition}
            aria-label="Prix maximum"
            onChange={handleMaxChange}
          />
        </div>
      </section>

      <section className="product-filters__section">
        <h3>Note minimale</h3>

        <div className="product-filters__rating-options">
          {MINIMUM_RATINGS.map((rating) => (
            <Button
              variant="ghost"
              key={rating}
              className={`product-filters__rating ${
                minRating === rating ? "product-filters__rating--active" : ""
              }`}
              aria-pressed={minRating === rating}
              onClick={() => onRatingChange(rating)}
            >
              <span className="product-filters__rating-star">★</span>
              {rating} et plus
            </Button>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default ProductFilters;
