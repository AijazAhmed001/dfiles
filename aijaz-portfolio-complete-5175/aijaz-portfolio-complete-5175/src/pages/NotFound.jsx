import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/notFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <span>404</span>
        <h1>Page not found.</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link className="button button--primary" to="/">
          <ArrowLeft size={18} /> Back Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
