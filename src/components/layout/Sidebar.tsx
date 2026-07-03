"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME, APP_TAGLINE, NAV_ITEMS, ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-outline-variant bg-surface-container-lowest px-md py-xl shadow-sm lg:flex">
      <div className="mb-xl px-sm">
        <h1 className="text-2xl font-bold leading-tight text-primary">
          {APP_NAME}
        </h1>
        <p className="text-sm text-on-surface-variant opacity-70">{APP_TAGLINE}</p>
      </div>

      <nav className="flex-grow space-y-base">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-sm rounded-lg px-md py-sm transition-all active:scale-[0.98] ${
                active
                  ? "bg-primary-container font-bold text-on-primary-container"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-outline-variant pt-lg">
        <Link
          href={ROUTES.SETTINGS}
          className={`flex items-center gap-sm rounded-lg px-md py-sm transition-colors active:scale-[0.98] ${
            pathname === ROUTES.SETTINGS
              ? "bg-primary-container font-bold text-on-primary-container"
              : "text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          <Icon name="settings" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="mt-lg flex items-center gap-sm rounded-xl bg-surface-container-low p-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="person" />
        </div>
        <div>
          <p className="font-bold text-on-surface">{user?.name ?? "Alex Thorne"}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Premium Plan
          </p>
        </div>
      </div>
    </aside>
  );
}
