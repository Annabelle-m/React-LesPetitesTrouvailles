import { Link, useLocation } from "react-router-dom";
import FavoriteButton from "../../favorites/components/FavoriteButton";
import StarRating from "../../reviews/components/StarRating";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { getProductRoute } from "../../../shared/constants/routes";
import { useProductRating } from "../hooks/useProductRating";
import "./ProductCard.css";

function ProductCard({ product }) {
  const location = useLocation();
  const rating = useProductRating(product);
  const productUrl = getProductRoute(product.id);
  const productState = { backgroundLocation: location };

  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <Link
          to={productUrl}
          state={productState}
          className="product-card__link"
          aria-label={`Voir ${product.title}`}
        >
          <img
            className="product-card__image"
            src={product.thumbnail}
            alt={product.title}
          />
        </Link>
        <div className="product-card__favorite">
          <FavoriteButton product={product} />
        </div>
      </div>

      <div className="product-card__content">
        <Link
          to={productUrl}
          state={productState}
          className="product-card__details-link"
        >
          <p className="product-card__category">{product.category}</p>
          <h3 className="product-card__title">{product.title}</h3>
        </Link>
        <div className="product-card__rating">
          <StarRating rating={rating} readOnly />
          <span aria-hidden="true">
            {Number.isFinite(rating)
              ? rating.toFixed(1).replace(".", ",")
              : "0,0"}
          </span>
        </div>
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}

export default ProductCard;
