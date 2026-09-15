"use client";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[var(--color-primary-container)] text-white hover:bg-[var(--color-primary)]",

    secondary:
      "border border-[var(--color-outline-variant)] bg-white text-[var(--color-secondary)] hover:bg-[#f5f3ff]",

    ghost:
      "bg-transparent text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        h-10 rounded-lg px-5
        text-sm font-semibold
        transition-colors duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Signing in..." : children}
    </button>
  );
}