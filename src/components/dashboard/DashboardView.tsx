"use client";

import Link from "next/link";
import { IconArrowUpRight, IconPlus, IconChevron, TransitionIcon } from "@/components/icons";
import {
  ALERTS,
  CURRENT_USER,
  STUDENTS,
  TEAM,
  TRANSITION_RECS,
  WEEKLY_CAPACITY,
} from "@/lib/data";
import {
  CLASSROOMS,
  ageInMonths,
  cn,
  formatAge,
  fteSeatsUsed,
  getClassroom,
} from "@/lib/types";
import { useMemo } from "react";
import { format, parseISO } from "date-fns";

function StatCard({
  label,
  value,
  hint,
  dark,
}: {
  label: string;
  value: string | number;
  hint: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[132px] flex-col justify-between rounded-[22px] p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
        dark ? "bg-forest text-white" : "border border-border bg-surface"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className={cn("text-[13px] font-medium", dark ? "text-mint-bright/90" : "text-ink-muted")}>
          {label}
        </p>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            dark ? "bg-white/15 text-white" : "bg-mint text-forest"
          )}
        >
          <IconArrowUpRight size={14} />
        </span>
      </div>
      <p className="mt-3 text-[36px] font-bold tracking-tight leading-none">{value}</p>
      <p className={cn("mt-3 text-[12px] leading-snug", dark ? "text-mint-bright/75" : "text-ink-soft")}>
        {hint}
      </p>
    </div>
  );
}

