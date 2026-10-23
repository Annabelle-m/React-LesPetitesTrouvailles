import { Heart } from "lucide-react";
import { Button } from "../../../shared/components/ui";
import { useFavoritesContext } from "../context/FavoritesContext";
import "./FavoriteButton.css";

function FavoriteButton({ product }) {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favorite = isFavorite(product.id);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <Button
      variant="icon"
      className={`favorite-button ${favorite ? "favorite-button--active" : ""}`}
      onClick={handleClick}
      aria-label={
        favorite
          ? `Retirer ${product.title} des favoris`
          : `Ajouter ${product.title} aux favoris`
      }
      aria-pressed={favorite}
    >
      <Heart
        size={20}
        strokeWidth={1.8}
        fill={favorite ? "currentColor" : "none"}
      />
    </Button>
  );
}

export default FavoriteButton;
