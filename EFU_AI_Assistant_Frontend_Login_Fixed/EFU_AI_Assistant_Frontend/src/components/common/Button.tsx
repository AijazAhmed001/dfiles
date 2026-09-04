import { ButtonHTMLAttributes, ReactNode } from "react";

import { LoaderCircle } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "ghost";
};

export function Button({
    children,
    className = "",
    isLoading = false,
    variant = "primary",
    disabled,
    ...buttonProps
}: ButtonProps) {
    return (
        <button
            className={`button button-${variant} ${className}`}
            disabled={disabled || isLoading}
            {...buttonProps}
        >
            {isLoading ? (
                <LoaderCircle className="button-loader" size={18} />
            ) : null}

            <span>{children}</span>
        </button>
    );
}
