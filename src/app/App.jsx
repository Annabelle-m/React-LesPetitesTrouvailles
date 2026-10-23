import { RouterProvider } from "react-router-dom";
import { CartProvider } from "../features/cart/context/CartProvider";
import { FavoritesProvider } from "../features/favorites/context/FavoritesContext";
import { ThemeProvider } from "../features/theme/context/ThemeProvider";
import { NotificationProvider } from "../shared/components/notifications/NotificationProvider";
import router from "./router";

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <CartProvider>
          <FavoritesProvider>
            <RouterProvider router={router} />
          </FavoritesProvider>
        </CartProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
