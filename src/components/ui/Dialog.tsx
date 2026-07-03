"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Dialog({ open, onClose, title, description, children }: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="card-shadow w-full max-w-112 rounded-xl bg-surface-container-lowest p-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-md flex items-start justify-between gap-md">
          <div>
            <h2 id="dialog-title" className="text-xl font-semibold text-on-surface">
              {title}
            </h2>
            {description ? (
              <p className="mt-xs text-sm text-on-surface-variant">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1 text-outline transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
