import CartAddedNotification from "../features/cart/components/CartAddedNotification";
import { useNotifications } from "../shared/components/notifications/useNotifications";
import { NOTIFICATION_TYPES } from "../shared/components/notifications/constants";
import NotificationToast from "../shared/components/notifications/NotificationToast";
import "./NotificationViewport.css";

function NotificationViewport() {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div className="notification-viewport" aria-live="polite">
      {notifications.map((notification) => {
        const onDismiss = () => dismissNotification(notification.id);

        if (notification.type === NOTIFICATION_TYPES.cartAdded) {
          return (
            <CartAddedNotification
              key={notification.id}
              notification={notification}
              onDismiss={onDismiss}
            />
          );
        }

        return (
          <NotificationToast
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onDismiss={onDismiss}
          />
        );
      })}
    </div>
  );
}

export default NotificationViewport;
