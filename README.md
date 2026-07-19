# ExpenseTracker.Web

Next.js expense tracker

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
│   ├── (auth)/          # Login & sign-up
│   ├── (app)/           # Protected app shell (sidebar + top bar)
│   └── api/auth/        # login/register/logout routes — proxy to the .NET backend
├── features/
│   ├── auth/            # authService (client) + authApi.server (backend calls)
│   ├── dashboard/
│   ├── expenses/
│   ├── budget/
│   ├── reports/
│   ├── settings/
│   └── categories/      # Shared category utilities
├── components/
│   ├── layout/          # AppShell, Sidebar, TopBar, AuthShell
│   └── ui/
├── lib/                 # cookie.ts, jwt.ts, constants.ts, utils.ts
├── providers/            # AuthProvider (client-side auth state)
├── middleware.ts         # Redirects based on auth state (see below)
└── styles/

```

Only auth (login/signup) is wired to the real backend — dashboard/expenses/budget/reports still run on mock data in `src/lib/mock-data.ts` until those APIs exist.

## Getting Started

Requires the backend at [`ExpenseTracker.DotNet`](../ExpenseTracker.DotNet) running locally (`dotnet run --launch-profile http` from `ExpenseTracker.API`, default `http://localhost:5255`).

Set the backend URL in `.env.local` (gitignored):

```
EXPENSE_API_BASE_URL=http://localhost:5255
```

Then:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). `middleware.ts` redirects unauthenticated visitors to `/login` and signed-in visitors away from `/login`/`/sign-up` to `/dashboard`, based on the `token` cookie set at login/register.


## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production releases |
| `develop` | Active development |
