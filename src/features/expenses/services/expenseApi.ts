import { mockExpenses } from "@/lib/mock-data";
import type { CreateExpensePayload, Expense } from "@/features/expenses/types";

export const expenseApi = {
  async getExpenses(): Promise<Expense[]> {
    return mockExpenses;
  },

  async createExpense(payload: CreateExpensePayload): Promise<Expense> {
    return {
      id: `exp_${Date.now()}`,
      merchant: payload.merchant,
      category: payload.category,
      amount: payload.amount,
      currency: payload.currency ?? "USD",
      date: payload.date ?? new Date().toISOString().split("T")[0],
      type: payload.type ?? "debit",
      icon: "payments",
    };
  },
};
