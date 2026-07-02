export type ExpenseCategory =
  | "housing"
  | "food"
  | "travel"
  | "other"
  | "groceries"
  | "dining"
  | "transport"
  | "utilities"
  | "bills"
  | "income";

export type TransactionType = "debit" | "credit" | "transfer";

export interface Expense {
  id: string;
  merchant: string;
  category: ExpenseCategory;
  amount: number;
  currency: string;
  date: string;
  type: TransactionType;
  timeAgo?: string;
  icon?: string;
  note?: string;
}

export interface CreateExpensePayload {
  merchant: string;
  category: ExpenseCategory;
  amount: number;
  currency?: string;
  date?: string;
  type?: TransactionType;
  note?: string;
}
