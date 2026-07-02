export interface BudgetOverview {
  monthlyLimit: number;
  totalSpent: number;
  remaining: number;
  percentUsed: number;
  isOverBudget: boolean;
  daysLeft: number;
  dailyAverage: number;
}

export type BudgetCategoryStatus = "over-limit" | "close-to-cap" | "healthy" | "steady";

export interface BudgetCategory {
  id: string;
  label: string;
  spent: number;
  limit: number;
  icon: string;
  status: BudgetCategoryStatus;
  statusLabel: string;
}
