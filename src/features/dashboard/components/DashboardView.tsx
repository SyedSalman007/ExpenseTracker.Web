import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import { getCategoryLabel } from "@/features/categories/utils/getCategoryMeta";
import type { DashboardSummary } from "@/features/dashboard/types";
import { Icon } from "@/components/ui/Icon";
import { TransactionItem } from "@/features/expenses/components/TransactionItem";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

interface DashboardViewProps {
  summary: DashboardSummary;
}

const TRANSACTION_ICON_COLORS = [
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "text-error",
];

export function DashboardView({ summary }: DashboardViewProps) {
  const monthlyLimit = summary.monthSpending + summary.remainingBudget;
  const spentPercent =
    monthlyLimit > 0
      ? Math.min(100, Math.round((summary.monthSpending / monthlyLimit) * 100))
      : 0;

  return (
    <div className="space-y-xl">
      {/* Mobile layout */}
      <div className="space-y-card-gap md:hidden">
        <div className="relative mb-xl h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary to-tertiary shadow-lg">
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-r from-primary/60 to-transparent p-lg">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-on-primary/80">
              Welcome back, {summary.userName}
            </p>
            <h2 className="text-2xl font-bold text-on-primary">
              You&apos;ve saved{" "}
              {formatCurrency(summary.savingsDelta, summary.currency)} this
              month
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-card-gap">
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-card transition-transform hover:scale-[1.02]">
            <div className="mb-sm flex items-center justify-between">
              <span className="rounded-lg bg-primary-fixed p-2 text-primary">
                <Icon name="account_balance_wallet" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Total Balance
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(summary.totalBalance, summary.currency)}
              </p>
              <p className="flex items-center gap-1 text-sm text-secondary">
                <Icon name="trending_up" className="!text-base" /> +2.4% from
                last month
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-card transition-transform hover:scale-[1.02]">
            <div className="mb-sm flex items-center justify-between">
              <span className="rounded-lg bg-error-container p-2 text-error">
                <Icon name="shopping_cart" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                This Month
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {formatCurrency(summary.monthSpending, summary.currency)}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${spentPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-card transition-transform hover:scale-[1.02]">
            <div className="mb-sm flex items-center justify-between">
              <span className="rounded-lg bg-secondary-container p-2 text-secondary">
                <Icon name="savings" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Remaining Budget
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {formatCurrency(summary.remainingBudget, summary.currency)}
              </p>
              <p className="text-sm text-on-surface-variant">
                of {formatCurrency(monthlyLimit, summary.currency)} monthly
                limit
              </p>
            </div>
          </div>
        </div>

        <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-card">
          <div className="mb-lg flex items-center justify-between">
            <h3 className="text-lg font-bold">Category Distribution</h3>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
            >
              Details <Icon name="chevron_right" className="!text-sm" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-md">
            {summary.categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center gap-2">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <svg className="h-full w-full -rotate-90">
                    <circle
                      className="text-surface-container"
                      cx="40"
                      cy="40"
                      r="34"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className={category.color}
                      cx="40"
                      cy="40"
                      r="34"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="213.6"
                      strokeDashoffset={213.6 * (1 - category.percent / 100)}
                    />
                  </svg>
                  <span className="absolute text-sm font-bold">
                    {category.percent}%
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Transactions</h3>
            <button
              type="button"
              className="rounded-full p-2 transition-colors hover:bg-surface-container"
            >
              <Icon name="filter_list" className="text-on-surface-variant" />
            </button>
          </div>
          <div className="space-y-card-gap">
            {summary.recentExpenses.map((expense, i) => {
              const isIncome = expense.category === "income";
              return (
                <div
                  key={expense.id}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-high ${
                        TRANSACTION_ICON_COLORS[i % TRANSACTION_ICON_COLORS.length]
                      }`}
                    >
                      <Icon name={expense.icon ?? "payments"} />
                    </div>
                    <div>
                      <p className="font-semibold">{expense.merchant}</p>
                      <p className="text-sm text-on-surface-variant">
                        {getCategoryLabel(expense.category)}
                        {expense.timeAgo ? ` • ${expense.timeAgo}` : ""}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-bold ${isIncome ? "text-secondary" : ""}`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(expense.amount, expense.currency)}
                  </p>
                </div>
              );
            })}
          </div>
          <Link
            href={ROUTES.EXPENSES}
            className="block w-full rounded-xl border border-dashed border-outline-variant py-md text-center text-xs font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-surface-container-low active:scale-95"
          >
            View All Transactions
          </Link>
        </section>
      </div>

      {/* Desktop layout */}
      <div className="hidden space-y-xl md:block">
      <div className="grid h-auto grid-cols-1 gap-lg md:grid-cols-3">
        <div className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-xl bg-primary-container p-xl text-on-primary-container shadow-lg md:col-span-2">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl transition-all group-hover:bg-white/20" />
          <div className="relative z-10">
            <p className="mb-base text-xs font-semibold uppercase tracking-wider opacity-80">
              Financial Overview
            </p>
            <h2 className="mb-sm text-3xl font-bold">
              {summary.greeting}, {summary.userName}.
            </h2>
            <p className="max-w-112 text-base opacity-90">
              You&apos;ve saved{" "}
              <span className="rounded-lg bg-secondary-fixed px-2 py-0.5 font-bold text-on-secondary-container">
                {formatCurrency(summary.savingsDelta, summary.currency)}
              </span>{" "}
              more than last month. Keep it up!
            </p>
          </div>
          <div className="relative z-10 mt-lg flex gap-md">
            <button
              type="button"
              className="rounded-lg bg-white px-lg py-sm font-bold text-primary shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
            >
              View Insights
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/30 bg-primary/20 px-lg py-sm font-bold text-white transition-all hover:bg-primary/30 active:scale-[0.98]"
            >
              Monthly Plan
            </button>
          </div>
        </div>

        <div className="card-shadow flex flex-col justify-center rounded-xl border border-outline-variant bg-surface-container-lowest p-xl text-center">
          <div className="mb-sm text-primary">
            <Icon name="savings" className="!text-4xl" />
          </div>
          <h3 className="mb-xs text-xl font-semibold">Savings Goal</h3>
          <p className="mb-md text-sm text-on-surface-variant">
            {summary.savingsGoal.title}
          </p>
          <div className="mb-xs h-2 w-full rounded-full bg-surface-container-low">
            <div
              className="h-full rounded-full bg-primary shadow-[0_0_8px_rgba(0,60,144,0.3)]"
              style={{ width: `${summary.savingsGoal.percent}%` }}
            />
          </div>
          <p className="text-right text-sm font-bold text-primary">
            {summary.savingsGoal.percent}% of{" "}
            {formatCurrency(summary.savingsGoal.target, summary.currency)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
        {[
          {
            label: "TOTAL BALANCE",
            value: summary.totalBalance,
            icon: "account_balance",
            badge: "+2.4%",
            badgeColor: "text-secondary",
            iconBg: "bg-primary/10 text-primary",
          },
          {
            label: "THIS MONTH SPENDING",
            value: summary.monthSpending,
            icon: "trending_down",
            badge: "-12.0%",
            badgeColor: "text-error",
            iconBg: "bg-error/10 text-error",
          },
          {
            label: "REMAINING BUDGET",
            value: summary.remainingBudget,
            icon: "payments",
            badge: "8 days left",
            badgeColor: "text-outline",
            iconBg: "bg-secondary/10 text-secondary",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-lg transition-transform hover:-translate-y-1"
          >
            <div className="mb-sm flex items-start justify-between">
              <span className={`rounded-lg p-base ${card.iconBg}`}>
                <Icon name={card.icon} />
              </span>
              <span className={`text-xs font-bold ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>
            <p className="text-xs font-semibold tracking-wider text-on-surface-variant">
              {card.label}
            </p>
            <p className="mt-xs text-2xl font-bold">
              {formatCurrency(card.value, summary.currency)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-5">
        <div className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-xl lg:col-span-3">
          <div className="mb-xl flex items-center justify-between">
            <h3 className="text-xl font-semibold">Category Distribution</h3>
            <button
              type="button"
              className="text-sm font-bold text-primary hover:underline"
            >
              Full Details
            </button>
          </div>
          <div className="grid grid-cols-2 gap-lg text-center sm:grid-cols-4">
            {summary.categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center">
                <div className="relative mb-md h-24 w-24">
                  <svg className="h-full w-full -rotate-90 transform">
                    <circle
                      className="text-surface-container-low"
                      cx="48"
                      cy="48"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className={category.color}
                      cx="48"
                      cy="48"
                      r="40"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 * (1 - category.percent / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {category.percent}%
                  </div>
                </div>
                <span className="text-xs font-semibold tracking-wider text-on-surface-variant">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-xl lg:col-span-2">
          <div className="mb-xl flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
            <Icon
              name="filter_list"
              className="cursor-pointer text-outline transition-colors hover:text-primary"
            />
          </div>
          <div className="space-y-md">
            {summary.recentExpenses.map((expense) => (
              <TransactionItem key={expense.id} expense={expense} />
            ))}
          </div>
          <Link
            href={ROUTES.EXPENSES}
            className="mt-xl block w-full rounded-lg border border-outline-variant py-sm text-center text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            View All Transactions
          </Link>
        </div>
      </div>
      </div>

      <button
        type="button"
        aria-label="Add transaction"
        className="fixed bottom-24 right-md z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary-container active:scale-95 lg:bottom-lg lg:right-lg"
      >
        <Icon name="add" className="!text-3xl" />
      </button>
    </div>
  );
}
