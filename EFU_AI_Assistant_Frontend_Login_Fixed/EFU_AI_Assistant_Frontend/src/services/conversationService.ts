import { Conversation } from "../types/Conversation";

export const conversations: Conversation[] = [
    {
        id: "claims-summary",
        title: "Claims summary for this month",
        group: "Today",
    },
    {
        id: "active-policies",
        title: "Active policy overview",
        group: "Today",
    },
    {
        id: "branch-performance",
        title: "Branch performance comparison",
        group: "Yesterday",
    },
    {
        id: "premium-trends",
        title: "Premium collection trends",
        group: "Previous 7 days",
    },
];
