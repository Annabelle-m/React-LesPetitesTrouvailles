import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications doit être utilisé dans NotificationProvider.",
    );
  }

  return context;
}

export { useNotifications };
