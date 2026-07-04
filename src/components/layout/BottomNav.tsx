"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOTTOM_NAV_ITEMS } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-outline-variant bg-surface-container-lowest px-xs py-xs shadow-[0_-2px_12px_rgba(15,82,186,0.05)] lg:hidden">
      {BOTTOM_NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-4 py-1 text-[10px] font-semibold transition-all ${
              active
                ? "bg-secondary-container text-on-secondary-container"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <Icon name={item.icon} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
