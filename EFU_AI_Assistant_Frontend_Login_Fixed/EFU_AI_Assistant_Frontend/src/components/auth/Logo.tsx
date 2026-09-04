type LogoProps = {
    compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
    return (
        <div
            className={`brand-logo ${
                compact ? "brand-logo--compact" : ""
            }`}
            aria-label="EFU AI Assistant"
        >
            <div className="brand-logo__image-wrapper">
                <img
                    src="/images/efu-login-logo.png"
                    alt="EFU"
                    className="brand-logo__image"
                />
            </div>

            {!compact ? (
                <div className="brand-logo__copy">
                    <strong>
                        <span>EFU</span> AI Assistant
                    </strong>

                    <p>Enterprise Intelligence Platform</p>
                </div>
            ) : null}
        </div>
    );
}