"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-surface-container-high"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const preferenceRows = [
  {
    id: "weekly-reports",
    icon: "mail",
    title: "Weekly AI Reports",
    description:
      "Get personalized financial insights and budget trends powered by AI.",
  },
  {
    id: "push-notifications",
    icon: "notifications_active",
    title: "Push Notifications",
    description: "Real-time alerts for large transactions and budget caps.",
  },
] as const;

export function SettingsView() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "weekly-reports": true,
    "push-notifications": false,
  });

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  const displayName = user?.name ?? "Alex Thompson";
  const displayEmail = user?.email ?? "alex.thompson@finwellness.com";

  return (
    <div className="space-y-xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-on-surface-variant">
          Manage your account and app preferences
        </p>
      </div>

      {/* Profile card */}
      <div className="card-shadow flex flex-col items-start gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-md">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-container text-xl font-bold text-on-primary-container">
            {displayName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="text-xl font-bold">{displayName}</p>
            <p className="text-sm text-on-surface-variant">{displayEmail}</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg bg-primary px-md py-sm text-sm font-semibold text-on-primary transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Edit Profile
        </button>
      </div>

      {/* Preferences */}
      <div>
        <h2 className="mb-md text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
          Preferences
        </h2>
        <div className="card-shadow divide-y divide-outline-variant/50 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
          {preferenceRows.map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-md p-lg">
              <div className="flex items-center gap-md">
                <span className="rounded-lg bg-primary/5 p-base text-primary">
                  <Icon name={row.icon} />
                </span>
                <div>
                  <p className="font-bold">{row.title}</p>
                  <p className="max-w-96 text-sm text-on-surface-variant">
                    {row.description}
                  </p>
                </div>
              </div>
              <Toggle
                checked={toggles[row.id]}
                onChange={(checked) =>
                  setToggles((prev) => ({ ...prev, [row.id]: checked }))
                }
                label={row.title}
              />
            </div>
          ))}

          <button
            type="button"
            className="flex w-full items-center justify-between gap-md p-lg text-left transition-colors hover:bg-surface-container-low"
          >
            <div className="flex items-center gap-md">
              <span className="rounded-lg bg-primary/5 p-base text-primary">
                <Icon name="security" />
              </span>
              <div>
                <p className="font-bold">Security &amp; Privacy</p>
                <p className="text-sm text-on-surface-variant">
                  Manage 2FA and connected accounts.
                </p>
              </div>
            </div>
            <Icon name="chevron_right" className="text-outline" />
          </button>
        </div>
      </div>

      {/* Account */}
      <div>
        <h2 className="mb-md text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
          Account
        </h2>
        <div className="space-y-sm">
          <button
            type="button"
            onClick={handleLogout}
            className="card-shadow flex w-full items-center justify-center gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg font-semibold text-error transition-all hover:bg-error/5 active:scale-[0.98]"
          >
            <Icon name="logout" />
            Log Out
          </button>
          <button
            type="button"
            className="w-full py-sm text-center text-sm text-error underline decoration-error/40 underline-offset-4 transition-colors hover:decoration-error"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
