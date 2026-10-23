import { useCallback, useEffect, useRef, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { NOTIFICATION_DURATION_MS, NOTIFICATION_TYPES } from "./constants";

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const nextNotificationId = useRef(0);
  const timeoutIds = useRef(new Map());

  const dismissNotification = useCallback((id) => {
    window.clearTimeout(timeoutIds.current.get(id));
    timeoutIds.current.delete(id);
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  }, []);

  const notify = useCallback(
    ({
      type = NOTIFICATION_TYPES.info,
      title,
      message,
      data,
      duration = NOTIFICATION_DURATION_MS,
    }) => {
      const id = nextNotificationId.current + 1;
      nextNotificationId.current = id;

      setNotifications((current) => [
        ...current,
        { id, type, title, message, data },
      ]);

      timeoutIds.current.set(
        id,
        window.setTimeout(() => dismissNotification(id), duration),
      );
    },
    [dismissNotification],
  );

  useEffect(
    () => () => {
      timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIds.current.clear();
    },
    [],
  );

  return (
    <NotificationContext.Provider
      value={{ notifications, notify, dismissNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationProvider };
