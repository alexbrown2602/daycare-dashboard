"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STUDENTS } from "@/lib/data";
import {
  CLASSROOMS,
  DAYS,
  FULL_WEEK,
  MWF,
  TTH,
  ageInMonths,
  cn,
  formatAge,
  getClassroom,
  scheduleLabel,
  type ClassroomId,
  type Schedule,
  type Student,
  type StudentStatus,
} from "@/lib/types";
import { IconPlus, IconSearch, IconFilter, IconEdit, IconCheck } from "@/components/icons";
import { format, parseISO } from "date-fns";

const emptyForm = {
  firstName: "",
  lastName: "",
  dob: "",
  classroomId: "shark" as ClassroomId,
  schedule: "full" as "full" | "mwf" | "tth",
  pottyTrained: false,
  guardianName: "",
  guardianEmail: "",
  guardianPhone: "",
  status: "active" as StudentStatus,
  notes: "",
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [query, setQuery] = useState("");
  const [roomFilter, setRoomFilter] = useState<ClassroomId | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StudentStatus | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [overrideId, setOverrideId] = useState<string | null>(null);
  const [overrideRoom, setOverrideRoom] = useState<ClassroomId>("turtle");
  const [savedFlash, setSavedFlash] = useState("");

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
        s.guardianName.toLowerCase().includes(q);
      const matchRoom = roomFilter === "all" || s.classroomId === roomFilter;
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      return matchQ && matchRoom && matchStatus;
    });
  }, [students, query, roomFilter, statusFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (s: Student) => {
    setEditing(s);
    const sched =
      scheduleLabel(s.schedule) === "Full week"
        ? "full"
        : scheduleLabel(s.schedule) === "M/W/F"
          ? "mwf"
          : "tth";
    setForm({
      firstName: s.firstName,
      lastName: s.lastName,
      dob: s.dob,
      classroomId: s.classroomId,
      schedule: sched,
      pottyTrained: s.pottyTrained,
      guardianName: s.guardianName,
      guardianEmail: s.guardianEmail,
      guardianPhone: s.guardianPhone,
      status: s.status,
      notes: s.notes ?? "",
    });
    setShowForm(true);
  };

  const scheduleFromForm = (): Schedule => {
    if (form.schedule === "mwf") return { ...MWF };
    if (form.schedule === "tth") return { ...TTH };
    return { ...FULL_WEEK };
  };

  const saveStudent = () => {
    if (!form.firstName || !form.lastName || !form.dob || !form.guardianName) {
      return;
    }
    if (editing) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editing.id
            ? {
                ...s,
                ...form,
                schedule: scheduleFromForm(),
              }
            : s
        )
      );
      setSavedFlash(`Updated ${form.firstName} ${form.lastName}`);
    } else {
      const id = `st-${String(students.length + 1).padStart(3, "0")}`;
      const neu: Student = {
        id,
        firstName: form.firstName,
        lastName: form.lastName,
        dob: form.dob,
        classroomId: form.classroomId,
        schedule: scheduleFromForm(),
        pottyTrained: form.pottyTrained,
        status: form.status,
        guardianName: form.guardianName,
        guardianEmail: form.guardianEmail,
        guardianPhone: form.guardianPhone,
        enrollmentDate: format(new Date(), "yyyy-MM-dd"),
        notes: form.notes || undefined,
      };
      setStudents((prev) => [neu, ...prev]);
      setSavedFlash(`Added ${form.firstName} ${form.lastName}`);
    }
    setShowForm(false);
    setTimeout(() => setSavedFlash(""), 2500);
  };

  const applyOverride = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              classroomId: overrideRoom,
              overrideClassroomId: overrideRoom,
              overrideMonth: format(new Date(), "yyyy-MM"),
            }
          : s
      )
    );
    const s = students.find((x) => x.id === studentId);
    setSavedFlash(
      `Override saved: ${s?.firstName} → ${getClassroom(overrideRoom).name}`
    );
    setOverrideId(null);
    setTimeout(() => setSavedFlash(""), 2500);
  };

  const statusBadge = {
    active: "bg-success text-success-text",
    waitlist: "bg-warning text-warning-text",
    graduating: "bg-mint text-forest",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-ink">Students</h1>
          <p className="mt-1 text-[14px] text-ink-muted">
            Active profiles with DOB, classroom, schedule, and guardian details.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-forest-mid"
        >
          <IconPlus size={16} />
          Add Student
        </button>
      </div>

      {savedFlash && (
        <div className="flex items-center gap-2 rounded-xl bg-success px-4 py-3 text-[13px] font-medium text-success-text animate-fade-up">
          <IconCheck size={16} />
          {savedFlash}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by child or guardian…"
            className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-[14px] focus:border-forest focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <IconFilter className="text-ink-soft" />
          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value as ClassroomId | "all")}
            className="h-11 rounded-xl border border-border bg-surface px-3 text-[13px] focus:outline-none"
          >
            <option value="all">All rooms</option>
            {CLASSROOMS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StudentStatus | "all")}
            className="h-11 rounded-xl border border-border bg-surface px-3 text-[13px] focus:outline-none"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="waitlist">Waitlist</option>
            <option value="graduating">Graduating</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-card)]">
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-border bg-cream/50 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                <th className="px-5 py-3.5">Student</th>
                <th className="px-3 py-3.5">Age</th>
                <th className="px-3 py-3.5">Classroom</th>
                <th className="px-3 py-3.5">Schedule</th>
                <th className="px-3 py-3.5">Potty</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="px-3 py-3.5">Guardian</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const room = getClassroom(s.classroomId);
                const months = ageInMonths(s.dob);
                return (
                  <tr key={s.id} className="border-b border-border/60 transition hover:bg-mint/30">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white"
                          style={{ background: room.color }}
                        >
                          {s.firstName[0]}
                          {s.lastName[0]}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-ink">
                            {s.firstName} {s.lastName}
                            {s.preferredName && (
                              <span className="ml-1 font-normal text-ink-soft">
                                “{s.preferredName}”
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-ink-soft">
                            DOB {format(parseISO(s.dob), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-[13px] font-medium tabular-nums text-ink">
                      {formatAge(months)}
                    </td>
                    <td className="px-3 py-3.5">
                      {overrideId === s.id ? (
                        <div className="flex items-center gap-1.5">
                          <select
                            value={overrideRoom}
                            onChange={(e) => setOverrideRoom(e.target.value as ClassroomId)}
                            className="h-8 rounded-lg border border-forest bg-mint px-2 text-[12px] font-medium focus:outline-none"
                          >
                            {CLASSROOMS.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => applyOverride(s.id)}
                            className="rounded-lg bg-forest px-2 py-1 text-[11px] font-semibold text-white"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setOverrideId(null)}
                            className="text-[11px] text-ink-soft"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setOverrideId(s.id);
                            setOverrideRoom(s.classroomId);
                          }}
                          className="rounded-full bg-mint px-2.5 py-1 text-[12px] font-semibold text-forest transition hover:bg-mint-bright"
                          title="Manual classroom override"
                        >
                          {room.name}
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex gap-0.5">
                        {DAYS.map((d) => (
                          <span
                            key={d.key}
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold",
                              s.schedule[d.key]
                                ? "bg-forest text-white"
                                : "bg-cream text-ink-soft"
                            )}
                          >
                            {d.short[0]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-[12px] text-ink-muted">
                      {s.pottyTrained ? "Yes" : "No"}
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                          statusBadge[s.status]
                        )}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="text-[12px] font-medium text-ink">{s.guardianName}</p>
                      <p className="text-[11px] text-ink-soft">{s.guardianPhone}</p>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => openEdit(s)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[12px] font-semibold text-ink-muted hover:bg-cream"
                      >
                        <IconEdit size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-5 py-3 text-[12px] text-ink-soft">
          Showing {filtered.length} of {students.length} students · Click classroom badge for
          manual override
        </div>
      </div>

      {/* Create / Edit modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] border border-border bg-surface p-6 shadow-2xl custom-scroll">
            <h2 className="text-[20px] font-bold text-ink">
              {editing ? "Edit student" : "Add student"}
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              Save DOB, room & schedule — profile appears on the dashboard.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[12px] font-semibold">First name</label>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Last name</label>
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Date of birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Classroom</label>
                <select
                  value={form.classroomId}
                  onChange={(e) =>
                    setForm({ ...form, classroomId: e.target.value as ClassroomId })
                  }
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:outline-none"
                >
                  {CLASSROOMS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.stage})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Schedule</label>
                <select
                  value={form.schedule}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      schedule: e.target.value as "full" | "mwf" | "tth",
                    })
                  }
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:outline-none"
                >
                  <option value="full">Full week (M–F)</option>
                  <option value="mwf">Part-time M/W/F</option>
                  <option value="tth">Part-time T/Th</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as StudentStatus })
                  }
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="waitlist">Waitlist</option>
                  <option value="graduating">Graduating</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={form.pottyTrained}
                    onChange={(e) => setForm({ ...form, pottyTrained: e.target.checked })}
                    className="accent-forest"
                  />
                  Potty trained (required for Turtle & Orca)
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[12px] font-semibold">Guardian name</label>
                <input
                  value={form.guardianName}
                  onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Guardian email</label>
                <input
                  type="email"
                  value={form.guardianEmail}
                  onChange={(e) => setForm({ ...form, guardianEmail: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Guardian phone</label>
                <input
                  value={form.guardianPhone}
                  onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[12px] font-semibold">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-border px-3 py-2 text-[14px] focus:border-forest focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-border px-4 py-2.5 text-[13px] font-semibold text-ink-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveStudent}
                className="rounded-xl bg-forest px-4 py-2.5 text-[13px] font-semibold text-white"
              >
                {editing ? "Save changes" : "Create profile"}
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-[12px] text-ink-soft">
        Tip: Use the{" "}
        <Link href="/projection" className="font-semibold text-forest hover:underline">
          12-month projection
        </Link>{" "}
        to see where each child will be age-eligible next.
      </p>
    </div>
  );
}
