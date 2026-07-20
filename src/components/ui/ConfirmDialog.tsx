"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  async function handleConfirm() {
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <Dialog open={open} onClose={onCancel} title={title} description={description}>
      <div className="mt-lg flex justify-end gap-sm">
        <Button variant="outline" onClick={onCancel} disabled={isConfirming}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm} isLoading={isConfirming}>
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}
