"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { FormInput, FormSelect } from "@/components/ui/FormField";
import { getCategoryLabel } from "@/features/categories/utils/getCategoryMeta";
import type { CreateExpensePayload, Expense, ExpenseCategory } from "@/features/expenses/types";

const CATEGORY_OPTIONS: ExpenseCategory[] = [
  "groceries",
  "dining",
  "housing",
  "transport",
  "travel",
  "utilities",
  "bills",
  "food",
  "income",
  "other",
];

interface ExpenseFormDialogProps {
  open: boolean;
  expense?: Expense;
  onClose: () => void;
  onSubmit: (payload: CreateExpensePayload) => Promise<void>;
}

export function ExpenseFormDialog({ open, expense, onClose, onSubmit }: ExpenseFormDialogProps) {
  const isEditing = Boolean(expense);
  const [merchant, setMerchant] = useState(expense?.merchant ?? "");
  const [category, setCategory] = useState<ExpenseCategory>(expense?.category ?? "groceries");
  const [amount, setAmount] = useState(expense?.amount?.toString() ?? "");
  const [date, setDate] = useState(expense?.date ?? new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState(expense?.note ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        merchant,
        category,
        amount: Number(amount),
        date,
        note: note || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Expense" : "New Expense"}
      description={isEditing ? "Update the details for this transaction." : "Log a new transaction."}
    >
      <form className="space-y-md" onSubmit={handleSubmit}>
        <FormInput
          id="expense-merchant"
          label="Merchant"
          value={merchant}
          onChange={(event) => setMerchant(event.target.value)}
          required
        />
        <FormSelect
          id="expense-category"
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value as ExpenseCategory)}
          options={CATEGORY_OPTIONS.map((value) => ({ value, label: getCategoryLabel(value) }))}
        />
        <FormInput
          id="expense-amount"
          label="Amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
        <FormInput
          id="expense-date"
          label="Date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
        <FormInput
          id="expense-note"
          label="Note (optional)"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <div className="flex justify-end gap-sm pt-sm">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isEditing ? "Save Changes" : "Add Expense"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
