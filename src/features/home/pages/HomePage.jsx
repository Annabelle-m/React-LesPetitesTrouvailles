import { Link } from "react-router-dom";
import portrait from "../../../assets/images/portrait-femme.png";
import ProductCard from "../../products/components/ProductCard";
import { useProducts } from "../../products/hooks/useProducts";
import { useFavoriteProducts } from "../hooks/useFavoriteProducts";
import { ROUTES } from "../../../shared/constants/routes";
import "./HomePage.css";

function HomePage() {
  const { products, isLoading, error } = useProducts();
  const favoriteProducts = useFavoriteProducts(products);

  if (isLoading) {
    return (
      <p className="home-page__status" role="status">
        Chargement des produits…
      </p>
    );
  }

  if (error) {
    return (
      <p className="home-page__status" role="alert">
        Une erreur est survenue : {error}
      </p>
    );
  }

  return (
    <div className="home-page">
      <section className="home-page__hero">
        <div className="home-page__hero-content">
          <p className="home-page__eyebrow">BIENVENUE CHEZ NOUS</p>

          <h1>Les Petites Trouvailles</h1>

          <p className="home-page__description">
            La mode féminine, avec des pièces qui vous ressemblent.
          </p>

          <Link to={ROUTES.products} className="home-page__button">
            Découvrir la collection
          </Link>
        </div>

        <img
          className="home-page__hero-image"
          src={portrait}
          alt="Portrait d’une femme dans un univers doux et lumineux"
        />
      </section>

      <section className="home-page__products">
        <h2>Nos coups de cœur</h2>

        <div className="home-page__product-list">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
