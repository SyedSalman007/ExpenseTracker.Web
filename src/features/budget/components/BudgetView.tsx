"use client";

import { useState } from "react";
import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import type { BudgetCategory, BudgetOverview } from "@/features/budget/types";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { budgetApi, type CategoryPayload } from "@/features/budget/services/budgetApi";
import { CategoryFormDialog } from "@/features/budget/components/CategoryFormDialog";

interface BudgetViewProps {
  overview: BudgetOverview;
  categories: BudgetCategory[];
}

const statusStyles: Record<
  BudgetCategory["status"],
  { statusText: string; amountText: string }
> = {
  "over-limit": {
    statusText: "text-error font-extrabold uppercase",
    amountText: "text-error",
  },
  "close-to-cap": {
    statusText: "text-tertiary font-bold",
    amountText: "text-on-surface",
  },
  healthy: {
    statusText: "text-secondary font-bold",
    amountText: "text-on-surface",
  },
  steady: {
    statusText: "text-on-surface-variant",
    amountText: "text-on-surface",
  },
};

/** Cycled per category so each sub-budget keeps a stable identity color, independent of its status. */
const CATEGORY_COLORS = [
  { iconBg: "bg-orange-100", iconText: "text-orange-600", bar: "bg-orange-500" },
  { iconBg: "bg-blue-100", iconText: "text-blue-600", bar: "bg-blue-500" },
  { iconBg: "bg-purple-100", iconText: "text-purple-600", bar: "bg-purple-500" },
  { iconBg: "bg-teal-100", iconText: "text-teal-600", bar: "bg-teal-500" },
  { iconBg: "bg-rose-100", iconText: "text-rose-600", bar: "bg-rose-500" },
];

