"use client";

import { useState } from "react";
import type { Expense } from "@/features/expenses/types";
import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import { getCategoryBadgeClasses } from "@/features/categories/utils/getCategoryMeta";
import { formatDate } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

interface ExpenseListProps {
  expenses: Expense[];
}

const FILTER_CHIPS = ["All", "Food", "Rent", "Utilities", "Travel"] as const;

export function ExpenseList({ expenses }: ExpenseListProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTER_CHIPS)[number]>("All");

  const totalSpending = expenses
    .filter((expense) => expense.category !== "income")
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-xl">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-display-lg font-bold text-primary">Expenses</h1>
          <p className="text-base text-on-surface-variant">
            Review and manage your daily expenditures.
          </p>
        </div>
        <button
          type="button"
          className="card-shadow flex items-center gap-xs rounded-xl bg-primary px-lg py-sm font-bold text-white transition-all hover:bg-primary-container active:scale-95"
        >
          <Icon name="add" />
          <span>New Expense</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        <div className="card-shadow relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <div className="mb-sm flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-outline">
                Total Monthly Spending
              </p>
              <h3 className="mt-xs text-display-lg font-bold text-primary">
                {formatCurrency(totalSpending)}
              </h3>
            </div>
            <div className="rounded-lg bg-primary-container/10 p-sm text-primary">
              <Icon name="trending_up" />
            </div>
          </div>
          <div className="flex items-center gap-xs font-bold text-secondary">
            <Icon name="arrow_downward" className="!text-sm" />
            <span className="text-sm">12% from last month</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden bg-primary-container/20">
            <div className="h-full w-2/3 rounded-r-full bg-primary" />
          </div>
        </div>

        <div className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <div className="mb-sm flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-outline">
                Budget Remaining
              </p>
              <h3 className="mt-xs text-display-lg font-bold text-secondary">
                {formatCurrency(1279.5)}
              </h3>
            </div>
            <div className="rounded-lg bg-secondary-container/20 p-sm text-secondary">
              <Icon name="account_balance" />
            </div>
          </div>
          <div className="mt-md space-y-xs">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">72% of budget used</span>
              <span className="text-on-surface">Budget: $4,700</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div className="h-full w-[72%] rounded-full bg-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="card-shadow flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest">
        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-md border-b border-outline-variant p-lg">
          <div className="flex items-center gap-sm overflow-x-auto">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={`rounded-full px-md py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeFilter === chip
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface-variant hover:bg-outline-variant"
                }`}
              >
                {chip}
              </button>
            ))}
            <div className="mx-xs h-6 w-px bg-outline-variant" />
            <button
              type="button"
              className="flex items-center gap-xs rounded-lg border border-outline-variant px-md py-1.5 text-on-surface-variant transition-all hover:bg-surface-container"
            >
              <Icon name="filter_list" className="!text-lg" />
              <span className="text-sm">More Filters</span>
            </button>
          </div>
          <div className="flex items-center gap-sm">
            <div className="relative">
              <select className="appearance-none rounded-lg border-none bg-surface-container py-2 pl-4 pr-10 text-sm text-on-surface focus:ring-2 focus:ring-primary-container">
                <option>October 2023</option>
                <option>September 2023</option>
                <option>August 2023</option>
              </select>
              <Icon
                name="expand_more"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline"
              />
            </div>
            <button
              type="button"
              className="rounded-lg border border-outline-variant p-2 text-on-surface-variant transition-all hover:bg-surface-container"
              aria-label="Download"
            >
              <Icon name="download" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low/50">
                <th className="px-lg py-md text-xs font-semibold uppercase tracking-wider text-outline">
                  Date
                </th>
                <th className="px-lg py-md text-xs font-semibold uppercase tracking-wider text-outline">
                  Description
                </th>
                <th className="px-lg py-md text-xs font-semibold uppercase tracking-wider text-outline">
                  Category
                </th>
                <th className="px-lg py-md text-right text-xs font-semibold uppercase tracking-wider text-outline">
                  Amount
                </th>
                <th className="w-16 px-lg py-md" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {expenses.map((expense) => {
                const isIncome = expense.category === "income";
                return (
                  <tr
                    key={expense.id}
                    className="group transition-colors hover:bg-surface-container-low"
                  >
                    <td className="whitespace-nowrap px-lg py-md text-sm text-on-surface-variant">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-primary">
                          <Icon name={expense.icon ?? "payments"} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">
                            {expense.merchant}
                          </p>
                          {expense.note ? (
                            <p className="text-xs text-outline">{expense.note}</p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <span
                        className={`rounded-full px-sm py-1 text-[10px] font-semibold uppercase ${getCategoryBadgeClasses(
                          expense.category,
                        )}`}
                      >
                        {expense.category === "groceries" || expense.category === "dining"
                          ? "Food & Drink"
                          : expense.category}
                      </span>
                    </td>
                    <td
                      className={`px-lg py-md text-right text-sm font-bold ${
                        isIncome ? "text-secondary" : "text-on-surface"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(expense.amount, expense.currency)}
                    </td>
                    <td className="px-lg py-md text-right">
                      <button
                        type="button"
                        aria-label="More options"
                        className="text-outline opacity-0 transition-colors group-hover:opacity-100 hover:text-primary"
                      >
                        <Icon name="more_vert" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-outline-variant p-lg">
          <p className="text-sm text-on-surface-variant">
            Showing <span className="font-bold">1-{expenses.length}</span> of{" "}
            <span className="font-bold">42</span> transactions
          </p>
          <div className="flex gap-xs">
            <button
              type="button"
              disabled
              aria-label="Previous page"
              className="rounded-lg border border-outline-variant p-2 text-outline disabled:opacity-50"
            >
              <Icon name="chevron_left" />
            </button>
            <button
              type="button"
              className="rounded-lg border border-outline-variant bg-primary-container/10 px-4 py-2 font-bold text-primary"
            >
              1
            </button>
            <button
              type="button"
              className="rounded-lg border border-outline-variant px-4 py-2 text-on-surface-variant hover:bg-surface-container"
            >
              2
            </button>
            <button
              type="button"
              className="rounded-lg border border-outline-variant px-4 py-2 text-on-surface-variant hover:bg-surface-container"
            >
              3
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="rounded-lg border border-outline-variant p-2 text-on-surface-variant hover:bg-surface-container"
            >
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
        <div className="relative flex items-center gap-lg overflow-hidden rounded-xl bg-primary p-lg text-white md:col-span-2">
          <div className="relative z-10 flex-1">
            <h4 className="mb-xs text-xl font-semibold">Budgeting Tip of the Month</h4>
            <p className="mb-md text-sm opacity-90">
              Your food spending is 12% lower than last October. Setting aside these
              savings could help you reach your &apos;Travel&apos; goal 2 months faster!
            </p>
            <button
              type="button"
              className="rounded-lg bg-white px-lg py-2 text-sm font-bold text-primary transition-colors hover:bg-primary-container hover:text-white"
            >
              See Savings Plan
            </button>
          </div>
          <div className="relative z-10 hidden h-48 w-48 opacity-20 lg:block">
            <Icon name="savings" className="!text-[160px]" />
          </div>
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-outline-variant bg-surface-container-high p-lg">
          <p className="mb-sm text-xs font-semibold uppercase tracking-wider text-outline">
            Active Subscription
          </p>
          <div className="flex items-center gap-sm">
            <div className="card-shadow flex h-12 w-12 items-center justify-center rounded-lg bg-white text-primary">
              <Icon name="stars" />
            </div>
            <div>
              <p className="text-sm font-bold">Premium Plan</p>
              <p className="text-xs text-on-surface-variant">Renews on Nov 15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
