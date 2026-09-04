import { Link } from "react-router-dom";

import { ROUTES } from "../constants/routes";

export function NotFoundPage() {
    return (
        <main className="not-found-page">
            <span>404</span>
            <h1>Page not found</h1>
            <p>The page you requested does not exist.</p>
            <Link to={ROUTES.home}>Return to EFU AI Assistant</Link>
        </main>
    );
}
