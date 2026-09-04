import { MessageSquareText } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Conversation } from "../../types/Conversation";

type ConversationItemProps = {
    conversation: Conversation;
};

export function ConversationItem({
    conversation,
}: ConversationItemProps) {
    return (
        <NavLink
            className={({ isActive }) =>
                `conversation-item ${isActive ? "is-active" : ""}`
            }
            to={`/chat/${conversation.id}`}
        >
            <MessageSquareText size={16} />
            <span>{conversation.title}</span>
        </NavLink>
    );
}
