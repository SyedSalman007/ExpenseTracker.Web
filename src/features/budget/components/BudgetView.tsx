import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import type { BudgetCategory, BudgetOverview } from "@/features/budget/types";
import { Icon } from "@/components/ui/Icon";

interface BudgetViewProps {
  overview: BudgetOverview;
  categories: BudgetCategory[];
}

const statusStyles: Record<
  BudgetCategory["status"],
  { bar: string; iconBg: string; iconText: string; statusText: string; amountText: string }
> = {
  "over-limit": {
    bar: "bg-error",
    iconBg: "bg-error/10",
    iconText: "text-error",
    statusText: "text-error font-extrabold uppercase",
    amountText: "text-error",
  },
  "close-to-cap": {
    bar: "bg-tertiary",
    iconBg: "bg-tertiary/10",
    iconText: "text-tertiary",
    statusText: "text-tertiary font-bold",
    amountText: "text-on-surface",
  },
  healthy: {
    bar: "bg-secondary",
    iconBg: "bg-secondary/10",
    iconText: "text-secondary",
    statusText: "text-secondary font-bold",
    amountText: "text-on-surface",
  },
  steady: {
    bar: "bg-primary",
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    statusText: "text-on-surface-variant",
    amountText: "text-on-surface",
  },
};

export function BudgetView({ overview, categories }: BudgetViewProps) {
  return (
    <div className="space-y-lg">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-primary">
            Set Your Spending Guardrails
          </h1>
          <p className="text-base text-on-surface-variant">
            Define your limits and find your financial peace of mind.
          </p>
        </div>
        <div className="flex gap-sm">
          <button
            type="button"
            className="card-shadow flex items-center gap-2 rounded-xl bg-secondary-container px-lg py-sm font-bold text-on-secondary-container transition-all active:scale-95"
          >
            <Icon name="add" className="!text-xl" />
            Create Sub-Budget
          </button>
          <button
            type="button"
            className="card-shadow flex items-center gap-2 rounded-xl bg-primary-container px-lg py-sm font-bold text-on-primary-container transition-all active:scale-95"
          >
            <Icon name="edit_note" className="!text-xl" />
            Manage Caps
          </button>
        </div>
      </div>

      {/* Top Level Budget Grid */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-12">
        {/* Monthly Target Card */}
        <div className="card-shadow relative flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:col-span-4">
          <div className="relative z-10">
            <span className="mb-xs block font-numeric text-xs font-bold uppercase tracking-widest text-primary">
              Monthly Target
            </span>
            <div className="flex items-baseline gap-xs">
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(overview.monthlyLimit)}
              </span>
            </div>
            <p className="mt-sm text-sm text-on-surface-variant">
              Your total monthly spending limit across all categories.
            </p>
          </div>
          <div className="relative z-10 mt-xl">
            <button
              type="button"
              className="w-full rounded-lg bg-surface-container-high py-sm font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Apply Changes
            </button>
          </div>
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary-fixed opacity-10 blur-2xl" />
        </div>

        {/* Overall Budget Usage Card */}
        <div className="glass-card card-shadow rounded-xl border border-outline-variant p-lg lg:col-span-8">
          <div className="mb-lg flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-on-surface">
                Overall Budget Usage
              </h3>
              <p className="text-sm text-on-surface-variant">
                Spent {formatCurrency(overview.totalSpent)} of your{" "}
                {formatCurrency(overview.monthlyLimit)} limit
              </p>
            </div>
            <div className="text-right">
              <span className="font-numeric text-xl font-bold text-secondary">
                {Math.round(overview.percentUsed)}%
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Consumed
              </p>
            </div>
          </div>
          <div className="relative mb-lg h-8 w-full overflow-hidden rounded-full bg-surface-container">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary shadow-inner transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(overview.percentUsed, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-1 gap-md sm:grid-cols-3">
            <div className="rounded-lg bg-surface-container-low p-md">
              <span className="mb-xs block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Remaining
              </span>
              <span className="font-numeric text-xl font-bold text-on-surface">
                {formatCurrency(overview.remaining)}
              </span>
            </div>
            <div className="rounded-lg border-l-4 border-primary bg-surface-container-low p-md">
              <span className="mb-xs block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Daily Average
              </span>
              <span className="font-numeric text-xl font-bold text-on-surface">
                {formatCurrency(overview.dailyAverage)}
              </span>
            </div>
            <div className="rounded-lg border-l-4 border-secondary bg-surface-container-low p-md">
              <span className="font-numeric text-xl font-bold text-secondary">
                Safe Zone
              </span>
              <p className="text-sm text-on-surface-variant">
                On track to stay under cap
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* By Category Section */}
      <section className="space-y-md">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-on-surface">
            Budget Breakdown By Category
          </h3>
          <button
            type="button"
            className="flex items-center gap-xs font-bold text-primary hover:underline"
          >
            <span className="text-sm">View detailed breakdown</span>
            <Icon name="arrow_forward" className="!text-sm" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const percent = (category.spent / category.limit) * 100;
            const styles = statusStyles[category.status];
            return (
              <div
                key={category.id}
                className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-md transition-colors hover:border-primary"
              >
                <div className="mb-sm flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${styles.iconBg} ${styles.iconText}`}
                    >
                      <Icon name={category.icon} />
                    </span>
                    <span className="font-bold text-on-surface">{category.label}</span>
                  </div>
                  <span className={`font-numeric text-sm font-bold ${styles.amountText}`}>
                    {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
                  </span>
                </div>
                <div className="mb-xs h-2 w-full overflow-hidden rounded-full bg-surface-container">
                  <div
                    className={`h-full rounded-full ${styles.bar}`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
                    {Math.round(percent)}% Used
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider ${styles.statusText}`}>
                    {category.statusLabel}
                  </span>
                </div>
              </div>
            );
          })}
          {/* Add Category */}
          <button
            type="button"
            className="card-shadow group flex flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-md py-4 text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
          >
            <Icon name="add_circle" className="mb-2 !text-3xl" />
            <span className="font-bold">Add Category</span>
          </button>
        </div>
      </section>

      {/* Bottom Insight Card */}
      <div className="relative overflow-hidden rounded-2xl bg-primary-container p-xl text-on-primary-container shadow-lg">
        <div className="relative z-10 flex flex-col items-center gap-lg md:flex-row">
          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-md">
            <Icon name="auto_awesome" className="!text-5xl" filled />
          </div>
          <div className="grow text-center md:text-left">
            <h4 className="mb-xs text-xl font-semibold">Serene Smart Insights</h4>
            <p className="max-w-2xl text-base opacity-90">
              Based on your current spending velocity in{" "}
              <span className="font-bold underline decoration-secondary">Shopping</span>,
              you are projected to exceed your total budget by{" "}
              <span className="font-bold">$125.00</span> by the end of the month.
              Consider reallocating from your{" "}
              <span className="font-bold">Entertainment</span> surplus.
            </p>
          </div>
          <button
            type="button"
            className="whitespace-nowrap rounded-xl bg-white px-lg py-sm font-bold text-primary transition-colors hover:bg-surface-container"
          >
            Optimize Now
          </button>
        </div>
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-secondary-container/20 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-tertiary/30 blur-[80px]" />
      </div>
    </div>
  );
}
