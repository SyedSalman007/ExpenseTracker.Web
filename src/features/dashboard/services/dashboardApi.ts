import { mockDashboardSummary } from "@/lib/mock-data";

export const dashboardApi = {
  async getSummary() {
    return mockDashboardSummary;
  },
};
