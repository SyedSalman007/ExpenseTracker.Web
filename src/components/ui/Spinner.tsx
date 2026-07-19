import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-12 w-12 border-4",
};

export function Spinner({ size = "md", className }: { size?: SpinnerSize; className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("animate-spin rounded-full border-current border-t-transparent", SIZE_CLASSES[size], className)}
    />
  );
}
