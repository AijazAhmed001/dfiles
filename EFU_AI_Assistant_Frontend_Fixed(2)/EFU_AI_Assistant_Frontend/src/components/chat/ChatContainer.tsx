import { MessageComposer } from "../composer/MessageComposer";
import { WelcomeScreen } from "./WelcomeScreen";

export function ChatContainer() {
    return (
        <div className="chat-container">
            <div className="chat-content">
                <WelcomeScreen />
            </div>

            <MessageComposer />
        </div>
    );
}
