import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificationViewport from "./NotificationViewport";

function MainLayout() {
  return (
    <div className="app-layout">
      <a className="app-layout__skip-link" href="#main-content">
        Aller au contenu
      </a>
      <Sidebar />

      <main className="app-layout__content" id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <NotificationViewport />
    </div>
  );
}

export default MainLayout;
