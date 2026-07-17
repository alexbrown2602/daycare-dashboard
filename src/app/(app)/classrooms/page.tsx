"use client";

import { useMemo } from "react";
import { STUDENTS } from "@/lib/data";
import {
  CLASSROOMS,
  DAYS,
  ageInMonths,
  cn,
  dayHeadcount,
  formatAge,
  fteSeatsUsed,
  scheduleLabel,
} from "@/lib/types";

export default function ClassroomsPage() {
  const active = useMemo(
    () => STUDENTS.filter((s) => s.status === "active"),
    []
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-ink">Classrooms</h1>
        <p className="mt-1 text-[14px] text-ink-muted">
          Legal seat capacity, age bands, potty rules, and daily FTE headcounts.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {CLASSROOMS.map((room) => {
          const kids = active.filter((s) => s.classroomId === room.id);
          const fte = fteSeatsUsed(active, room.id);
          const pct = Math.min(100, Math.round((fte / room.legalCapacity) * 100));
          const under36 =
            room.under36Cap != null
              ? kids.filter((s) => ageInMonths(s.dob) < 36).length
              : null;
          const exemptionWarn =
            under36 != null && room.under36Cap != null && under36 > room.under36Cap;

          return (
            <div
              key={room.id}
              className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-card)]"
            >
              <div
                className="flex items-center justify-between px-5 py-4 text-white"
                style={{ background: room.color }}
              >
                <div>
                  <h2 className="text-[18px] font-bold">{room.name}</h2>
                  <p className="text-[12px] text-white/75">
                    {room.stage} · {room.ageMinMonths}–{room.ageMaxMonths} months
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[24px] font-bold tabular-nums leading-none">
                    {fte.toFixed(1)}
                    <span className="text-[14px] font-medium text-white/70">
                      /{room.legalCapacity}
                    </span>
                  </p>
                  <p className="mt-1 text-[11px] text-white/70">{pct}% FTE</p>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4 h-2 overflow-hidden rounded-full bg-cream">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      pct >= 95 ? "bg-[#c45c52]" : "bg-forest"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mb-4 flex flex-wrap gap-2 text-[11px]">
                  {room.requiresPottyTrained && (
                    <span className="rounded-full bg-mint px-2.5 py-1 font-semibold text-forest">
                      Potty trained required
                    </span>
                  )}
                  {room.under36Cap != null && (
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 font-semibold",
                        exemptionWarn
                          ? "bg-danger text-danger-text"
                          : "bg-cream text-ink-muted"
                      )}
                    >
                      Under-36: {under36}/{room.under36Cap}
                      {exemptionWarn && " — Exemption needed"}
                    </span>
                  )}
                  <span className="rounded-full bg-cream px-2.5 py-1 font-semibold text-ink-muted">
                    {kids.length} enrolled
                  </span>
                </div>

                {/* Daily headcount */}
                <p className="mb-2 text-[12px] font-semibold text-ink">Daily headcount</p>
                <div className="mb-4 grid grid-cols-5 gap-2">
                  {DAYS.map((d) => {
                    const count = dayHeadcount(active, room.id, d.key);
                    const over = count > room.legalCapacity;
                    return (
                      <div
                        key={d.key}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-center",
                          over
                            ? "border-danger-text/30 bg-danger"
                            : "border-border bg-cream/50"
                        )}
                      >
                        <p className="text-[10px] font-bold uppercase text-ink-soft">
                          {d.short}
                        </p>
                        <p
                          className={cn(
                            "text-[16px] font-bold tabular-nums",
                            over ? "text-danger-text" : "text-ink"
                          )}
                        >
                          {count}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Roster */}
                <p className="mb-2 text-[12px] font-semibold text-ink">Roster</p>
                <ul className="max-h-40 space-y-1.5 overflow-y-auto custom-scroll">
                  {kids.length === 0 && (
                    <li className="text-[12px] text-ink-soft">No active students</li>
                  )}
                  {kids.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between rounded-lg bg-cream/60 px-2.5 py-1.5"
                    >
                      <span className="text-[12px] font-medium text-ink">
                        {s.firstName} {s.lastName}
                        <span className="ml-1.5 text-ink-soft">
                          {formatAge(ageInMonths(s.dob))}
                        </span>
                      </span>
                      <span className="text-[11px] text-ink-soft">
                        {scheduleLabel(s.schedule)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
        <h3 className="text-[16px] font-bold text-ink">Part-time FTE gapping</h3>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-ink-muted">
          Capacity is calculated per weekday. If Child A attends M/W/F and Child B attends T/Th,
          DayCare Dashboard counts them as one shared FTE seat — preventing false over-capacity flags while
          maximizing enrollment. Legal seat limits still apply to daily headcount.
        </p>
      </div>
    </div>
  );
}
