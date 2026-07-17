"use client";

import { useMemo, useState } from "react";
import { STUDENTS } from "@/lib/data";
import {
  CLASSROOMS,
  ageInMonths,
  cn,
  eligibleClassroom,
  formatAge,
  getClassroom,
  projectionForStudent,
  type ClassroomId,
  type Student,
} from "@/lib/types";
import { IconCheck } from "@/components/icons";
import { addMonths, format } from "date-fns";

export default function ProjectionPage() {
  const [students, setStudents] = useState(
    STUDENTS.filter((s) => s.status === "active" || s.status === "graduating")
  );
  const [selectedId, setSelectedId] = useState(students[0]?.id ?? "");
  const [flash, setFlash] = useState("");
  const start = useMemo(() => new Date(2026, 6, 1), []); // Jul 2026

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => addMonths(start, i)),
    [start]
  );

  const selected = students.find((s) => s.id === selectedId);

  const applyOverride = (studentId: string, monthKey: string, room: ClassroomId) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              classroomId: monthKey === format(new Date(), "yyyy-MM") ? room : s.classroomId,
              overrideClassroomId: room,
              overrideMonth: monthKey,
            }
          : s
      )
    );
    const child = students.find((s) => s.id === studentId);
    setFlash(
      `Override: ${child?.firstName} → ${getClassroom(room).name} for ${monthKey}`
    );
    setTimeout(() => setFlash(""), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-ink">
          12-Month Projection
        </h1>
        <p className="mt-1 text-[14px] text-ink-muted">
          Monthly age calculation with projected classroom eligibility. Cascade
          runs top-down from Orca → Turtle → Dolphin → Starfish → Octopus → Shark.
        </p>
      </div>

      {flash && (
        <div className="flex items-center gap-2 rounded-xl bg-success px-4 py-3 text-[13px] font-medium text-success-text">
          <IconCheck size={16} />
          {flash}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Student picker */}
        <div className="lg:col-span-3">
          <div className="rounded-[22px] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
            <h3 className="mb-3 text-[14px] font-bold text-ink">Select student</h3>
            <ul className="max-h-[520px] space-y-1 overflow-y-auto custom-scroll">
              {students.map((s) => {
                const room = getClassroom(s.classroomId);
                const active = s.id === selectedId;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(s.id)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition",
                        active ? "bg-mint text-forest" : "hover:bg-cream"
                      )}
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: room.color }}
                      >
                        {s.firstName[0]}
                        {s.lastName[0]}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-semibold">
                          {s.firstName} {s.lastName}
                        </span>
                        <span className="block text-[11px] opacity-70">
                          {room.name} · {formatAge(ageInMonths(s.dob))}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Grid */}
        <div className="lg:col-span-9">
          {selected ? (
            <StudentProjection
              student={selected}
              months={months}
              onOverride={applyOverride}
            />
          ) : (
            <div className="rounded-[22px] border border-border bg-surface p-10 text-center text-ink-muted">
              Select a student to view their projection.
            </div>
          )}

          {/* Full roster heat grid */}
          <div className="mt-4 overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-[16px] font-bold text-ink">Roster eligibility grid</h3>
              <p className="text-[12px] text-ink-soft">
                Cell color = suggested classroom for that month. Click a cell to override.
              </p>
            </div>
            <div className="overflow-x-auto custom-scroll">
              <table className="w-full min-w-[1100px] text-left">
                <thead>
                  <tr className="border-b border-border bg-cream/40 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                    <th className="sticky left-0 bg-cream/90 px-4 py-3 backdrop-blur">Student</th>
                    {months.map((m) => (
                      <th key={m.toISOString()} className="px-2 py-3 text-center">
                        {format(m, "MMM")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 14).map((s) => {
                    const proj = projectionForStudent(s, start);
                    return (
                      <tr key={s.id} className="border-b border-border/50">
                        <td className="sticky left-0 bg-surface px-4 py-2 text-[12px] font-semibold backdrop-blur">
                          {s.firstName} {s.lastName[0]}.
                        </td>
                        {proj.map((p, i) => {
                          const suggested = p.suggested
                            ? getClassroom(p.suggested)
                            : null;
                          const mismatch =
                            p.suggested && p.suggested !== s.classroomId;
                          return (
                            <td key={i} className="px-1 py-1.5 text-center">
                              <button
                                type="button"
                                title={`${p.month}: ${formatAge(p.ageMonths)} → ${suggested?.name ?? "N/A"}`}
                                onClick={() => {
                                  if (!p.suggested) return;
                                  applyOverride(
                                    s.id,
                                    format(months[i], "yyyy-MM"),
                                    p.suggested
                                  );
                                }}
                                className={cn(
                                  "mx-auto flex h-8 w-full max-w-[56px] items-center justify-center rounded-lg text-[9px] font-bold transition hover:ring-2 hover:ring-forest/30",
                                  mismatch && "ring-1 ring-warning-text/40"
                                )}
                                style={{
                                  background: suggested?.accent ?? "#f4f7f5",
                                  color: suggested?.color ?? "#6b756f",
                                }}
                              >
                                {suggested?.name.slice(0, 3) ?? "—"}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-border px-5 py-3">
              {CLASSROOMS.map((c) => (
                <span key={c.id} className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                  <span
                    className="h-3 w-3 rounded"
                    style={{ background: c.accent, border: `1px solid ${c.color}33` }}
                  />
                  {c.name}
                </span>
              ))}
              <span className="text-[11px] text-ink-soft">· Ring = suggested ≠ current</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentProjection({
  student,
  months,
  onOverride,
}: {
  student: Student;
  months: Date[];
  onOverride: (id: string, monthKey: string, room: ClassroomId) => void;
}) {
  const proj = projectionForStudent(student, months[0]);
  const room = getClassroom(student.classroomId);

  return (
    <div className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-[14px] font-bold text-white"
            style={{ background: room.color }}
          >
            {student.firstName[0]}
            {student.lastName[0]}
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-ink">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-[13px] text-ink-muted">
              Current: {room.name} · {formatAge(ageInMonths(student.dob))} · Potty{" "}
              {student.pottyTrained ? "trained" : "not yet"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {proj.map((p, i) => {
          const suggested = p.suggested ? getClassroom(p.suggested) : null;
          const needsMove = p.suggested && p.suggested !== student.classroomId;
          return (
            <div
              key={p.month}
              className={cn(
                "rounded-2xl border p-3.5 transition",
                needsMove
                  ? "border-warning-text/30 bg-warning/30"
                  : "border-border bg-cream/40"
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-ink">{format(months[i], "MMM yyyy")}</p>
                <p className="text-[11px] tabular-nums text-ink-soft">
                  {formatAge(p.ageMonths)}
                </p>
              </div>
              <p className="mt-2 text-[11px] text-ink-soft">Suggested</p>
              <p className="text-[14px] font-bold" style={{ color: suggested?.color }}>
                {suggested?.name ?? "Out of range"}
              </p>
              {needsMove && (
                <button
                  type="button"
                  onClick={() =>
                    onOverride(student.id, format(months[i], "yyyy-MM"), p.suggested!)
                  }
                  className="mt-2 w-full rounded-lg bg-forest py-1.5 text-[11px] font-semibold text-white"
                >
                  Apply override
                </button>
              )}
              {!needsMove && suggested && (
                <p className="mt-2 text-[11px] text-success-text">Aligned with current room</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Cascade hint */}
      <div className="mt-5 rounded-2xl bg-mint/60 px-4 py-3 text-[12px] leading-relaxed text-forest">
        <strong>Cascade logic:</strong> On the 1st of each month the shuffle engine checks Orca
        vacancies first, then pulls qualified children up from Turtle, cascading downward to free
        infant seats in Shark & Octopus.
        {(() => {
          const next = eligibleClassroom(
            ageInMonths(student.dob, addMonths(new Date(), 1)),
            student.pottyTrained
          );
          if (next && next !== student.classroomId) {
            return (
              <>
                {" "}
                Next month, {student.firstName} is flagged for{" "}
                <strong>{getClassroom(next).name}</strong>.
              </>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
}
