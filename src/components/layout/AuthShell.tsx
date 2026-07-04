import Link from "next/link";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary-fixed/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[30%] w-[30%] rounded-full bg-secondary-fixed/10 blur-[100px]" />
      </div>

      <header className="hidden w-full items-center justify-between px-lg py-md md:flex">
        <Link href={ROUTES.LOGIN} className="flex items-center gap-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Icon name="account_balance_wallet" className="text-white" filled />
          </div>
          <span className="text-xl font-bold text-primary">{APP_NAME}</span>
        </Link>
      </header>

      <main className="flex flex-grow items-center justify-center px-md py-xl">
        {children}
      </main>

      {/* Mobile footer */}
      <footer className="mt-auto w-full px-container-margin py-lg text-center md:hidden">
        <nav className="flex justify-center gap-lg text-xs font-semibold uppercase tracking-wider text-outline">
          <Link href="#" className="hover:text-on-surface-variant">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-on-surface-variant">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-on-surface-variant">
            Help Center
          </Link>
        </nav>
      </footer>

      {/* Desktop footer */}
      <footer className="hidden w-full flex-col items-center justify-between gap-md border-t border-outline-variant/30 px-lg py-md md:flex md:flex-row">
        <p className="text-sm text-on-surface-variant opacity-70">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <nav className="flex gap-lg text-sm text-on-surface-variant">
          <Link href="#" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-primary">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-primary">
            Help Center
          </Link>
        </nav>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-primary-fixed"
        >
          <Icon name="language" className="text-sm" />
        </button>
      </footer>
    </div>
  );
}
