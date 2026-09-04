import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Logo } from "../auth/Logo";

type SidebarLogoProps = {
    isCollapsed: boolean;
    onToggle: () => void;
};

export function SidebarLogo({
    isCollapsed,
    onToggle,
}: SidebarLogoProps) {
    return (
        <div className="sidebar-header">
            <button
                className="sidebar-logo-button"
                type="button"
                onClick={isCollapsed ? onToggle : undefined}
                aria-label={isCollapsed ? "Open sidebar" : "EFU AI Assistant"}
            >
                <Logo compact={isCollapsed} />
            </button>

            {!isCollapsed ? (
                <button
                    className="icon-button"
                    type="button"
                    onClick={onToggle}
                    aria-label="Close sidebar"
                >
                    <PanelLeftClose size={19} />
                </button>
            ) : (
                <PanelLeftOpen className="collapsed-indicator" size={16} />
            )}
        </div>
    );
}
