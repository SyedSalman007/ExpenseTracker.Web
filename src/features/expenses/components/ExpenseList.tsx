"use client";

import { useState } from "react";
import type { Expense } from "@/features/expenses/types";
import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import { getCategoryBadgeClasses } from "@/features/categories/utils/getCategoryMeta";
import { formatDate } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { expenseApi } from "@/features/expenses/services/expenseApi";
import { ExpenseFormDialog } from "@/features/expenses/components/ExpenseFormDialog";

interface ExpenseListProps {
  expenses: Expense[];
}

const FILTER_CHIPS = ["All", "Food", "Rent", "Utilities", "Travel"] as const;

export function ExpenseList({ expenses: initialExpenses }: ExpenseListProps) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [activeFilter, setActiveFilter] = useState<(typeof FILTER_CHIPS)[number]>("All");
  const [formExpense, setFormExpense] = useState<Expense | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const totalSpending = expenses
    .filter((expense) => expense.category !== "income")
    .reduce((sum, expense) => sum + expense.amount, 0);

  function openAddForm() {
    setFormExpense(undefined);
    setIsFormOpen(true);
  }

  function openEditForm(expense: Expense) {
    setFormExpense(expense);
    setIsFormOpen(true);
  }

  async function handleFormSubmit(payload: Parameters<typeof expenseApi.createExpense>[0]) {
    if (formExpense) {
      const updated = await expenseApi.updateExpense(formExpense.id, payload);
      setExpenses((current) => current.map((expense) => (expense.id === updated.id ? updated : expense)));
    } else {
      const created = await expenseApi.createExpense(payload);
      setExpenses((current) => [created, ...current]);
    }
    setIsFormOpen(false);
  }

  async function handleConfirmDelete() {
    if (!expenseToDelete) return;
    await expenseApi.deleteExpense(expenseToDelete.id);
    setExpenses((current) => current.filter((expense) => expense.id !== expenseToDelete.id));
    setExpenseToDelete(null);
  }

  const columns: DataTableColumn<Expense>[] = [
    {
      key: "date",
      header: "Date",
      render: (expense) => (
        <span className="whitespace-nowrap text-sm text-on-surface-variant">{formatDate(expense.date)}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (expense) => (
        <div className="flex items-center gap-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-primary">
            <Icon name={expense.icon ?? "payments"} />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">{expense.merchant}</p>
            {expense.note ? <p className="text-xs text-outline">{expense.note}</p> : null}
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (expense) => (
        <span
          className={`rounded-full px-sm py-1 text-[10px] font-semibold uppercase ${getCategoryBadgeClasses(
            expense.category,
          )}`}
        >
          {expense.category === "groceries" || expense.category === "dining" ? "Food & Drink" : expense.category}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      render: (expense) => {
        const isIncome = expense.category === "income";
        return (
          <span className={`font-bold ${isIncome ? "text-secondary" : "text-on-surface"}`}>
            {isIncome ? "+" : "-"}
            {formatCurrency(expense.amount, expense.currency)}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (expense) => (
        <div className="flex justify-end gap-xs opacity-0 transition-opacity group-hover:opacity-100">
          <IconButton aria-label="Edit expense" onClick={() => openEditForm(expense)}>
            <Icon name="edit_note" />
          </IconButton>
          <IconButton variant="danger" aria-label="Delete expense" onClick={() => setExpenseToDelete(expense)}>
            <Icon name="delete" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-xl">
      {/* Header (desktop only — mobile shows the title in the TopBar) */}
      <div className="hidden items-end justify-between md:flex">
        <div>
          <h1 className="text-display-lg font-bold text-primary">Expenses</h1>
          <p className="text-base text-on-surface-variant">
            Review and manage your daily expenditures.
          </p>
        </div>
        <Button variant="primary" onClick={openAddForm}>
          <Icon name="add" />
          <span>New Expense</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-card-gap md:grid-cols-2 md:gap-lg">
        <div className="card-shadow relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-md md:p-lg">
          <div className="mb-sm flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:text-outline">
                Total Monthly Spending
              </p>
              <p className="mt-xs text-xl font-bold text-primary md:text-display-lg">
                {formatCurrency(totalSpending)}
              </p>
            </div>
            <div className="rounded-lg p-sm text-primary md:bg-primary-container/10">
              <Icon name="trending_up" />
            </div>
          </div>
          <div className="flex items-center gap-xs text-sm font-bold text-secondary">
            <Icon name="arrow_downward" className="hidden !text-sm md:inline" />
            <span>12% from last month</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 hidden h-1 overflow-hidden bg-primary-container/20 md:block">
            <div className="h-full w-2/3 rounded-r-full bg-primary" />
          </div>
        </div>

        <div className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-md md:p-lg">
          <div className="mb-sm flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:text-outline">
                Budget Remaining
              </p>
              <p className="mt-xs text-xl font-bold text-secondary md:text-display-lg">
                {formatCurrency(1279.5)}
              </p>
            </div>
            <div className="rounded-lg p-sm text-tertiary md:bg-secondary-container/20 md:text-secondary">
              <Icon name="account_balance" />
            </div>
          </div>
          <div className="mt-sm space-y-xs md:mt-md">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">72% of budget used</span>
              <span className="hidden text-on-surface md:inline">Budget: $4,700</span>
            </div>
            <ProgressBar
              percent={72}
              trackClassName="h-2 bg-surface-container-high md:bg-surface-container"
              fillClassName="bg-secondary"
            />
          </div>
        </div>

        {/* Quick action — mobile only (desktop uses the header button instead) */}
        <div className="flex h-32 flex-col justify-between rounded-xl bg-primary-container p-md text-on-primary-container shadow-card md:hidden">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
              Quick Action
            </span>
            <Icon name="bolt" />
          </div>
          <button
            type="button"
            onClick={openAddForm}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container-lowest py-2 font-bold text-primary transition-all hover:bg-surface-bright active:scale-95"
          >
            <Icon name="add" className="!text-lg" />
            New Expense
          </button>
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
            <div className="mx-xs hidden h-6 w-px bg-outline-variant md:block" />
            <button
              type="button"
              className="hidden items-center gap-xs rounded-lg border border-outline-variant px-md py-1.5 text-on-surface-variant transition-all hover:bg-surface-container md:flex"
            >
              <Icon name="filter_list" className="!text-lg" />
              <span className="text-sm">More Filters</span>
            </button>
          </div>
          <div className="flex items-center gap-sm">
            <div className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 md:rounded-lg md:border-none md:bg-surface-container">
              <Icon name="calendar_today" className="!text-lg text-on-surface-variant" />
              <select className="border-none bg-transparent p-0 text-sm text-on-surface focus:ring-0">
                <option>October 2023</option>
                <option>September 2023</option>
                <option>August 2023</option>
              </select>
            </div>
            <button
              type="button"
              className="hidden rounded-lg border border-outline-variant p-2 text-on-surface-variant transition-all hover:bg-surface-container md:block"
              aria-label="Download"
            >
              <Icon name="download" />
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={expenses}
          getRowKey={(expense) => expense.id}
          emptyMessage="No transactions yet. Add your first expense to get started."
        />

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-outline-variant p-lg">
          <p className="text-sm text-on-surface-variant">
            Showing <span className="font-bold">1-{expenses.length}</span> of{" "}
            <span className="font-bold">{expenses.length}</span> transactions
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
              aria-label="Next page"
              className="rounded-lg border border-outline-variant px-4 py-2 text-on-surface-variant hover:bg-surface-container"
            >
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cards (desktop only) */}
      <div className="hidden gap-lg md:grid md:grid-cols-3">
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

      <ExpenseFormDialog
        open={isFormOpen}
        expense={formExpense}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
      <ConfirmDialog
        open={Boolean(expenseToDelete)}
        title="Delete Expense"
        description={
          expenseToDelete ? `Are you sure you want to delete "${expenseToDelete.merchant}"? This can't be undone.` : undefined
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setExpenseToDelete(null)}
      />
    </div>
  );
}
