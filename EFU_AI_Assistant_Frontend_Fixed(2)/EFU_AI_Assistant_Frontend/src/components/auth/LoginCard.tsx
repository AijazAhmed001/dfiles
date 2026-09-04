import "./login.css";

import { LoginForm } from "./LoginForm";
import { LoginHeader } from "./LoginHeader";

export function LoginCard() {
    return (
        <section
            className="login-card"
            aria-labelledby="login-title"
        >
            <div
                className="login-card__pattern"
                aria-hidden="true"
            />

            <div className="login-card__content">
                <LoginHeader />

                <LoginForm />

                <div
                    className="login-card__divider"
                    aria-hidden="true"
                >
                    <span />
                    <strong>SECURE PLATFORM</strong>
                    <span />
                </div>

                <div className="login-platform-features">
                    <article>
                        <ShieldIcon />

                        <div>
                            <strong>Secure access</strong>
                            <span>Enterprise grade</span>
                        </div>
                    </article>

                    <article>
                        <SparkIcon />

                        <div>
                            <strong>AI powered</strong>
                            <span>Smart insights</span>
                        </div>
                    </article>

                    <article>
                        <UserIcon />

                        <div>
                            <strong>Trusted platform</strong>
                            <span>EFU protected</span>
                        </div>
                    </article>
                </div>

                <div className="login-security-note">
                    <LockIcon />

                    <p>
                        Authorized EFU personnel only.
                        <br />
                        Activity may be monitored and audited.
                    </p>
                </div>
            </div>
        </section>
    );
}

function ShieldIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M12 3L19 6V11C19 15.7 16.1 19.4 12 21C7.9 19.4 5 15.7 5 11V6L12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />

            <path
                d="M9 12L11 14L15.5 9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SparkIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />

            <path
                d="M18.5 16L19.2 18.8L22 19.5L19.2 20.2L18.5 23L17.8 20.2L15 19.5L17.8 18.8L18.5 16Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="8"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <path
                d="M5 20C5.5 16.5 8.2 14.5 12 14.5C15.8 14.5 18.5 16.5 19 20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <rect
                x="6"
                y="10"
                width="12"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <path
                d="M9 10V7.5C9 5.6 10.3 4 12 4C13.7 4 15 5.6 15 7.5V10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}