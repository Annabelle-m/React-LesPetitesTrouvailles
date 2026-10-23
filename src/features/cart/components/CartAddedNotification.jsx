import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import NotificationToast from "../../../shared/components/notifications/NotificationToast";
import { NOTIFICATION_TYPES } from "../../../shared/components/notifications/constants";

function CartAddedNotification({ notification, onDismiss }) {
  const { product, quantity } = notification.data;
  const quantityLabel =
    quantity === 1 ? "1 article ajouté" : `${quantity} articles ajoutés`;

  return (
    <NotificationToast
      type={NOTIFICATION_TYPES.success}
      title={quantityLabel}
      message={product.title}
      image={product.thumbnail}
      onDismiss={onDismiss}
    >
      <Link
        className="notification-toast__link"
        to={ROUTES.cart}
        onClick={onDismiss}
      >
        <ShoppingBag size={15} aria-hidden="true" />
        Voir mon panier
      </Link>
    </NotificationToast>
  );
}

export default CartAddedNotification;