export function BudgetView({ overview: initialOverview, categories: initialCategories }: BudgetViewProps) {
  const [overview, setOverview] = useState(initialOverview);
  const [categories, setCategories] = useState(initialCategories);
  const [formCategory, setFormCategory] = useState<BudgetCategory | undefined>(undefined);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<BudgetCategory | null>(null);
  const [limitInput, setLimitInput] = useState(String(initialOverview.monthlyLimit));

  function openAddCategory() {
    setFormCategory(undefined);
    setIsCategoryFormOpen(true);
  }

  function openEditCategory(category: BudgetCategory) {
    setFormCategory(category);
    setIsCategoryFormOpen(true);
  }

  async function handleCategorySubmit(payload: CategoryPayload) {
    if (formCategory) {
      const updated = await budgetApi.updateCategory(formCategory.id, payload);
      setCategories((current) => current.map((category) => (category.id === updated.id ? updated : category)));
    } else {
      const created = await budgetApi.createCategory(payload);
      setCategories((current) => [...current, created]);
    }
    setIsCategoryFormOpen(false);
  }

  async function handleConfirmDeleteCategory() {
    if (!categoryToDelete) return;
    await budgetApi.deleteCategory(categoryToDelete.id);
    setCategories((current) => current.filter((category) => category.id !== categoryToDelete.id));
    setCategoryToDelete(null);
  }

  async function handleApplyLimit() {
    const value = Number(limitInput);
    if (!Number.isFinite(value) || value <= 0) return;
    const updated = await budgetApi.updateMonthlyLimit(value);
    setOverview(updated);
  }

  function scrollToCategories() {
    document.getElementById("budget-categories")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="space-y-lg">
      {/* Header — mobile */}
      <div className="lg:hidden">
        <p className="mb-xs text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          Financial Overview
        </p>
        <h2 className="text-2xl font-bold text-primary">Set Your Spending Guardrails</h2>
      </div>

      {/* Header — desktop */}
      <div className="hidden flex-col gap-md sm:flex-row sm:items-end sm:justify-between lg:flex">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-primary">
            Set Your Spending Guardrails
          </h1>
          <p className="text-base text-on-surface-variant">
            Define your limits and find your financial peace of mind.
          </p>
        </div>
        <div className="flex flex-wrap gap-sm">
          <Button variant="secondary" onClick={openAddCategory}>
            <Icon name="add" className="!text-xl" />
            Create Sub-Budget
          </Button>
          <Button variant="primary" onClick={scrollToCategories}>
            <Icon name="edit_note" className="!text-xl" />
            Manage Caps
          </Button>
        </div>
      </div>

      {overview.isOverBudget ? (
        <div className="flex items-center gap-4 rounded-xl border border-error/20 bg-error-container p-md text-on-error-container">
          <Icon name="notifications_active" className="text-error" filled />
          <div>
            <p className="font-bold">Over Budget Alert!</p>
            <p className="text-sm opacity-90">
              You have exceeded your monthly limit by{" "}
              {formatCurrency(Math.abs(overview.remaining))}.
            </p>
          </div>
        </div>
      ) : null}

      {/* Monthly target + usage — mobile */}
      <div className="space-y-card-gap lg:hidden">
        <div className="glass-card rounded-xl p-md shadow-lg transition-all hover:shadow-xl">
          <label
            htmlFor="monthly-budget-mobile"
            className="mb-sm block text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
          >
            Monthly Target Budget
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-md text-xl font-bold text-primary">$</span>
            <input
              id="monthly-budget-mobile"
              type="number"
              value={limitInput}
              onChange={(e) => setLimitInput(e.target.value)}
              className="w-full rounded-lg border-2 border-outline-variant bg-surface-container-lowest py-4 pl-12 pr-16 text-xl font-bold text-primary focus:border-primary focus:ring-0"
            />
            <button
              type="button"
              onClick={handleApplyLimit}
              className="absolute right-md rounded-full bg-primary px-sm py-xs text-xs font-semibold uppercase tracking-wider text-on-primary transition-all hover:bg-primary-container active:scale-95"
            >
              Set
            </button>
          </div>
          <p className="mt-sm text-sm italic text-on-surface-variant">
            Your total monthly spending limit across all categories.
          </p>
        </div>

        <div className="glass-card relative overflow-hidden rounded-xl p-lg shadow-lg">
          <div className="mb-lg flex items-start justify-between">
            <div>
              <h3 className="mb-xs text-lg font-semibold text-primary">Budget Usage</h3>
              <p className="text-sm text-on-surface-variant">This billing cycle</p>
            </div>
            <span className="text-2xl font-bold text-primary">
              {Math.round(overview.percentUsed)}%
            </span>
          </div>
          <div className="relative mb-md h-4 w-full overflow-hidden rounded-full bg-surface-container">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary shadow-[0_0_15px_rgba(15,82,186,0.2)] transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(overview.percentUsed, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" />
              <span>
                Spent:{" "}
                <span className="font-bold text-primary">
                  {formatCurrency(overview.totalSpent)}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-outline-variant" />
              <span>
                Left:{" "}
                <span className="font-bold text-secondary">
                  {formatCurrency(overview.remaining)}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-card-gap">
          <div className="glass-card flex flex-col items-center justify-center rounded-xl p-md text-center">
            <div className="mb-sm flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
              <Icon name="trending_down" />
            </div>
            <h4 className="mb-xs text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Daily Avg
            </h4>
            <p className="text-lg font-bold text-primary">
              {formatCurrency(overview.dailyAverage)}
            </p>
          </div>
          <div className="glass-card flex flex-col items-center justify-center rounded-xl p-md text-center">
            <div className="mb-sm flex h-12 w-12 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
              <Icon name="calendar_today" />
            </div>
            <h4 className="mb-xs text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Days Remaining
            </h4>
            <p className="text-lg font-bold text-primary">{overview.daysLeft} Days</p>
          </div>
        </div>
      </div>

      {/* Monthly target + usage — desktop */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-lg">
        <div className="card-shadow relative flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:col-span-4">
          <div className="relative z-10">
            <span className="mb-xs block font-numeric text-xs font-bold uppercase tracking-widest text-primary">
              Monthly Target
            </span>
            <div className="flex items-baseline gap-xs">
              <span className="text-3xl font-bold text-primary">$</span>
              <input
                type="number"
                value={limitInput}
                onChange={(e) => setLimitInput(e.target.value)}
                className="w-full border-none bg-transparent p-0 text-3xl font-bold text-primary focus:ring-0"
              />
            </div>
            <p className="mt-sm text-sm text-on-surface-variant">
              Your total monthly spending limit across all categories.
            </p>
          </div>
          <div className="relative z-10 mt-xl">
            <button
              type="button"
              onClick={handleApplyLimit}
              className="w-full rounded-lg bg-surface-container-high py-sm font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Apply Changes
            </button>
          </div>
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary-fixed opacity-10 blur-2xl" />
        </div>

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

      {/* By Category Section — mobile */}
      <section id="budget-categories" className="space-y-md lg:hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">By Category</h3>
          <button
            type="button"
            onClick={openAddCategory}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Manage Caps
          </button>
        </div>
        <div className="space-y-card-gap">
          {categories.map((category, i) => {
            const percent = (category.spent / category.limit) * 100;
            const palette = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
            const isOverLimit = category.status === "over-limit";
            return (
              <div
                key={category.id}
                className={`glass-card flex items-center gap-md rounded-xl p-md ${
                  isOverLimit ? "border-error/30 bg-error/5" : ""
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    isOverLimit ? "bg-error-container text-error" : `${palette.iconBg} ${palette.iconText}`
                  }`}
                >
                  <Icon name={category.icon} />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex justify-between">
                    <span className={`font-bold ${isOverLimit ? "text-error" : "text-on-surface"}`}>
                      {category.label}
                    </span>
                    <span className={`text-sm ${isOverLimit ? "text-error" : "text-on-surface-variant"}`}>
                      {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
                    </span>
                  </div>
                  <div
                    className={`h-2 w-full overflow-hidden rounded-full ${
                      isOverLimit ? "bg-error-container" : "bg-surface-container"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full ${isOverLimit ? "bg-error" : palette.bar}`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <button
            type="button"
            onClick={openAddCategory}
            className="glass-card flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant p-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
          >
            <Icon name="add_circle" />
            <span className="font-bold">Add Category</span>
          </button>
        </div>
      </section>

      {/* By Category Section — desktop */}
      <section className="hidden space-y-md lg:block">
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
          {categories.map((category, i) => {
            const percent = (category.spent / category.limit) * 100;
            const styles = statusStyles[category.status];
            const palette = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
            const isOverLimit = category.status === "over-limit";
            return (
              <div
                key={category.id}
                className="card-shadow group rounded-xl border border-outline-variant bg-surface-container-lowest p-md transition-colors hover:border-primary"
              >
                <div className="mb-sm flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isOverLimit ? "bg-error-container text-error" : `${palette.iconBg} ${palette.iconText}`
                      }`}
                    >
                      <Icon name={category.icon} />
                    </span>
                    <span className="font-bold text-on-surface">{category.label}</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className={`font-numeric text-sm font-bold ${styles.amountText}`}>
                      {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
                    </span>
                    <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
                      <IconButton aria-label="Edit category" onClick={() => openEditCategory(category)}>
                        <Icon name="edit_note" className="!text-lg" />
                      </IconButton>
                      <IconButton
                        variant="danger"
                        aria-label="Delete category"
                        onClick={() => setCategoryToDelete(category)}
                      >
                        <Icon name="delete" className="!text-lg" />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className="mb-xs h-2 w-full overflow-hidden rounded-full bg-surface-container">
                  <div
                    className={`h-full rounded-full ${isOverLimit ? "bg-error" : palette.bar}`}
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
            onClick={openAddCategory}
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

      <CategoryFormDialog
        open={isCategoryFormOpen}
        category={formCategory}
        onClose={() => setIsCategoryFormOpen(false)}
        onSubmit={handleCategorySubmit}
      />
      <ConfirmDialog
        open={Boolean(categoryToDelete)}
        title="Delete Sub-Budget"
        description={
          categoryToDelete
            ? `Are you sure you want to delete "${categoryToDelete.label}"? This can't be undone.`
            : undefined
        }
        onConfirm={handleConfirmDeleteCategory}
        onCancel={() => setCategoryToDelete(null)}
      />
    </div>
  );
}
