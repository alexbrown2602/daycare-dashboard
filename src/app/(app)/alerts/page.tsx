"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALERTS, STUDENTS } from "@/lib/data";
import { cn, getClassroom, type Alert, type AlertSeverity, type AlertType } from "@/lib/types";
import { IconAlert, IconCake, IconCheck, IconChevron } from "@/components/icons";
import { format, parseISO } from "date-fns";

const typeMeta: Record<
  AlertType,
  { label: string; icon: "alert" | "cake" | "cap" | "ex" }
> = {
  birthday: { label: "Birthday", icon: "cake" },
  age_transition: { label: "Age transition", icon: "alert" },
  exemption: { label: "Exemption", icon: "ex" },
  capacity: { label: "Capacity", icon: "cap" },
};

const severityStyle: Record<AlertSeverity, string> = {
  high: "bg-danger text-danger-text",
  medium: "bg-warning text-warning-text",
  low: "bg-mint text-forest",
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS);
  const [filter, setFilter] = useState<AlertType | "all">("all");
  const [showAcked, setShowAcked] = useState(true);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      if (!showAcked && a.acknowledged) return false;
      if (filter !== "all" && a.type !== filter) return false;
      return true;
    });
  }, [alerts, filter, showAcked]);

  const counts = useMemo(() => {
    const open = alerts.filter((a) => !a.acknowledged);
    return {
      total: open.length,
      high: open.filter((a) => a.severity === "high").length,
      birthday: open.filter((a) => a.type === "birthday").length,
      transition: open.filter((a) => a.type === "age_transition").length,
    };
  }, [alerts]);

  const acknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const acknowledgeAll = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-ink">
            Birthday & Age Alerts
          </h1>
          <p className="mt-1 text-[14px] text-ink-muted">
            Automated flags when DOB triggers birthdays, age eligibility, exemptions, or capacity risk.
          </p>
        </div>
        <button
          type="button"
          onClick={acknowledgeAll}
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-mint"
        >
          Acknowledge all
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Open alerts", value: counts.total, hint: "Needs review" },
          { label: "High priority", value: counts.high, hint: "Act before Aug 1" },
          { label: "Birthdays", value: counts.birthday, hint: "Next 45 days" },
          { label: "Transitions", value: counts.transition, hint: "Cascade candidates" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
          >
            <p className="text-[13px] text-ink-muted">{c.label}</p>
            <p className="mt-2 text-[32px] font-bold tracking-tight text-ink">{c.value}</p>
            <p className="mt-1 text-[12px] text-ink-soft">{c.hint}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["all", "age_transition", "birthday", "exemption", "capacity"] as const).map(
          (f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition",
                filter === f
                  ? "bg-forest text-white"
                  : "border border-border bg-surface text-ink-muted hover:bg-cream"
              )}
            >
              {f === "all" ? "All" : typeMeta[f].label}
            </button>
          )
        )}
        <label className="ml-auto flex items-center gap-2 text-[12px] text-ink-muted">
          <input
            type="checkbox"
            checked={showAcked}
            onChange={(e) => setShowAcked(e.target.checked)}
            className="accent-forest"
          />
          Show acknowledged
        </label>
      </div>

      <div className="space-y-3">
        {filtered.map((alert) => {
          const student = STUDENTS.find((s) => s.id === alert.studentId);
          const room = student ? getClassroom(student.classroomId) : null;
          const meta = typeMeta[alert.type];
          return (
            <div
              key={alert.id}
              className={cn(
                "flex flex-wrap items-start gap-4 rounded-[22px] border bg-surface p-5 shadow-[var(--shadow-card)] transition",
                alert.acknowledged
                  ? "border-border opacity-60"
                  : "border-border hover:border-mint-bright"
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                  alert.type === "birthday"
                    ? "bg-warning text-warning-text"
                    : alert.severity === "high"
                      ? "bg-danger text-danger-text"
                      : "bg-mint text-forest"
                )}
              >
                {meta.icon === "cake" ? <IconCake /> : <IconAlert />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-bold text-ink">{alert.title}</h3>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                      severityStyle[alert.severity]
                    )}
                  >
                    {alert.severity}
                  </span>
                  <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold text-ink-muted">
                    {meta.label}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                  {alert.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-ink-soft">
                  {student && (
                    <span>
                      {student.firstName} {student.lastName}
                      {room && ` · ${room.name}`}
                    </span>
                  )}
                  <span>Due {format(parseISO(alert.dueDate), "MMM d, yyyy")}</span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {!alert.acknowledged && (
                  <button
                    type="button"
                    onClick={() => acknowledge(alert.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-3.5 py-2 text-[12px] font-semibold text-white"
                  >
                    <IconCheck size={14} />
                    Acknowledge
                  </button>
                )}
                <Link
                  href="/projection"
                  className="inline-flex items-center gap-1 rounded-xl border border-border px-3.5 py-2 text-[12px] font-semibold text-ink-muted hover:bg-cream"
                >
                  Open grid
                  <IconChevron size={14} />
                </Link>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-[22px] border border-dashed border-border bg-surface p-12 text-center text-ink-muted">
            No alerts match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
