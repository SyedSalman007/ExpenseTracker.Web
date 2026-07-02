import { mockBudgetCategories, mockBudgetOverview } from "@/lib/mock-data";

export const budgetApi = {
  async getOverview() {
    return mockBudgetOverview;
  },
  async getCategories() {
    return mockBudgetCategories;
  },
};
