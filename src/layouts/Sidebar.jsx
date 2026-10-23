import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { House, Shirt, Heart } from "lucide-react";
import logo from "../assets/images/Logo-les-petites-trouvailles.png";
import CartWidget from "../features/cart/components/CartWidget";
import ThemeToggle from "../features/theme/components/ThemeToggle";
import { ROUTES } from "../shared/constants/routes";

const navigationItems = [
  { label: "Accueil", path: ROUTES.home, icon: House },
  { label: "Vêtements", path: ROUTES.products, icon: Shirt },
  { label: "Favoris", path: ROUTES.favorites, icon: Heart },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar__brand">
        <img
          className="sidebar__logo"
          src={logo}
          alt="Les Petites Trouvailles, mode féminine tout en douceur"
        />
      </NavLink>

      <nav className="sidebar__navigation" aria-label="Navigation principale">
        {navigationItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
            }
          >
            <Icon size={20} strokeWidth={1.7} />
            <span>{label}</span>
          </NavLink>
          
          
        ))}
        <CartWidget />
        <ThemeToggle />
      </nav>
    </aside>
  );
}

export default Sidebar;
