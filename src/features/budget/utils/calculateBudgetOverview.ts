import type { BudgetOverview } from "@/features/budget/types";

export function calculateBudgetOverview(
  totalSpent: number,
  monthlyLimit: number
): BudgetOverview {
  const remaining = monthlyLimit - totalSpent;
  const percentUsed = monthlyLimit > 0 ? (totalSpent / monthlyLimit) * 100 : 0;
  const daysLeft = 8;
  const daysElapsed = 31 - daysLeft;

  return {
    monthlyLimit,
    totalSpent,
    remaining,
    percentUsed: Math.min(percentUsed, 100),
    isOverBudget: totalSpent > monthlyLimit,
    daysLeft,
    dailyAverage: daysElapsed > 0 ? totalSpent / daysElapsed : 0,
  };
}
