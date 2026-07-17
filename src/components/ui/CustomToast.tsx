"use client";

import { toast } from "sonner";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface CustomToastProps {
  type: "success" | "error";
  message: string;
  id?: string;
}

export function showCustomToast({ type, message, id }: CustomToastProps) {
  toast.custom(
    () => (
      // Sonner's custom-toast <li> is left-anchored to its (already centered)
      // toaster slot rather than re-centering itself, so this outer element
      // pins the same slot width and centers the visible box within it.
      <div style={{ width: "min(22.25rem, calc(100vw - 2rem))" }}>
        <div
          id={id || (type === "success" ? "toast-success" : "toast-error")}
          style={{ width: "fit-content", maxWidth: "100%" }}
          className={cn(
            "mx-auto flex items-start gap-sm rounded-lg border bg-surface-container-lowest p-md text-sm shadow-lg",
            type === "success" ? "border-secondary/30" : "border-error/30"
          )}
        >
          <Icon
            name={type === "success" ? "check_circle" : "cancel"}
            className={cn("shrink-0 !text-xl", type === "success" ? "text-secondary" : "text-error")}
            filled
          />
          <div className="min-w-0 flex-1 whitespace-normal break-words text-on-surface">{message}</div>
        </div>
      </div>
    ),
    { position: "top-center", duration: 5000 }
  );
}
