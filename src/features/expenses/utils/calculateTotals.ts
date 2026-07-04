import type { Expense } from "@/features/expenses/types";

export function getTodayTotal(expenses: Expense[]): number {
  const today = new Date().toISOString().split("T")[0];
  return expenses
    .filter((expense) => expense.date === today)
    .reduce((sum, expense) => sum + expense.amount, 0);
}

export function getMonthTotal(expenses: Expense[]): number {
  const month = new Date().toISOString().slice(0, 7);
  return expenses
    .filter((expense) => expense.date.startsWith(month))
    .reduce((sum, expense) => sum + expense.amount, 0);
}