function CardShell({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[320px] flex-col rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[16px] font-bold text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-[12px] text-ink-soft">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

export function DashboardView() {
  const active = useMemo(() => STUDENTS.filter((s) => s.status === "active"), []);
  const waitlist = useMemo(() => STUDENTS.filter((s) => s.status === "waitlist"), []);
  const openAlerts = useMemo(() => ALERTS.filter((a) => !a.acknowledged), []);

  const openSeats = useMemo(() => {
    return CLASSROOMS.reduce((sum, room) => {
      const used = fteSeatsUsed(active, room.id);
      return sum + Math.max(0, room.legalCapacity - used);
    }, 0);
  }, [active]);

  const chartDays = WEEKLY_CAPACITY;
  const maxOcc = Math.max(...chartDays.map((d) => d.occupancy), 1);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 text-[14px] text-ink-muted">
            Roster management, capacity tracking, and age-based classroom transitions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-forest-mid"
          >
            <IconPlus size={16} />
            Add Student
          </Link>
          <Link
            href="/import"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-mint"
          >
            Import Excel
          </Link>
        </div>
      </div>

      {/* Equal-height stat row */}
      <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active Students"
          value={active.length}
          hint="Centralized profiles with DOB, room & schedule"
          dark
        />
        <StatCard
          label="Open FTE Seats"
          value={Math.round(openSeats)}
          hint="Legal capacity minus weekday FTE used"
        />
        <StatCard
          label="Age & Birthday Alerts"
          value={openAlerts.length}
          hint="Transitions, birthdays & exemptions"
        />
        <StatCard
          label="Waitlist"
          value={waitlist.length}
          hint="Pending enrollment when infant seats open"
        />
      </div>

      {/* Equal-height middle row */}
      <div className="grid items-stretch gap-4 lg:grid-cols-3">
        <CardShell
          title="Weekday FTE Capacity"
          subtitle="Mon–Fri fill rate · part-time schedules share seats"
        >
          <div className="flex flex-1 items-end justify-between gap-2 pb-1">
            {chartDays.map((d) => {
              const h = Math.max((d.occupancy / maxOcc) * 100, 8);
              const isDark = d.occupancy >= 85;
              return (
                <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[11px] font-bold tabular-nums text-ink-muted">
                    {d.occupancy}%
                  </span>
                  <div
                    className={cn(
                      "w-full max-w-[40px] rounded-t-xl rounded-b-md",
                      isDark ? "bg-forest" : "bg-mint-bright"
                    )}
                    style={{ height: `${h}%`, minHeight: 24 }}
                  />
                  <span className="text-[12px] font-medium text-ink-muted">{d.day}</span>
                </div>
              );
            })}
          </div>
        </CardShell>

        <CardShell
          title="Monthly Cascade"
          subtitle="Runs on the 1st · Orca → Turtle → downward"
          action={
            <Link
              href="/projection"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-forest hover:underline"
            >
              Open grid
              <IconChevron size={14} />
            </Link>
          }
        >
          <div className="rounded-2xl bg-mint/50 px-3.5 py-3 text-[12px] leading-relaxed text-forest">
            Check Orca vacancies first, pull qualified children up from Turtle, then cascade
            downward to free Shark & Octopus infant seats.
          </div>
          <p className="mt-4 text-[12px] font-semibold text-ink">Recommended transitions</p>
          <ul className="mt-2 flex-1 space-y-2.5">
            {TRANSITION_RECS.slice(0, 3).map((t) => (
              <li key={t.id} className="flex items-center gap-2.5">
                <TransitionIcon type={t.icon} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{t.title}</p>
                  <p className="text-[11px] text-ink-soft">
                    {t.from} → {t.to} · {t.due}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/projection"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-forest py-2.5 text-[13px] font-semibold text-white hover:bg-forest-mid"
          >
            Review 12-month projection
          </Link>
        </CardShell>

        <CardShell
          title="Birthday & Age Alerts"
          subtitle="Flagged from student DOB"
          action={
            <Link
              href="/alerts"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-forest hover:underline"
            >
              View all
              <IconChevron size={14} />
            </Link>
          }
        >
          <ul className="flex-1 space-y-2.5 overflow-hidden">
            {openAlerts.slice(0, 4).map((a) => {
              const student = STUDENTS.find((s) => s.id === a.studentId);
              return (
                <li
                  key={a.id}
                  className="rounded-xl border border-border bg-cream/50 px-3 py-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-semibold leading-snug text-ink">{a.title}</p>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                        a.severity === "high"
                          ? "bg-danger text-danger-text"
                          : a.severity === "medium"
                            ? "bg-warning text-warning-text"
                            : "bg-mint text-forest"
                      )}
                    >
                      {a.severity}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-soft">
                    {student
                      ? `${student.firstName} ${student.lastName} · ${getClassroom(student.classroomId).name}`
                      : "Student"}{" "}
                    · Due {format(parseISO(a.dueDate), "MMM d")}
                  </p>
                </li>
              );
            })}
          </ul>
        </CardShell>
      </div>

      {/* Equal-height bottom row */}
      <div className="grid items-stretch gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CardShell
            title="Classroom Capacity"
            subtitle={`Legal seats vs FTE · ${CURRENT_USER.center}`}
            action={
              <Link href="/classrooms" className="text-[12px] font-semibold text-forest hover:underline">
                Manage rooms
              </Link>
            }
            className="min-h-[280px]"
          >
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
              {CLASSROOMS.map((room) => {
                const used = fteSeatsUsed(active, room.id);
                const pct = Math.min(100, Math.round((used / room.legalCapacity) * 100));
                const kids = active.filter((s) => s.classroomId === room.id);
                return (
                  <div
                    key={room.id}
                    className="flex flex-col rounded-2xl border border-border bg-cream/60 p-3.5"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[13px] font-bold text-ink">{room.name}</p>
                      <span className="text-[10px] font-medium text-ink-soft">{room.stage}</span>
                    </div>
                    <p className="mt-2 text-[20px] font-bold tabular-nums text-forest">
                      {used.toFixed(1)}
                      <span className="text-[12px] font-medium text-ink-soft">
                        /{room.legalCapacity}
                      </span>
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-forest"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-ink-soft">
                      {kids.length} children
                      {kids.length > 0 &&
                        ` · avg ${formatAge(
                          Math.round(
                            kids.reduce((a, s) => a + ageInMonths(s.dob), 0) / kids.length
                          )
                        )}`}
                    </p>
                    {room.requiresPottyTrained && (
                      <p className="mt-1 text-[10px] font-semibold text-forest">Potty trained req.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardShell>
        </div>

        <div className="lg:col-span-2">
          <CardShell
            title="User Roles"
            subtitle="Admin, Manager, Scheduler access"
            action={
              <Link
                href="/team"
                className="inline-flex items-center gap-1 rounded-lg bg-mint px-2.5 py-1.5 text-[12px] font-semibold text-forest"
              >
                <IconPlus size={14} />
                Invite
              </Link>
            }
            className="min-h-[280px]"
          >
            <ul className="flex-1 space-y-3">
              {TEAM.map((m) => (
                <li key={m.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-bold text-white">
                    {m.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">{m.name}</p>
                    <p className="truncate text-[11px] text-ink-soft">{m.email}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-mint px-2.5 py-1 text-[11px] font-semibold text-forest">
                    {m.role}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-soft">
              Role permissions apply on login. Managers can import Excel data and override
              classroom assignments.
            </p>
          </CardShell>
        </div>
      </div>
    </div>
  );
}
