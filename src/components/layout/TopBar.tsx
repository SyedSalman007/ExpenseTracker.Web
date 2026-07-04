"use client";

import { usePathname } from "next/navigation";
import { APP_NAME, MOBILE_PAGE_TITLES, SEARCH_PLACEHOLDERS } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export function TopBar() {
  const pathname = usePathname();
  const mobileTitle = MOBILE_PAGE_TITLES[pathname] ?? APP_NAME;
  const searchPlaceholder = SEARCH_PLACEHOLDERS[pathname] ?? "Search transactions...";

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-surface px-md shadow-sm lg:px-lg">
      {/* Mobile: avatar + page title */}
      <div className="flex items-center gap-sm lg:hidden">
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-outline-variant bg-surface-container" />
        <h1 className="text-lg font-bold text-primary">{mobileTitle}</h1>
      </div>

      {/* Desktop: search */}
      <div className="hidden flex-1 items-center gap-md lg:flex">
        <div className="relative w-full max-w-112">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full rounded-full border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-md lg:gap-lg">
        <button
          type="button"
          className="relative text-on-surface-variant transition-colors hover:text-primary"
          aria-label="Notifications"
        >
          <Icon name="notifications" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-surface bg-error" />
        </button>
        <button
          type="button"
          className="hidden text-on-surface-variant transition-colors hover:text-primary lg:block"
          aria-label="Help"
        >
          <Icon name="help_outline" />
        </button>
        <div className="hidden h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-outline-variant hover:border-primary lg:block" />
      </div>
    </header>
  );
}
