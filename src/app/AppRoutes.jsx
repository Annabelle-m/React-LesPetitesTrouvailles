import { useLocation, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/home/pages/HomePage";
import ProductsPage from "../features/products/pages/ProductsPage";
import ProductDetailPage from "../features/products/pages/ProductDetailPage";
import FavoritesPage from "../features/favorites/pages/FavoritesPage";
import CartPage from "../features/cart/pages/CartPage";
import NotFoundPage from "../shared/components/not-found/NotFoundPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

const modalRoutes = [
  {
    path: "/products/:productId",
    element: <ProductDetailPage />,
  },
];

function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const page = useRoutes(routes, backgroundLocation || location);
  const modal = useRoutes(backgroundLocation ? modalRoutes : [], location);

  return (
    <>
      {page}
      {modal}
    </>
  );
}

export default AppRoutes;
