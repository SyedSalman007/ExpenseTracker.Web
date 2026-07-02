export const APP_NAME = "Expense Tracker";
export const APP_TAGLINE = "Financial Wellness";

export const ROUTES = {
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  EXPENSES: "/expenses",
  BUDGET: "/budget",
  REPORTS: "/reports",
  SETTINGS: "/settings",
} as const;

export const NAV_ITEMS = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: "dashboard" },
  { href: ROUTES.EXPENSES, label: "Expenses", icon: "payments" },
  { href: ROUTES.BUDGET, label: "Budget", icon: "account_balance_wallet" },
  { href: ROUTES.REPORTS, label: "Reports", icon: "bar_chart" },
] as const;

export const DEFAULT_CURRENCY = "USD";
