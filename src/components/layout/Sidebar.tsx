"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppLogo,
  IconDashboard,
  IconStudents,
  IconGrid,
  IconAlert,
  IconImport,
  IconRooms,
  IconTeam,
  IconSettings,
  IconHelp,
  IconLogout,
} from "@/components/icons";
import { ALERTS } from "@/lib/data";
import { cn } from "@/lib/types";

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: IconDashboard },
  { href: "/students", label: "Students", icon: IconStudents, badge: "24" },
  { href: "/projection", label: "Projection", icon: IconGrid },
  { href: "/alerts", label: "Alerts", icon: IconAlert, badge: String(ALERTS.filter((a) => !a.acknowledged).length) },
  { href: "/classrooms", label: "Classrooms", icon: IconRooms },
  { href: "/import", label: "Import", icon: IconImport },
  { href: "/team", label: "Team", icon: IconTeam },
];

const general = [
  { href: "/settings", label: "Settings", icon: IconSettings },
  { href: "/help", label: "Help", icon: IconHelp },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleLogout = () => {
    localStorage.removeItem("daycare_auth");
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[248px] flex-col border-r border-border bg-surface px-4 py-5">
      <Link href="/dashboard" className="mb-8 flex items-center gap-2.5 px-2">
        <AppLogo size={38} />
        <div className="min-w-0 leading-tight">
          <span className="block text-[15px] font-bold tracking-tight text-ink">DayCare</span>
          <span className="block text-[11px] font-semibold text-ink-soft">Dashboard</span>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto custom-scroll">
        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
            Menu
          </p>
          <ul className="space-y-0.5">
            {menu.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-all",
                      active
                        ? "bg-mint text-forest"
                        : "text-ink-muted hover:bg-cream hover:text-ink"
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-forest" />
                    )}
                    <Icon
                      className={cn(
                        "shrink-0",
                        active ? "text-forest" : "text-ink-soft group-hover:text-ink-muted"
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-forest px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {item.badge}+
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
            General
          </p>
          <ul className="space-y-0.5">
            {general.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-all",
                      active
                        ? "bg-mint text-forest"
                        : "text-ink-muted hover:bg-cream hover:text-ink"
                    )}
                  >
                    <Icon className="shrink-0 text-ink-soft group-hover:text-ink-muted" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-ink-muted transition-all hover:bg-danger/40 hover:text-danger-text"
              >
                <IconLogout className="shrink-0 text-ink-soft" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
