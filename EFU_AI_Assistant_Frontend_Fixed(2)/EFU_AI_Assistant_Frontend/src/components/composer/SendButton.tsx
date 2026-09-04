import { ArrowUp } from "lucide-react";

type SendButtonProps = {
    disabled: boolean;
    onClick: () => void;
};

export function SendButton({
    disabled,
    onClick,
}: SendButtonProps) {
    return (
        <button
            className="send-button"
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label="Send message"
        >
            <ArrowUp size={20} />
        </button>
    );
}
