import { mockBudgetCategories, mockBudgetOverview } from "@/lib/mock-data";
import type { BudgetCategory, BudgetOverview } from "@/features/budget/types";

export interface CategoryPayload {
  label: string;
  spent: number;
  limit: number;
  icon: string;
}

function deriveStatus(spent: number, limit: number): Pick<BudgetCategory, "status" | "statusLabel"> {
  const percent = limit > 0 ? spent / limit : 0;
  if (percent > 1) return { status: "over-limit", statusLabel: "Over Limit" };
  if (percent > 0.8) return { status: "close-to-cap", statusLabel: "Close to cap" };
  if (percent > 0.5) return { status: "steady", statusLabel: "Steady" };
  return { status: "healthy", statusLabel: "Healthy" };
}

export const budgetApi = {
  async getOverview() {
    return mockBudgetOverview;
  },
  async getCategories() {
    return mockBudgetCategories;
  },

  async createCategory(payload: CategoryPayload): Promise<BudgetCategory> {
    return {
      id: `cat_${Date.now()}`,
      label: payload.label,
      spent: payload.spent,
      limit: payload.limit,
      icon: payload.icon,
      ...deriveStatus(payload.spent, payload.limit),
    };
  },

  async updateCategory(id: string, payload: CategoryPayload): Promise<BudgetCategory> {
    return {
      id,
      label: payload.label,
      spent: payload.spent,
      limit: payload.limit,
      icon: payload.icon,
      ...deriveStatus(payload.spent, payload.limit),
    };
  },

  async deleteCategory(_id: string): Promise<void> {
    return;
  },

  async updateMonthlyLimit(monthlyLimit: number): Promise<BudgetOverview> {
    const totalSpent = mockBudgetOverview.totalSpent;
    return {
      ...mockBudgetOverview,
      monthlyLimit,
      remaining: monthlyLimit - totalSpent,
      percentUsed: monthlyLimit > 0 ? Math.round((totalSpent / monthlyLimit) * 100) : 0,
      isOverBudget: totalSpent > monthlyLimit,
    };
  },
};
