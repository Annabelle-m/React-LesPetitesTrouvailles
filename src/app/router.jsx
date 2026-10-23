import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const router = createBrowserRouter([
  {
    path: "*",
    element: <AppRoutes />,
  },
]);

export default router;
