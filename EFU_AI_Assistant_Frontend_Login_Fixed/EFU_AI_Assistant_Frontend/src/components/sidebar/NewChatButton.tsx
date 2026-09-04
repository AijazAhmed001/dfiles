import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

type NewChatButtonProps = {
    isCollapsed: boolean;
};

export function NewChatButton({ isCollapsed }: NewChatButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            className="new-chat-button"
            type="button"
            onClick={() => navigate(ROUTES.home)}
            title="New chat"
        >
            <Plus size={19} />
            {!isCollapsed ? <span>New chat</span> : null}
        </button>
    );
}
