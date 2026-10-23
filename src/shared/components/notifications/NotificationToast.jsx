import { AlertCircle, Check, Info, X } from "lucide-react";
import { NOTIFICATION_TYPES } from "./constants";
import "./NotificationToast.css";

const NOTIFICATION_ICONS = {
  [NOTIFICATION_TYPES.success]: Check,
  [NOTIFICATION_TYPES.error]: AlertCircle,
  [NOTIFICATION_TYPES.info]: Info,
};

function NotificationToast({
  type = "info",
  title,
  message,
  image,
  children,
  onDismiss,
}) {
  const Icon =
    NOTIFICATION_ICONS[type] ?? NOTIFICATION_ICONS[NOTIFICATION_TYPES.info];
  const role = type === NOTIFICATION_TYPES.error ? "alert" : "status";

  return (
    <section
      className={`notification-toast notification-toast--${type} ${
        image ? "notification-toast--with-image" : ""
      }`}
      role={role}
      aria-label={title}
    >
      <span className="notification-toast__icon" aria-hidden="true">
        <Icon size={17} />
      </span>

      {image && (
        <img className="notification-toast__image" src={image} alt="" />
      )}

      <div className="notification-toast__content">
        <p className="notification-toast__title">{title}</p>
        {message && <p className="notification-toast__message">{message}</p>}
        {children}
      </div>

      <button
        className="notification-toast__close"
        type="button"
        onClick={onDismiss}
        aria-label="Fermer la notification"
      >
        <X size={17} aria-hidden="true" />
      </button>
    </section>
  );
}

export default NotificationToast;
