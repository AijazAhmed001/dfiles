import {
    type FormEvent,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

const REMEMBERED_EMAIL_KEY = "efu-remembered-email";

export function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const rememberedEmail = localStorage.getItem(
            REMEMBERED_EMAIL_KEY,
        );

        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const cleanEmail = email.trim();

        if (!cleanEmail) {
            setError("Please enter your email address.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            await login({
                email: cleanEmail,
                password,
            });

            if (rememberMe) {
                localStorage.setItem(
                    REMEMBERED_EMAIL_KEY,
                    cleanEmail,
                );
            } else {
                localStorage.removeItem(
                    REMEMBERED_EMAIL_KEY,
                );
            }

            navigate(ROUTES.home);
        } catch (loginError) {
            setError(
                loginError instanceof Error
                    ? loginError.message
                    : "Unable to sign in. Please check your credentials.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleForgotPassword() {
        setError(
            "Please contact your EFU system administrator to reset your password.",
        );
    }

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="login-field">
                <label htmlFor="email">Email address</label>

                <div className="login-input-wrapper">
                    <MailIcon />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        placeholder="admin@efu.com.pk"
                        autoComplete="email"
                        spellCheck={false}
                        disabled={isSubmitting}
                        onChange={(event) => {
                            setEmail(event.target.value);

                            if (error) {
                                setError("");
                            }
                        }}
                        required
                    />
                </div>
            </div>

            <div className="login-field">
                <label htmlFor="password">Password</label>

                <div className="login-input-wrapper">
                    <LockIcon />

                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={isSubmitting}
                        onChange={(event) => {
                            setPassword(event.target.value);

                            if (error) {
                                setError("");
                            }
                        }}
                        required
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        disabled={isSubmitting}
                        onClick={() =>
                            setShowPassword((current) => !current)
                        }
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOffIcon />
                        ) : (
                            <EyeIcon />
                        )}
                    </button>
                </div>
            </div>

            <div className="login-options">
                <label className="remember-option">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        disabled={isSubmitting}
                        onChange={(event) =>
                            setRememberMe(event.target.checked)
                        }
                    />

                    <span
                        className="remember-option__box"
                        aria-hidden="true"
                    >
                        <CheckIcon />
                    </span>

                    <span>Remember me</span>
                </label>

                <button
                    type="button"
                    className="forgot-password"
                    disabled={isSubmitting}
                    onClick={handleForgotPassword}
                >
                    Forgot password?
                </button>
            </div>

            {error ? (
                <div
                    className="login-error"
                    role="alert"
                    aria-live="polite"
                >
                    <AlertIcon />

                    <span>{error}</span>
                </div>
            ) : null}

            <button
                type="submit"
                className="login-submit"
                disabled={isSubmitting}
            >
                <span>
                    {isSubmitting
                        ? "Signing you in..."
                        : "Sign in securely"}
                </span>

                {isSubmitting ? (
                    <span
                        className="login-spinner"
                        aria-hidden="true"
                    />
                ) : (
                    <ArrowIcon />
                )}
            </button>
        </form>
    );
}

function MailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <path
                d="M4 7L12 13L20 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
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

function EyeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M2.5 12C4.5 8.4 7.7 6.5 12 6.5C16.3 6.5 19.5 8.4 21.5 12C19.5 15.6 16.3 17.5 12 17.5C7.7 17.5 4.5 15.6 2.5 12Z"
                stroke="currentColor"
                strokeWidth="1.7"
            />

            <circle
                cx="12"
                cy="12"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.7"
            />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M4 4L20 20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />

            <path
                d="M9.8 6.8C10.5 6.6 11.2 6.5 12 6.5C16.3 6.5 19.5 8.4 21.5 12C20.8 13.2 20 14.2 19 15"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />

            <path
                d="M14.8 14.8C14.1 15.5 13.2 16 12 16C9.8 16 8 14.2 8 12C8 10.8 8.5 9.9 9.2 9.2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />

            <path
                d="M6 7.5C4.5 8.5 3.3 10 2.5 12C4.5 15.6 7.7 17.5 12 17.5C13 17.5 13.9 17.4 14.7 17.1"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M5 12.5L9.5 17L19 7.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function AlertIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.8"
            />

            <path
                d="M12 7.5V13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />

            <circle
                cx="12"
                cy="16.5"
                r="1"
                fill="currentColor"
            />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M5 12H19M14 7L19 12L14 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}