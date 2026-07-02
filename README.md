# ExpenseTracker.Web — Serene Ledger

Next.js expense tracker based on the [Stitch](https://stitch.withgoogle.com/) **Serene Ledger** design export.

## Screens (from Stitch export)

| Route | Stitch screen |
|-------|----------------|
| `/login` | login / login_desktop |
| `/sign-up` | sign_up / sign_up_desktop |
| `/dashboard` | dashboard / dashboard_desktop |
| `/expenses` | expenses / expenses_desktop |
| `/budget` | budget / budget_desktop |
| `/reports` | reports / reports_desktop |
| `/settings` | settings |

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login & sign-up
│   ├── (app)/               # Protected app shell (sidebar + top bar)
│   └── api/                 # Reserved for future real API routes (currently empty)
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── expenses/
│   ├── budget/
│   ├── reports/
│   ├── settings/
│   └── categories/          # Shared category utilities
├── components/
│   ├── layout/              # AppShell, Sidebar, TopBar, AuthShell
│   └── ui/
├── lib/
├── providers/
└── styles/
docs/
└── serene-ledger/DESIGN.md  # Stitch design system tokens
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/login`.

## Design System

Brand: **Serene Ledger** — calm fintech UI with Manrope + Hanken Grotesk typography.  
See `docs/serene-ledger/DESIGN.md` for full color, spacing, and component specs.

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production releases |
| `develop` | Active development |
