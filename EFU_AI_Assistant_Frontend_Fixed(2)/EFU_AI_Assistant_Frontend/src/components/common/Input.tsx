import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

export function Input({
    label,
    error,
    id,
    className = "",
    ...inputProps
}: InputProps) {
    return (
        <label className="input-field" htmlFor={id}>
            <span className="input-label">{label}</span>

            <input
                id={id}
                className={`input-control ${className}`}
                {...inputProps}
            />

            {error ? <span className="input-error">{error}</span> : null}
        </label>
    );
}
