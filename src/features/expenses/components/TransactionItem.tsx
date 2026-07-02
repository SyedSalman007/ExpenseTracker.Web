import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import { getCategoryLabel } from "@/features/categories/utils/getCategoryMeta";
import type { Expense } from "@/features/expenses/types";
import { Icon } from "@/components/ui/Icon";

interface TransactionItemProps {
  expense: Expense;
}

export function TransactionItem({ expense }: TransactionItemProps) {
  const isIncome = expense.category === "income";
  const amountPrefix = isIncome ? "+" : "-";

  return (
    <div className="group flex cursor-pointer items-center gap-md rounded-xl p-sm transition-colors hover:bg-surface-container-low">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-container transition-colors ${
          isIncome
            ? "text-secondary group-hover:bg-secondary group-hover:text-white"
            : "text-primary group-hover:bg-primary-container group-hover:text-white"
        }`}
      >
        <Icon name={expense.icon ?? "payments"} />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-bold">{expense.merchant}</p>
        <p className="text-xs text-on-surface-variant">
          {getCategoryLabel(expense.category)}
          {expense.timeAgo ? ` • ${expense.timeAgo}` : ""}
        </p>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-bold ${
            isIncome ? "text-secondary" : "text-on-surface"
          }`}
        >
          {amountPrefix}
          {formatCurrency(expense.amount, expense.currency)}
        </p>
        <p className="text-[10px] font-bold uppercase text-outline">
          {expense.type}
        </p>
      </div>
    </div>
  );
}
