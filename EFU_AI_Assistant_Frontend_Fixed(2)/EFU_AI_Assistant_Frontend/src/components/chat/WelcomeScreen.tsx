import { BarChart3, Database, FileText, ShieldCheck } from "lucide-react";

const suggestions = [
    {
        icon: Database,
        title: "Database insights",
        text: "Summarize active policy records.",
    },
    {
        icon: BarChart3,
        title: "Business analysis",
        text: "Compare branch performance.",
    },
    {
        icon: FileText,
        title: "Report preparation",
        text: "Create an executive claims summary.",
    },
    {
        icon: ShieldCheck,
        title: "Verified answers",
        text: "Explain the source behind an answer.",
    },
];

export function WelcomeScreen() {
    return (
        <section className="welcome-screen">
            <div className="welcome-badge">EFU Enterprise Intelligence</div>

            <h1>How can I help you today?</h1>

            <p>
                Ask questions about authorized EFU data in English, Urdu,
                or Roman Urdu.
            </p>

            <div className="suggestion-grid">
                {suggestions.map((suggestion) => {
                    const Icon = suggestion.icon;

                    return (
                        <button
                            key={suggestion.title}
                            className="suggestion-card"
                            type="button"
                        >
                            <Icon size={20} />
                            <strong>{suggestion.title}</strong>
                            <span>{suggestion.text}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
