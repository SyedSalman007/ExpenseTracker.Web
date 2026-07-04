"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { FormInput, FormSelect } from "@/components/ui/FormField";
import type { BudgetCategory } from "@/features/budget/types";
import type { CategoryPayload } from "@/features/budget/services/budgetApi";

const ICON_OPTIONS = [
  { value: "restaurant", label: "Dining" },
  { value: "directions_car", label: "Transport" },
  { value: "shopping_bag", label: "Shopping" },
  { value: "sports_esports", label: "Entertainment" },
  { value: "fitness_center", label: "Health & Fitness" },
  { value: "home", label: "Housing" },
  { value: "bolt", label: "Utilities" },
  { value: "shopping_cart", label: "Groceries" },
];

interface CategoryFormDialogProps {
  open: boolean;
  category?: BudgetCategory;
  onClose: () => void;
  onSubmit: (payload: CategoryPayload) => void;
}

export function CategoryFormDialog({ open, category, onClose, onSubmit }: CategoryFormDialogProps) {
  const isEditing = Boolean(category);
  const [label, setLabel] = useState(category?.label ?? "");
  const [limit, setLimit] = useState(category?.limit?.toString() ?? "");
  const [spent, setSpent] = useState(category?.spent?.toString() ?? "0");
  const [icon, setIcon] = useState(category?.icon ?? ICON_OPTIONS[0].value);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit({
      label,
      limit: Number(limit),
      spent: Number(spent),
      icon,
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Sub-Budget" : "Create Sub-Budget"}
      description={isEditing ? "Update this category's spending cap." : "Set a spending cap for a new category."}
    >
      <form className="space-y-md" onSubmit={handleSubmit}>
        <FormInput
          id="category-label"
          label="Category Name"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          required
        />
        <FormSelect
          id="category-icon"
          label="Icon"
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
          options={ICON_OPTIONS}
        />
        <FormInput
          id="category-limit"
          label="Monthly Cap"
          type="number"
          step="0.01"
          min="0"
          value={limit}
          onChange={(event) => setLimit(event.target.value)}
          required
        />
        <FormInput
          id="category-spent"
          label="Spent So Far"
          type="number"
          step="0.01"
          min="0"
          value={spent}
          onChange={(event) => setSpent(event.target.value)}
          required
        />
        <div className="flex justify-end gap-sm pt-sm">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? "Save Changes" : "Create Sub-Budget"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
