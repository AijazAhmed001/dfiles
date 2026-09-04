import { Navigate, Route, Routes } from "react-router-dom";

import { ChatLayout } from "../layouts/ChatLayout";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PrivateRoute } from "../routes/PrivateRoute";
import { ROUTES } from "../constants/routes";

export function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.login} element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route element={<ChatLayout />}>
                    <Route path={ROUTES.home} element={<HomePage />} />
                    <Route path="/chat/:conversationId" element={<HomePage />} />
                </Route>
            </Route>

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}
