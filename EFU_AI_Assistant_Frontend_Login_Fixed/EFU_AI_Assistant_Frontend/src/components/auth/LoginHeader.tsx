import { Logo } from "./Logo";

export function LoginHeader() {
    return (
        <header className="login-header">
            <Logo />

            <div
                className="login-header__divider"
                aria-hidden="true"
            />

            <div className="login-header__welcome">
                <div className="login-secure-label">
                    <ShieldIcon />

                    <span>Secure Enterprise Access</span>
                </div>

                <h1 id="login-title">Welcome back!</h1>

                <p>
                    Sign in with your authorized EFU account to access
                    AI-powered enterprise intelligence, reports and secure
                    business insights.
                </p>
            </div>
        </header>
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