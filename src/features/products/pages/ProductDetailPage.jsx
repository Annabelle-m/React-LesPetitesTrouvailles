import { useParams, useLocation } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductModal from "../../../shared/components/product-modal/ProductModal";
import FavoriteButton from "../../favorites/components/FavoriteButton";
import AddToCartButton from "../../cart/components/AddToCartButton";
import StarRating from "../../reviews/components/StarRating";
import { useProductReviews } from "../../reviews/hooks/useProductReviews";
import ProductReviews from "../../reviews/components/ProductReviews";
import {
  calculateAverageRating,
  getProductRating,
} from "../../reviews/services/reviewsService";
import { formatPrice } from "../../../shared/utils/formatPrice";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { productId } = useParams();
  const location = useLocation();

  const { products, isLoading, error } = useProducts();

  const product = products.find((item) => item.id === Number(productId));

  const { reviews, addReview } = useProductReviews(product);
  const averageRating = calculateAverageRating(
    reviews,
    getProductRating(product),
  );

  if (isLoading) {
    return <p role="status">Chargement du produit…</p>;
  }

  if (error) {
    return <p role="alert">Une erreur est survenue : {error}</p>;
  }

  if (!product) {
    return <p role="alert">Produit introuvable.</p>;
  }

  const productContent = (
    <>
      <div className="product-detail">
        <div className="product-detail__image-container">
          <img
            className="product-detail__image"
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
          />

          <div className="product-detail__favorite">
            <FavoriteButton product={product} />
          </div>
        </div>

        <div className="product-detail__content">
          <p className="product-detail__category">{product.category}</p>

          <h1 id="product-detail-title">{product.title}</h1>

          <p className="product-detail__price">{formatPrice(product.price)}</p>

          <div className="product-detail__rating">
            <StarRating rating={averageRating} readOnly />

            <span className="product-detail__rating-value">
              {averageRating.toFixed(1).replace(".", ",")} / 5
            </span>
          </div>

          <p className="product-detail__description">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>

      <ProductReviews reviews={reviews} addReview={addReview} />
    </>
  );

  if (location.state?.backgroundLocation) {
    return <ProductModal>{productContent}</ProductModal>;
  }

  return <div className="product-detail-page">{productContent}</div>;
}

export default ProductDetailPage;
