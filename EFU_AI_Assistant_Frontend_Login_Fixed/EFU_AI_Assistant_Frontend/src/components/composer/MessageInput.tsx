import { ChangeEvent, KeyboardEvent } from "react";

type MessageInputProps = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
};

export function MessageInput({
    value,
    onChange,
    onSubmit,
}: MessageInputProps) {
    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        onChange(event.target.value);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit();
        }
    }

    return (
        <textarea
            className="message-input"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about EFU data..."
            rows={1}
        />
    );
}
