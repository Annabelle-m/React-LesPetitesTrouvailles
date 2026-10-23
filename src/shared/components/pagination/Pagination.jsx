import "./Pagination.css";
import { Button } from "../ui";

function Pagination({
  currentPage,
  pageCount,
  onPageChange,
  ariaLabel = "Pagination des produits",
}) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label={ariaLabel}>
      <Button
        variant="secondary"
        className="pagination__button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Page précédente"
      >
        Précédent
      </Button>

      <div className="pagination__pages" aria-label="Pages">
        {Array.from({ length: pageCount }, (_, index) => {
          const page = index + 1;
          const isCurrentPage = page === currentPage;

          return (
            <Button
              variant="secondary"
              key={page}
              className={`pagination__button pagination__page ${
                isCurrentPage ? "pagination__page--active" : ""
              }`}
              onClick={() => onPageChange(page)}
              aria-current={isCurrentPage ? "page" : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="secondary"
        className="pagination__button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        aria-label="Page suivante"
      >
        Suivant
      </Button>
    </nav>
  );
}

export default Pagination;
