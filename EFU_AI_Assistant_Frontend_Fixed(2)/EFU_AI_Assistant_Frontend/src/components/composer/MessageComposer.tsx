import { Paperclip, Sparkles } from "lucide-react";
import { useState } from "react";

import { MessageInput } from "./MessageInput";
import { SendButton } from "./SendButton";

export function MessageComposer() {
    const [message, setMessage] = useState("");

    function handleSubmit() {
        const cleanMessage = message.trim();

        if (!cleanMessage) {
            return;
        }

        console.info("Message submitted:", cleanMessage);
        setMessage("");
    }

    return (
        <div className="composer-wrapper">
            <div className="message-composer">
                <button
                    className="composer-icon-button"
                    type="button"
                    aria-label="Attach file"
                >
                    <Paperclip size={20} />
                </button>

                <MessageInput
                    value={message}
                    onChange={setMessage}
                    onSubmit={handleSubmit}
                />

                <button
                    className="composer-icon-button"
                    type="button"
                    aria-label="AI tools"
                >
                    <Sparkles size={20} />
                </button>

                <SendButton
                    disabled={!message.trim()}
                    onClick={handleSubmit}
                />
            </div>

            <p className="composer-note">
                Responses are generated only from authorized EFU sources.
            </p>
        </div>
    );
}
