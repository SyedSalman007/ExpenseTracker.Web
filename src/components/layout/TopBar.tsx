"use client";

import { Icon } from "@/components/ui/Icon";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-surface px-lg shadow-sm">
      <div className="flex flex-1 items-center gap-md">
        <div className="relative w-full max-w-112">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full rounded-full border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-lg">
        <button
          type="button"
          className="relative text-on-surface-variant transition-colors hover:text-primary"
        >
          <Icon name="notifications" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-surface bg-error" />
        </button>
        <button
          type="button"
          className="text-on-surface-variant transition-colors hover:text-primary"
        >
          <Icon name="help_outline" />
        </button>
        <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-outline-variant hover:border-primary" />
      </div>
    </header>
  );
}
