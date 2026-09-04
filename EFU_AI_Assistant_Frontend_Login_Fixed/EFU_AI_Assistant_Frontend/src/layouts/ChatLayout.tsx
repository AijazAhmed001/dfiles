import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/sidebar/Sidebar";

export function ChatLayout() {
    return (
        <div className="app-shell">
            <Sidebar />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
