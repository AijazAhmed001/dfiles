import { Conversation } from "../../types/Conversation";
import { ConversationItem } from "./ConversationItem";

type SidebarGroupProps = {
    title: string;
    conversations: Conversation[];
};

export function SidebarGroup({
    title,
    conversations,
}: SidebarGroupProps) {
    if (conversations.length === 0) {
        return null;
    }

    return (
        <section className="sidebar-group">
            <h2>{title}</h2>

            <div className="sidebar-group-list">
                {conversations.map((conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                    />
                ))}
            </div>
        </section>
    );
}
