import { ExpenseList } from "@/features/expenses/components/ExpenseList";
import { expenseApi } from "@/features/expenses/services/expenseApi";

export default async function ExpensesPage() {
  const expenses = await expenseApi.getExpenses();

  return <ExpenseList expenses={expenses} />;
}
