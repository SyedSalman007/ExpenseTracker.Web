import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import type { DashboardSummary } from "@/features/dashboard/types";
import { Icon } from "@/components/ui/Icon";
import { TransactionItem } from "@/features/expenses/components/TransactionItem";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

interface DashboardViewProps {
  summary: DashboardSummary;
}

export function DashboardView({ summary }: DashboardViewProps) {
  return (
    <div className="space-y-xl">
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

      <button
        type="button"
        aria-label="Add transaction"
        className="fixed bottom-lg right-lg flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary-container active:scale-95"
      >
        <Icon name="add" className="!text-3xl" />
      </button>
    </div>
  );
}
