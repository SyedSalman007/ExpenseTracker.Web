import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "card-shadow bg-primary text-white hover:bg-primary-container active:scale-95",
  secondary:
    "card-shadow bg-secondary-container text-on-secondary-container hover:opacity-90 active:scale-95",
  outline:
    "border border-outline-variant text-on-surface-variant hover:bg-surface-container",
  ghost: "text-on-surface-variant hover:bg-surface-container",
  danger: "card-shadow bg-error text-white hover:opacity-90 active:scale-95",
};

export function Button({
  variant = "primary",
  className,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={cn(
        "flex items-center justify-center gap-xs rounded-xl px-lg py-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
}
