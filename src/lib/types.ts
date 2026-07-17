import { differenceInMonths, parseISO, format, addMonths, isBefore, isAfter } from "date-fns";

/** Fixed "today" for deterministic demo ages (Phase 1 sample data). */
export const REFERENCE_DATE = new Date(2026, 6, 17); // Jul 17, 2026

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri";
export type Role = "Admin" | "Manager" | "Scheduler";
export type StudentStatus = "active" | "waitlist" | "graduating";
export type AlertType = "birthday" | "age_transition" | "exemption" | "capacity";
export type AlertSeverity = "high" | "medium" | "low";

export type ClassroomId =
  | "shark"
  | "octopus"
  | "starfish"
  | "dolphin"
  | "turtle"
  | "orca";

export interface Classroom {
  id: ClassroomId;
  name: string;
  stage: string;
  ageMinMonths: number;
  ageMaxMonths: number;
  legalCapacity: number;
  requiresPottyTrained: boolean;
  under36Cap?: number;
  color: string;
  accent: string;
}

export interface Schedule {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  dob: string;
  classroomId: ClassroomId;
  schedule: Schedule;
  pottyTrained: boolean;
  status: StudentStatus;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  enrollmentDate: string;
  notes?: string;
  overrideClassroomId?: ClassroomId | null;
  overrideMonth?: string | null;
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  studentId: string;
  title: string;
  description: string;
  dueDate: string;
  acknowledged: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  task: string;
  status: "Completed" | "In Progress" | "Pending";
  classroomFocus?: string;
}

export const DAYS: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Monday", short: "M" },
  { key: "tue", label: "Tuesday", short: "T" },
  { key: "wed", label: "Wednesday", short: "W" },
  { key: "thu", label: "Thursday", short: "Th" },
  { key: "fri", label: "Friday", short: "F" },
];

export const FULL_WEEK: Schedule = {
  mon: true,
  tue: true,
  wed: true,
  thu: true,
  fri: true,
};

export const MWF: Schedule = {
  mon: true,
  tue: false,
  wed: true,
  thu: false,
  fri: true,
};

export const TTH: Schedule = {
  mon: false,
  tue: true,
  wed: false,
  thu: true,
  fri: false,
};

export const CLASSROOMS: Classroom[] = [
  {
    id: "shark",
    name: "Shark",
    stage: "Infants",
    ageMinMonths: 8,
    ageMaxMonths: 20,
    legalCapacity: 12,
    requiresPottyTrained: false,
    color: "#1a4d3e",
    accent: "#c5e8d9",
  },
  {
    id: "octopus",
    name: "Octopus",
    stage: "Infants",
    ageMinMonths: 8,
    ageMaxMonths: 24,
    legalCapacity: 12,
    requiresPottyTrained: false,
    color: "#2d6a55",
    accent: "#d4edda",
  },
  {
    id: "starfish",
    name: "Starfish",
    stage: "Toddlers",
    ageMinMonths: 20,
    ageMaxMonths: 36,
    legalCapacity: 12,
    requiresPottyTrained: false,
    color: "#3d7a62",
    accent: "#e8f5f0",
  },
  {
    id: "dolphin",
    name: "Dolphin",
    stage: "Toddlers",
    ageMinMonths: 24,
    ageMaxMonths: 36,
    legalCapacity: 12,
    requiresPottyTrained: false,
    color: "#4a8a70",
    accent: "#e8f5f0",
  },
  {
    id: "turtle",
    name: "Turtle",
    stage: "Preschool 1",
    ageMinMonths: 36,
    ageMaxMonths: 48,
    legalCapacity: 25,
    requiresPottyTrained: true,
    under36Cap: 2,
    color: "#5a9a80",
    accent: "#f0faf5",
  },
  {
    id: "orca",
    name: "Orca",
    stage: "Preschool 2",
    ageMinMonths: 48,
    ageMaxMonths: 72,
    legalCapacity: 24,
    requiresPottyTrained: true,
    color: "#0f3329",
    accent: "#c5e8d9",
  },
];

export function ageInMonths(dob: string, asOf: Date = REFERENCE_DATE): number {
  return differenceInMonths(asOf, parseISO(dob));
}

export function formatAge(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr`;
  return `${y}y ${m}m`;
}

export function scheduleLabel(s: Schedule): string {
  const days = DAYS.filter((d) => s[d.key]).map((d) => d.short);
  if (days.length === 5) return "Full week";
  return days.join("/");
}

export function fteContribution(s: Schedule): number {
  return DAYS.filter((d) => s[d.key]).length / 5;
}

export function getClassroom(id: ClassroomId): Classroom {
  return CLASSROOMS.find((c) => c.id === id)!;
}

export function eligibleClassroom(
  months: number,
  pottyTrained: boolean
): ClassroomId | null {
  // Prefer highest eligible room (top-down cascade logic)
  const eligible = [...CLASSROOMS]
    .reverse()
    .find((c) => {
      if (months < c.ageMinMonths || months >= c.ageMaxMonths) return false;
      if (c.requiresPottyTrained && !pottyTrained) return false;
      return true;
    });
  return eligible?.id ?? null;
}

export function projectionForStudent(
  student: Student,
  startMonth: Date = REFERENCE_DATE
): { month: string; ageMonths: number; suggested: ClassroomId | null; current: ClassroomId }[] {
  return Array.from({ length: 12 }, (_, i) => {
    const asOf = addMonths(startMonth, i);
    const age = ageInMonths(student.dob, asOf);
    return {
      month: format(asOf, "MMM yyyy"),
      ageMonths: age,
      suggested: eligibleClassroom(age, student.pottyTrained),
      current: student.overrideClassroomId && student.overrideMonth === format(asOf, "yyyy-MM")
        ? student.overrideClassroomId
        : student.classroomId,
    };
  });
}

export function dayHeadcount(
  students: Student[],
  classroomId: ClassroomId,
  day: DayKey
): number {
  return students.filter(
    (s) =>
      s.status === "active" &&
      s.classroomId === classroomId &&
      s.schedule[day]
  ).length;
}

export function fteSeatsUsed(students: Student[], classroomId: ClassroomId): number {
  return students
    .filter((s) => s.status === "active" && s.classroomId === classroomId)
    .reduce((sum, s) => sum + fteContribution(s.schedule), 0);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function isWithinRange(date: Date, start: Date, end: Date): boolean {
  return !isBefore(date, start) && !isAfter(date, end);
}
