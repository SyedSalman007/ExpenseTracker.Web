import { BudgetView } from "@/features/budget/components/BudgetView";
import { budgetApi } from "@/features/budget/services/budgetApi";

export default async function BudgetPage() {
  const [overview, categories] = await Promise.all([
    budgetApi.getOverview(),
    budgetApi.getCategories(),
  ]);
  return <BudgetView overview={overview} categories={categories} />;
}
