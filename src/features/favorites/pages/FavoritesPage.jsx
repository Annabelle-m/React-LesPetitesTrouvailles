import { useRef } from "react";
import { useFavoritesContext } from "../context/FavoritesContext";
import ProductCard from "../../products/components/ProductCard";
import Pagination from "../../../shared/components/pagination/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";
import "./FavoritesPage.css";

function FavoritesPage() {
  const { favorites } = useFavoritesContext();
  const favoritesGridRef = useRef(null);
  const {
    currentItems: currentFavorites,
    currentPage,
    pageCount,
    goToPage,
  } = usePagination(favorites);

  const handlePageChange = (page) => {
    goToPage(page);
    favoritesGridRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="favorites-page">
      <header className="favorites-page__header">
        <p className="favorites-page__eyebrow">VOTRE SÉLECTION</p>

        <h1>Mes favoris</h1>

        <p className="favorites-page__description">
          Retrouvez ici les articles que vous aimez.
        </p>
      </header>

      {favorites.length > 0 ? (
        <>
          <section
            ref={favoritesGridRef}
            className="favorites-page__grid"
            aria-label="Mes produits favoris"
          >
            {currentFavorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            ariaLabel="Pagination des favoris"
          />
        </>
      ) : (
        <div className="favorites-page__empty">
          <p>Vous n’avez pas encore de favoris.</p>
          <p>
            Parcourez notre collection et cliquez sur le cœur pour retrouver vos
            articles préférés ici.
          </p>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
