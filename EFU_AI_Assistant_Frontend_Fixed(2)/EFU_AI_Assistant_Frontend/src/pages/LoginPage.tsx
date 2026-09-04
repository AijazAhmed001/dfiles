import { Navigate } from "react-router-dom";

import { LoginCard } from "../components/auth/LoginCard";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTES.home} replace />;
    }

    return (
        <main className="auth-layout">
            <section className="auth-visual">
                <img
                    src="/images/efu-house-day.png"
                    alt="EFU House"
                    className="auth-visual__background"
                />

                <div
                    className="auth-visual__overlay"
                    aria-hidden="true"
                />

                <div className="auth-brand">
                    <img
                        src="/images/efu-login-logo.png"
                        alt="EFU"
                        className="auth-brand__logo"
                    />

                    <div className="auth-brand__copy">
                        <strong>EFU</strong>
                        <span>GENERAL INSURANCE</span>
                    </div>
                </div>

                <div className="auth-introduction">
                    <span className="auth-introduction__eyebrow">
                        AI-Powered
                    </span>

                    <h1>
                        Enterprise
                        <br />
                        Intelligence
                    </h1>

                    <div
                        className="auth-introduction__line"
                        aria-hidden="true"
                    />

                    <p>
                        Secure insights, smarter decisions and better
                        outcomes for your business.
                    </p>

                    <div className="auth-benefits">
                        <article className="auth-benefit">
                            <div className="auth-benefit__icon">
                                <ShieldIcon />
                            </div>

                            <strong>Secure</strong>
                            <span>Enterprise grade</span>
                        </article>

                        <article className="auth-benefit">
                            <div className="auth-benefit__icon">
                                <AiIcon />
                            </div>

                            <strong>AI powered</strong>
                            <span>Smart insights</span>
                        </article>

                        <article className="auth-benefit">
                            <div className="auth-benefit__icon">
                                <LockIcon />
                            </div>

                            <strong>Trusted</strong>
                            <span>Data protected</span>
                        </article>
                    </div>
                </div>

                <div className="auth-trust-card">
                    <div className="auth-trust-card__icon">
                        <ShieldIcon />
                    </div>

                    <div className="auth-trust-card__copy">
                        <strong>
                            Trusted by EFU General Insurance
                        </strong>

                        <span>
                            Delivering excellence with trust since 1932.
                        </span>
                    </div>
                </div>

                <div
                    className="auth-decoration auth-decoration--one"
                    aria-hidden="true"
                />

                <div
                    className="auth-decoration auth-decoration--two"
                    aria-hidden="true"
                />
            </section>

            <section className="auth-panel">
                <LoginCard />
            </section>
        </main>
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

function AiIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <rect
                x="7"
                y="7"
                width="10"
                height="10"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <path
                d="M12 3V5M12 19V21M3 12H5M19 12H21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />

            <path
                d="M10 11H10.01M14 11H14.01M10 14C11.2 15 12.8 15 14 14"
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
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <path
                d="M8 10V7.5C8 5.6 9.8 4 12 4C14.2 4 16 5.6 16 7.5V10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}