import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type IconButtonVariant = "default" | "danger";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
}

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  default: "text-outline hover:bg-surface-container hover:text-primary",
  danger: "text-outline hover:bg-error/10 hover:text-error",
};

export function IconButton({ variant = "default", className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-lg p-2 transition-colors disabled:pointer-events-none disabled:opacity-50",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
