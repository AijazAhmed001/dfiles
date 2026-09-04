import { Clock3, Search } from "lucide-react";
import { motion } from "framer-motion";

import { useSidebar } from "../../hooks/useSidebar";
import { conversations } from "../../services/conversationService";
import { ConversationGroup } from "../../types/Conversation";
import { NewChatButton } from "./NewChatButton";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarLogo } from "./SidebarLogo";

const conversationGroups: ConversationGroup[] = [
    "Today",
    "Yesterday",
    "Previous 7 days",
];

export function Sidebar() {
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <motion.aside
            className="sidebar"
            animate={{ width: isCollapsed ? 82 : 292 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <SidebarLogo
                isCollapsed={isCollapsed}
                onToggle={toggleSidebar}
            />

            <div className="sidebar-actions">
                <NewChatButton isCollapsed={isCollapsed} />

                <button className="sidebar-action" type="button">
                    <Search size={18} />
                    {!isCollapsed ? <span>Search chats</span> : null}
                </button>

                <button className="sidebar-action" type="button">
                    <Clock3 size={18} />
                    {!isCollapsed ? <span>Temporary chat</span> : null}
                </button>
            </div>

            {!isCollapsed ? (
                <div className="sidebar-scroll">
                    {conversationGroups.map((group) => (
                        <SidebarGroup
                            key={group}
                            title={group}
                            conversations={conversations.filter(
                                (conversation) =>
                                    conversation.group === group,
                            )}
                        />
                    ))}
                </div>
            ) : null}

            <SidebarFooter isCollapsed={isCollapsed} />
        </motion.aside>
    );
}
