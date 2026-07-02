import { DashboardView } from "@/features/dashboard/components/DashboardView";
import { dashboardApi } from "@/features/dashboard/services/dashboardApi";

export default async function DashboardPage() {
  const summary = await dashboardApi.getSummary();
  return <DashboardView summary={summary} />;
}
