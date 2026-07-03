"use client";

import { useState } from "react";
import { formatCurrency } from "@/features/expenses/utils/formatCurrency";
import { Icon } from "@/components/ui/Icon";

const weeklyExpenses = [
  { week: "W1", lastMonth: 70, current: 85 },
  { week: "W2", lastMonth: 60, current: 40 },
  { week: "W3", lastMonth: 80, current: 95 },
  { week: "W4", lastMonth: 50, current: 65 },
];

const upcomingBills = [
  {
    id: "isp",
    name: "ISP Fiber",
    dueLabel: "May 28",
    amount: 89.0,
    icon: "router",
    accent: "border-primary",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    id: "mortgage",
    name: "Mortgage",
    dueLabel: "June 01",
    amount: 1850.0,
    icon: "home",
    accent: "border-error",
    iconBg: "bg-error/10 text-error",
  },
  {
    id: "electric",
    name: "Electric Bill",
    dueLabel: "June 05",
    amount: 124.5,
    icon: "bolt",
    accent: "border-secondary",
    iconBg: "bg-secondary/10 text-secondary",
  },
];

const spendingBreakdown = [
  {
    id: "dining",
    label: "Dining & Food",
    icon: "restaurant",
    spent: 540,
    budget: 600,
    percent: 90,
    status: "On Track",
    statusColor: "bg-secondary-container text-on-secondary-container",
    barColor: "bg-secondary",
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: "shopping_bag",
    spent: 320,
    budget: 250,
    percent: 100,
    status: "Over Budget",
    statusColor: "bg-error/10 text-error",
    barColor: "bg-error",
  },
  {
    id: "transport",
    label: "Transport",
    icon: "directions_car",
    spent: 185,
    budget: 200,
    percent: 92,
    status: "Near Limit",
    statusColor: "bg-surface-container text-on-surface-variant",
    barColor: "bg-primary",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: "movie",
    spent: 95,
    budget: 150,
    percent: 63,
    status: "On Track",
    statusColor: "bg-secondary-container text-on-secondary-container",
    barColor: "bg-secondary",
  },
];

