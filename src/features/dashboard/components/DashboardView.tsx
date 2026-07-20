import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import type { DashboardSummary } from "@/features/dashboard/types";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TransactionItem } from "@/features/expenses/components/TransactionItem";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

interface DashboardViewProps {
  summary: DashboardSummary;
}

export function DashboardView({ summary }: DashboardViewProps) {
  const monthlyLimit = summary.monthSpending + summary.remainingBudget;

  const statCards = [
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
  ];

  return (
    <div className="space-y-xl">
      {/* Hero + Savings Goal */}
      <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
        <div className="group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-primary to-tertiary p-lg text-on-primary shadow-lg md:col-span-2 md:min-h-[220px] md:p-xl">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl transition-all group-hover:bg-white/20" />
          <div className="relative z-10">
            <p className="mb-base text-xs font-semibold uppercase tracking-wider opacity-80">
              {summary.greeting}, {summary.userName}
            </p>
            <h2 className="mb-sm text-2xl font-bold md:text-3xl">
              You&apos;ve saved{" "}
              <span className="rounded-lg bg-secondary-fixed px-2 py-0.5 text-on-secondary-container">
                {formatCurrency(summary.savingsDelta, summary.currency)}
              </span>{" "}
              more than last month. Keep it up!
            </h2>
          </div>
          <div className="relative z-10 mt-lg hidden gap-md md:flex">
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

        <div className="card-shadow hidden flex-col justify-center rounded-xl border border-outline-variant bg-surface-container-lowest p-xl text-center md:flex">
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

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-card-gap md:grid-cols-3 md:gap-lg">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-md transition-transform hover:-translate-y-1 md:p-lg"
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
            {card.label === "THIS MONTH SPENDING" && (
              <div className="mt-sm space-y-1">
                <ProgressBar
                  percent={monthlyLimit > 0 ? Math.round((summary.monthSpending / monthlyLimit) * 100) : 0}
                  trackClassName="h-1.5 bg-surface-container"
                  fillClassName="bg-primary"
                />
                <p className="text-xs text-on-surface-variant">
                  of {formatCurrency(monthlyLimit, summary.currency)} monthly limit
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Category Distribution + Recent Transactions */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-5">
        <section className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-md lg:col-span-3 lg:p-xl">
          <div className="mb-lg flex items-center justify-between lg:mb-xl">
            <h3 className="text-lg font-bold lg:text-xl">Category Distribution</h3>
            <button
              type="button"
              className="text-xs font-bold text-primary hover:underline lg:text-sm"
            >
              Full Details
            </button>
          </div>
          <div className="grid grid-cols-2 gap-md text-center sm:grid-cols-4 lg:gap-lg">
            {summary.categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center gap-2">
                <div className="relative h-20 w-20 lg:h-24 lg:w-24">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-surface-container-low"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className={category.color}
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42 * (1 - category.percent / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {category.percent}%
                  </div>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-md lg:col-span-2 lg:p-xl">
          <div className="mb-lg flex items-center justify-between lg:mb-xl">
            <h3 className="text-lg font-bold lg:text-xl">Recent Transactions</h3>
            <Icon
              name="filter_list"
              className="cursor-pointer text-outline transition-colors hover:text-primary"
            />
          </div>
          <div className="space-y-sm lg:space-y-md">
            {summary.recentExpenses.map((expense) => (
              <TransactionItem key={expense.id} expense={expense} />
            ))}
          </div>
          <Link
            href={ROUTES.EXPENSES}
            className="mt-lg block w-full rounded-lg border border-outline-variant py-sm text-center text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container lg:mt-xl"
          >
            View All Transactions
          </Link>
        </section>
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
