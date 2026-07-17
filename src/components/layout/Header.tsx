"use client";

import { IconBell, IconMessage, IconSearch } from "@/components/icons";
import { CURRENT_USER, ALERTS } from "@/lib/data";
import Link from "next/link";

export function Header() {
  const unread = ALERTS.filter((a) => !a.acknowledged).length;

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-4 border-b border-border bg-cream/80 px-6 backdrop-blur-md">
      <div className="relative flex-1 max-w-xl">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input
          type="search"
          placeholder="Search student, room, or alert"
          className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-16 text-[14px] text-ink placeholder:text-ink-soft shadow-sm transition focus:border-mint-bright focus:outline-none"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-cream px-1.5 py-0.5 text-[11px] font-medium text-ink-soft">
          ⌘F
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink-muted transition hover:bg-mint hover:text-forest"
          aria-label="Messages"
        >
          <IconMessage />
        </button>
        <Link
          href="/alerts"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink-muted transition hover:bg-mint hover:text-forest"
          aria-label="Notifications"
        >
          <IconBell />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-forest ring-2 ring-surface" />
          )}
        </Link>

        <div className="ml-2 flex items-center gap-3 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-[12px] font-bold text-white">
            {CURRENT_USER.avatar}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-[13px] font-semibold text-ink">{CURRENT_USER.name}</p>
            <p className="text-[11px] text-ink-soft">{CURRENT_USER.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