export function ReportsView() {
  const [aiEnabled, setAiEnabled] = useState(true);

  return (
    <div className="space-y-lg">
      {/* Page Header — mobile */}
      <div className="flex flex-col gap-md lg:hidden">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Financial Overview</h2>
          <p className="text-sm text-on-surface-variant">
            Deep dive into your spending habits and AI insights.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-lg py-sm font-bold text-on-primary shadow-lg transition-all hover:brightness-110 active:scale-95"
        >
          <Icon name="download" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Page Header — desktop */}
      <div className="hidden items-end justify-between lg:flex">
        <div>
          <h1 className="text-display-lg font-bold text-primary">
            Financial Overview
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Deep analysis of your spending habits for May 2024
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <button
            type="button"
            className="flex items-center gap-xs rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-sm font-bold text-primary transition-all hover:bg-surface-container"
          >
            <Icon name="calendar_today" className="text-base!" />
            <span>May 1 - May 31</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-xs rounded-lg bg-primary px-lg py-sm font-bold text-on-primary shadow-md transition-all hover:opacity-90 active:scale-95"
          >
            <Icon name="download" />
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {/* AI Insights — mobile (toggle + quote + next insight) */}
      <div className="glass-card card-shadow relative overflow-hidden rounded-xl p-lg lg:hidden">
        <div className="mb-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="auto_awesome" className="text-primary-container" filled />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
              AI Insights
            </h3>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(event) => setAiEnabled(event.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-surface-container-highest after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-outline-variant after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
          </label>
        </div>
        <div className="space-y-sm">
          <p className="text-sm text-on-surface">
            Monthly report generation is{" "}
            <span className="font-bold text-secondary">Active</span>.
          </p>
          <div className="rounded-lg border border-outline-variant bg-surface-container-low p-sm">
            <p className="text-sm italic leading-relaxed text-on-surface-variant">
              &quot;You spent 12% less on Dining than last month. Consider moving
              $200 to your &apos;Rainy Day&apos; savings bucket.&quot;
            </p>
          </div>
          <div className="flex items-center justify-between pt-xs">
            <span className="text-[10px] font-bold uppercase text-outline">
              Next Insight: Oct 01
            </span>
            <button type="button" className="text-xs font-bold text-primary hover:underline">
              View History
            </button>
          </div>
        </div>
      </div>

      {/* Total Expenses hero — mobile */}
      <div className="glass-card card-shadow relative overflow-hidden rounded-xl p-lg lg:hidden">
        <div className="absolute right-0 top-0 p-lg opacity-10">
          <Icon name="analytics" className="text-[120px]!" />
        </div>
        <div className="relative z-10">
          <p className="mb-xs text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Total Expenses
          </p>
          <div className="mb-md flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-primary">$3,750.00</h2>
            <span className="flex items-center text-sm font-bold text-error">
              <Icon name="trending_up" className="text-sm!" /> 4.2%
            </span>
          </div>
          <div className="mt-md flex h-24 items-end gap-2">
            {weeklyExpenses.map((item) => (
              <div
                key={item.week}
                className="h-full flex-1 rounded-t-sm bg-surface-container-highest transition-all hover:bg-primary-container"
                style={{ height: `${item.current}%` }}
              />
            ))}
          </div>
          <div className="mt-sm flex justify-between">
            {weeklyExpenses.map((item) => (
              <span key={item.week} className="text-[10px] font-bold uppercase text-outline">
                {item.week}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Spending Breakdown table — mobile */}
      <div className="glass-card card-shadow overflow-hidden rounded-xl lg:hidden">
        <div className="flex items-center justify-between border-b border-outline-variant p-lg">
          <h3 className="text-headline-sm font-bold text-on-surface">Spending Breakdown</h3>
          <span className="rounded-full bg-primary-container px-sm py-xs text-[10px] font-bold text-on-primary-container">
            BY CATEGORY
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="p-md text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Category
                </th>
                <th className="p-md text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Status
                </th>
                <th className="p-md text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Amount
                </th>
                <th className="p-md text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Budget Usage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {spendingBreakdown.map((category) => (
                <tr key={category.id} className="transition-colors hover:bg-surface-container">
                  <td className="p-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                        <Icon name={category.icon} className="text-sm!" />
                      </div>
                      <span className="font-bold text-on-surface">{category.label}</span>
                    </div>
                  </td>
                  <td className="p-md">
                    <span
                      className={`rounded-full px-sm py-1 text-[11px] font-bold uppercase ${category.statusColor}`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="p-md text-on-surface">{formatCurrency(category.spent)}</td>
                  <td className="p-md">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div
                        className={`h-2 rounded-full ${category.barColor}`}
                        style={{ width: `${category.percent}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Savings Goal — mobile */}
      <div className="glass-card card-shadow rounded-xl border-l-4 border-l-secondary p-lg lg:hidden">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-headline-sm font-bold text-on-surface">New Car Fund</h4>
            <p className="text-sm text-on-surface-variant">Progress toward $25,000 target</p>
          </div>
          <span className="text-xl font-bold text-secondary">62%</span>
        </div>
        <div className="mt-md space-y-sm">
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-highest">
            <div className="h-3 rounded-full bg-secondary transition-all duration-1000" style={{ width: "62%" }} />
          </div>
          <div className="flex justify-between text-sm text-on-surface-variant">
            <span>$15,500 saved</span>
            <span>$9,500 left</span>
          </div>
        </div>
      </div>

      {/* Upcoming Bills — mobile */}
      <div className="glass-card card-shadow rounded-xl p-lg lg:hidden">
        <div className="mb-md flex items-center justify-between">
          <h4 className="text-headline-sm font-bold text-on-surface">Upcoming Bills</h4>
          <Icon name="event_repeat" className="text-primary" />
        </div>
        <div className="space-y-sm">
          {upcomingBills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between rounded-lg p-sm transition-colors hover:bg-surface-container-low"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-md ${bill.iconBg}`}>
                  <Icon name={bill.icon} className="text-sm!" />
                </div>
                <div>
                  <p className="font-bold text-on-surface">{bill.name}</p>
                  <p className="text-[10px] font-bold uppercase text-outline">Due {bill.dueLabel}</p>
                </div>
              </div>
              <span className="text-on-surface">{formatCurrency(bill.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Top Row: AI Insights & Net Position — desktop */}
      <div className="hidden gap-lg lg:grid lg:grid-cols-3">
        <div className="glass-card card-shadow relative overflow-hidden rounded-xl p-lg lg:col-span-2">
          <div className="absolute right-0 top-0 p-4">
            <label className="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={(event) => setAiEnabled(event.target.checked)}
                className="peer sr-only"
              />
              <div className="peer relative h-6 w-11 rounded-full bg-surface-container after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-outline-variant after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-container peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
              <span className="ml-3 text-body-md font-bold text-on-surface">
                AI Enabled
              </span>
            </label>
          </div>
          <div className="mb-md flex items-center gap-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed text-primary">
              <Icon name="psychology" />
            </div>
            <h3 className="text-headline-sm text-primary">AI Insights</h3>
          </div>
          <div className="space-y-md">
            <p className="text-body-md leading-relaxed text-on-surface-variant">
              Based on your spending in May, you&apos;ve reduced &quot;Dining
              Out&quot; by 14% compared to last month. However, your
              &quot;Subscription Services&quot; have seen a slight creep.
              Consider auditing unused digital services to save approx. $45
              next month.
            </p>
            <textarea
              rows={2}
              placeholder="Add custom notes for your monthly review..."
              className="w-full rounded-lg border border-outline-variant bg-white/50 p-md text-body-md placeholder:text-outline focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Net Position Card */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary p-lg text-on-primary">
          <div className="absolute right-4 top-4 opacity-20">
            <Icon name="account_balance" className="text-[64px]!" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-primary/80">
              Net Position
            </p>
            <p className="text-display-lg font-bold">+$2,450.00</p>
          </div>
          <div className="mt-lg flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-primary/60">
                Income
              </p>
              <p className="text-headline-sm text-secondary-fixed">$6,200</p>
            </div>
            <div className="h-8 w-px bg-on-primary/20" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-primary/60">
                Spending
              </p>
              <p className="text-headline-sm text-error">$3,750</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body: Chart & Upcoming Bills — desktop */}
      <div className="hidden gap-lg lg:grid lg:grid-cols-4">
        {/* Total Expenses Chart */}
        <div className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-lg lg:col-span-3">
          <div className="mb-xl flex items-center justify-between">
            <h3 className="text-headline-sm font-bold text-on-surface">
              Total Expenses
            </h3>
            <div className="flex gap-md">
              <div className="flex items-center gap-xs">
                <span className="h-3 w-3 rounded-full bg-primary-container" />
                <span className="text-xs font-semibold text-on-surface-variant">
                  Last Month
                </span>
              </div>
              <div className="flex items-center gap-xs">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-on-surface-variant">
                  Current
                </span>
              </div>
            </div>
          </div>
          <div className="relative flex h-64 items-end justify-between gap-base px-md">
            <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full flex-col justify-between opacity-10">
              <div className="w-full border-t border-on-surface" />
              <div className="w-full border-t border-on-surface" />
              <div className="w-full border-t border-on-surface" />
              <div className="w-full border-t border-on-surface" />
            </div>
            {weeklyExpenses.map((item) => (
              <div
                key={item.week}
                className="flex h-full flex-1 flex-col items-center justify-end gap-xs"
              >
                <div className="flex h-52 w-full items-end justify-center gap-0.5">
                  <div
                    className="w-1/3 rounded-t-sm bg-primary-container/40"
                    style={{ height: `${item.lastMonth}%` }}
                  />
                  <div
                    className="w-1/3 rounded-t-sm bg-primary transition-all"
                    style={{ height: `${item.current}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-on-surface-variant">
                  {item.week}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bills */}
        <div className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <h3 className="mb-md text-headline-sm font-bold text-on-surface">
            Upcoming
          </h3>
          <div className="space-y-sm">
            {upcomingBills.map((bill) => (
              <div
                key={bill.id}
                className={`flex items-center gap-sm rounded-lg border-l-4 bg-surface p-sm ${bill.accent}`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded ${bill.iconBg}`}
                >
                  <Icon name={bill.icon} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-on-surface">{bill.name}</p>
                  <p className="text-[10px] text-on-surface-variant">
                    {bill.dueLabel} &bull; {formatCurrency(bill.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-lg w-full text-body-md font-bold text-primary hover:underline"
          >
            View All Schedule
          </button>
        </div>
      </div>

      {/* Spending Breakdown — desktop */}
      <section className="hidden space-y-md lg:block">
        <h3 className="text-headline-sm font-bold text-on-surface">
          Spending Breakdown
        </h3>
        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
          {spendingBreakdown.map((category) => (
            <div
              key={category.id}
              className="card-shadow rounded-xl border border-outline-variant bg-surface-container-lowest p-md"
            >
              <div className="mb-sm flex items-start justify-between">
                <Icon name={category.icon} className="text-primary" />
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${category.statusColor}`}
                >
                  {category.status}
                </span>
              </div>
              <p className="font-semibold text-on-surface-variant">
                {category.label}
              </p>
              <div className="flex items-baseline gap-xs">
                <p className="text-headline-sm text-on-surface">
                  {formatCurrency(category.spent)}
                </p>
                <p className="text-[10px] text-outline">
                  / {formatCurrency(category.budget)}
                </p>
              </div>
              <div className="mt-md h-2 w-full overflow-hidden rounded-full bg-surface-container">
                <div
                  className={`h-full rounded-full ${category.barColor}`}
                  style={{ width: `${category.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
