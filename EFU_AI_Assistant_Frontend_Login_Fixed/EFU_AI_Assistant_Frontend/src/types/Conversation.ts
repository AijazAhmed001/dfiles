export type ConversationGroup = "Today" | "Yesterday" | "Previous 7 days";

export type Conversation = {
    id: string;
    title: string;
    group: ConversationGroup;
};
