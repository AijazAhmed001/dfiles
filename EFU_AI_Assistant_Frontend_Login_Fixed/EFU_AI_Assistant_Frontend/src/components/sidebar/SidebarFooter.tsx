import { LogOut, Settings } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

type SidebarFooterProps = {
    isCollapsed: boolean;
};

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
    const { user, logout } = useAuth();

    return (
        <footer className="sidebar-footer">
            {!isCollapsed ? (
                <div className="user-profile">
                    <div className="user-avatar">
                        {user?.name.charAt(0).toUpperCase() ?? "E"}
                    </div>

                    <div className="user-details">
                        <strong>{user?.name ?? "EFU User"}</strong>
                        <span>{user?.role ?? "Employee"}</span>
                    </div>
                </div>
            ) : null}

            <button className="sidebar-footer-button" type="button">
                <Settings size={18} />
                {!isCollapsed ? <span>Settings</span> : null}
            </button>

            <button
                className="sidebar-footer-button danger"
                type="button"
                onClick={logout}
            >
                <LogOut size={18} />
                {!isCollapsed ? <span>Sign out</span> : null}
            </button>
        </footer>
    );
}
