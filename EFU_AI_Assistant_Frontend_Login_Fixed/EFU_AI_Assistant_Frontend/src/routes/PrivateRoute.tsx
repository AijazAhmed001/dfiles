import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="page-loader">
                <div className="loader-spinner" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.login} replace />;
    }

    return <Outlet />;
}
