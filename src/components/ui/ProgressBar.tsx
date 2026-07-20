import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percent: number;
  trackClassName: string;
  fillClassName: string;
}

export function ProgressBar({ percent, trackClassName, fillClassName }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className={cn("w-full overflow-hidden rounded-full", trackClassName)}>
      <div className={cn("h-full rounded-full", fillClassName)} style={{ width: `${clamped}%` }} />
    </div>
  );
}
