import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Button, Input } from "../../../shared/components/ui";
import "./ProductSearchBar.css";

const MOBILE_SEARCH_MEDIA_QUERY = "(max-width: 600px)";

const matchesMobileSearchQuery = () =>
  typeof window !== "undefined" &&
  window.matchMedia(MOBILE_SEARCH_MEDIA_QUERY).matches;

function ProductSearchBar({ searchTerm, onSearchChange }) {
  const [isMobile, setIsMobile] = useState(matchesMobileSearchQuery);
  const [isOpen, setIsOpen] = useState(
    () => Boolean(searchTerm) || matchesMobileSearchQuery(),
  );
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const wasOpenRef = useRef(isOpen);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_SEARCH_MEDIA_QUERY);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
      setIsOpen(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (!isMobile) {
        inputRef.current?.focus();
      }
    } else if (wasOpenRef.current && !isMobile) {
      triggerRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, isMobile]);

  const closeSearch = () => {
    if (isMobile) {
      return;
    }

    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeSearch();
    }
  };

  return (
    <div className={`product-search ${isOpen ? "product-search--open" : ""}`}>
      {isOpen ? (
        <div className="product-search__field">
          <Search
            className="product-search__icon"
            size={20}
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            id="product-search-input"
            type="search"
            placeholder="Rechercher un produit..."
            aria-label="Rechercher dans les produits"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          {(searchTerm || !isMobile) && (
            <Button
              className="product-search__clear"
              onClick={() => {
                if (searchTerm) {
                  onSearchChange("");
                  inputRef.current?.focus();
                  return;
                }

                closeSearch();
              }}
              aria-label={
                searchTerm ? "Effacer la recherche" : "Fermer la recherche"
              }
            >
              <X size={18} />
            </Button>
          )}
        </div>
      ) : (
        <Button
          ref={triggerRef}
          className={`product-search__trigger ${
            searchTerm ? "product-search__trigger--active" : ""
          }`}
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir la recherche"
          aria-expanded={false}
        >
          <Search size={20} aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}

export default ProductSearchBar;
