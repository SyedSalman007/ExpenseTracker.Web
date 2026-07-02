import type { ExpenseCategory } from "@/features/expenses/types";

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  housing: "Housing",
  food: "Food",
  travel: "Travel",
  other: "Other",
  groceries: "Groceries",
  dining: "Dining",
  transport: "Transport",
  utilities: "Utilities",
  bills: "Bills",
  income: "Income",
};

export function getCategoryLabel(category: ExpenseCategory): string {
  return CATEGORY_LABELS[category];
}

/** Tailwind classes for the small pill badge shown next to a transaction's category. */
const CATEGORY_BADGE_CLASSES: Record<ExpenseCategory, string> = {
  food: "bg-primary/10 text-primary",
  groceries: "bg-primary/10 text-primary",
  dining: "bg-primary/10 text-primary",
  housing: "bg-secondary/10 text-secondary",
  transport: "bg-surface-container text-on-surface-variant",
  travel: "bg-surface-container text-on-surface-variant",
  utilities: "bg-error/10 text-error",
  bills: "bg-error/10 text-error",
  income: "bg-secondary/10 text-secondary",
  other: "bg-surface-container text-on-surface-variant",
};

export function getCategoryBadgeClasses(category: ExpenseCategory): string {
  return CATEGORY_BADGE_CLASSES[category];
}
