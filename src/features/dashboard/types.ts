import type { Expense } from "@/features/expenses/types";

export interface CategoryDistribution {
  id: string;
  label: string;
  percent: number;
  color: string;
}

export interface SavingsGoal {
  title: string;
  current: number;
  target: number;
  percent: number;
}

export interface DashboardSummary {
  userName: string;
  greeting: string;
  savingsDelta: number;
  totalBalance: number;
  monthSpending: number;
  remainingBudget: number;
  currency: string;
  currentMonth: string;
  savingsGoal: SavingsGoal;
  categories: CategoryDistribution[];
  recentExpenses: Expense[];
}
