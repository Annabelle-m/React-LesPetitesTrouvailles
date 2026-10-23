import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h1>Cette page est introuvable</h1>
      <p>
        Le lien a peut-être changé. Vous pouvez retrouver la collection ici.
      </p>
      <Link to={ROUTES.products} className="not-found-page__link">
        Découvrir la collection <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </section>
  );
}

export default NotFoundPage;
