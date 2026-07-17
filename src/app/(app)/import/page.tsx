"use client";

import { useRef, useState } from "react";
import { IconCheck, IconFile, IconImport, IconPlus } from "@/components/icons";
import { cn } from "@/lib/types";

type Step = "idle" | "selected" | "validating" | "validated" | "importing" | "done";

type RowIssue = {
  row: number;
  field: string;
  message: string;
  severity: "error" | "warning";
};

const SAMPLE_PREVIEW = [
  {
    firstName: "Ruby",
    lastName: "Chen",
    dob: "2025-05-01",
    room: "Shark",
    schedule: "T/Th",
    potty: "No",
    guardian: "Wei Chen",
  },
  {
    firstName: "Theo",
    lastName: "Morales",
    dob: "2024-09-12",
    room: "Starfish",
    schedule: "Full",
    potty: "No",
    guardian: "Ana Morales",
  },
  {
    firstName: "Camila",
    lastName: "Rossi",
    dob: "2023-12-04",
    room: "Turtle",
    schedule: "M/W/F",
    potty: "Yes",
    guardian: "Luca Rossi",
  },
  {
    firstName: "Ben",
    lastName: "",
    dob: "2024-02-30",
    room: "Dolphin",
    schedule: "Full",
    potty: "No",
    guardian: "Amy Lee",
  },
  {
    firstName: "Sadie",
    lastName: "Nguyen",
    dob: "2022-07-19",
    room: "Orca",
    schedule: "Full",
    potty: "Yes",
    guardian: "Minh Nguyen",
  },
];

const ISSUES: RowIssue[] = [
  {
    row: 4,
    field: "lastName",
    message: "Last name is required",
    severity: "error",
  },
  {
    row: 4,
    field: "dob",
    message: "Invalid date 2024-02-30",
    severity: "error",
  },
  {
    row: 3,
    field: "room",
    message: "Camila is 31 months — Turtle under-36 exemption may be required",
    severity: "warning",
  },
];

export default function ImportPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>("idle");
  const [fileName, setFileName] = useState("");
  const [imported, setImported] = useState(0);

  const pickFile = () => inputRef.current?.click();

  const onFile = (file?: File) => {
    if (!file) return;
    setFileName(file.name);
    setStep("selected");
  };

  const validate = () => {
    setStep("validating");
    setTimeout(() => setStep("validated"), 1100);
  };

  const runImport = () => {
    setStep("importing");
    setTimeout(() => {
      setImported(3);
      setStep("done");
    }, 1200);
  };

  const reset = () => {
    setStep("idle");
    setFileName("");
    setImported(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const steps = [
    { key: "select", label: "Select Excel", done: step !== "idle" },
    {
      key: "validate",
      label: "Validate",
      done: ["validated", "importing", "done"].includes(step),
    },
    { key: "import", label: "Import", done: step === "done" },
    { key: "confirm", label: "Confirm", done: step === "done" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-ink">
          Excel Data Importer
        </h1>
        <p className="mt-1 text-[14px] text-ink-muted">
          Manager login → select file → validate → import students → confirmation.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex flex-wrap items-center gap-2 rounded-[22px] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold",
                s.done ? "bg-forest text-white" : "bg-cream text-ink-soft"
              )}
            >
              {s.done ? <IconCheck size={14} /> : i + 1}
            </div>
            <span
              className={cn(
                "text-[13px] font-semibold",
                s.done ? "text-forest" : "text-ink-soft"
              )}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div className="mx-2 hidden h-px w-8 bg-border sm:block" />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          {/* Dropzone */}
          <div
            role="button"
            tabIndex={0}
            onClick={pickFile}
            onKeyDown={(e) => e.key === "Enter" && pickFile()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onFile(e.dataTransfer.files[0]);
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed bg-surface px-6 py-14 text-center transition hover:border-forest hover:bg-mint/30",
              step === "idle" ? "border-border" : "border-mint-bright bg-mint/20"
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint text-forest">
              <IconImport size={24} />
            </div>
            <p className="mt-4 text-[15px] font-bold text-ink">
              {fileName || "Drop your Excel roster here"}
            </p>
            <p className="mt-1 text-[13px] text-ink-muted">
              .xlsx, .xls, or .csv · Required columns: First Name, Last Name, DOB,
              Classroom, Schedule, Potty Trained, Guardian
            </p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-[13px] font-semibold text-white"
            >
              <IconPlus size={14} />
              Browse files
            </button>
          </div>

          {step !== "idle" && (
            <div className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-forest">
                  <IconFile />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-ink">{fileName}</p>
                  <p className="text-[12px] text-ink-soft">5 rows detected · 48 KB</p>
                </div>
                {step === "selected" && (
                  <button
                    type="button"
                    onClick={validate}
                    className="rounded-xl bg-forest px-4 py-2 text-[13px] font-semibold text-white"
                  >
                    Validate data
                  </button>
                )}
                {step === "validating" && (
                  <span className="animate-pulse text-[13px] font-semibold text-forest">
                    Validating…
                  </span>
                )}
                {step === "validated" && (
                  <button
                    type="button"
                    onClick={runImport}
                    className="rounded-xl bg-forest px-4 py-2 text-[13px] font-semibold text-white"
                  >
                    Import valid rows
                  </button>
                )}
                {step === "importing" && (
                  <span className="animate-pulse text-[13px] font-semibold text-forest">
                    Importing…
                  </span>
                )}
                {step === "done" && (
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-xl border border-border px-4 py-2 text-[13px] font-semibold"
                  >
                    Import another
                  </button>
                )}
              </div>

              {["validated", "importing", "done"].includes(step) && (
                <div className="mt-4 overflow-x-auto custom-scroll">
                  <table className="w-full min-w-[640px] text-left text-[12px]">
                    <thead>
                      <tr className="border-b border-border text-[10px] uppercase tracking-wider text-ink-soft">
                        <th className="pb-2 pr-2">#</th>
                        <th className="pb-2 pr-2">Name</th>
                        <th className="pb-2 pr-2">DOB</th>
                        <th className="pb-2 pr-2">Room</th>
                        <th className="pb-2 pr-2">Schedule</th>
                        <th className="pb-2">Guardian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_PREVIEW.map((r, i) => {
                        const hasError = ISSUES.some(
                          (iss) => iss.row === i + 1 && iss.severity === "error"
                        );
                        return (
                          <tr
                            key={i}
                            className={cn(
                              "border-b border-border/50",
                              hasError && "bg-danger/40"
                            )}
                          >
                            <td className="py-2 pr-2 text-ink-soft">{i + 1}</td>
                            <td className="py-2 pr-2 font-semibold">
                              {r.firstName} {r.lastName || "—"}
                            </td>
                            <td className="py-2 pr-2">{r.dob}</td>
                            <td className="py-2 pr-2">{r.room}</td>
                            <td className="py-2 pr-2">{r.schedule}</td>
                            <td className="py-2">{r.guardian}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {step === "done" && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-success px-4 py-3 text-success-text">
                  <IconCheck size={18} />
                  <div>
                    <p className="text-[14px] font-bold">Import complete</p>
                    <p className="text-[13px]">
                      {imported} students imported successfully. 1 row skipped due to
                      validation errors. Dashboard and projection grid updated.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-ink">Validation results</h3>
            {step === "idle" || step === "selected" || step === "validating" ? (
              <p className="mt-3 text-[13px] text-ink-muted">
                Run validation to check DOB formats, required fields, classroom names, and
                potty-training constraints.
              </p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {ISSUES.map((iss, i) => (
                  <li
                    key={i}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-[12px]",
                      iss.severity === "error"
                        ? "bg-danger text-danger-text"
                        : "bg-warning text-warning-text"
                    )}
                  >
                    <span className="font-bold uppercase">{iss.severity}</span>
                    <span className="mx-1.5 opacity-50">·</span>
                    Row {iss.row} · {iss.field}
                    <p className="mt-0.5 font-medium">{iss.message}</p>
                  </li>
                ))}
                <li className="rounded-xl bg-success px-3 py-2.5 text-[12px] text-success-text">
                  <span className="font-bold">3 rows valid</span> and ready to import
                </li>
              </ul>
            )}
          </div>

          <div className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-[15px] font-bold text-ink">Column mapping</h3>
            <ul className="mt-3 space-y-2 text-[12px]">
              {[
                ["A", "First Name", "Required"],
                ["B", "Last Name", "Required"],
                ["C", "Date of Birth", "YYYY-MM-DD"],
                ["D", "Classroom", "Shark…Orca"],
                ["E", "Schedule", "Full / MWF / TTh"],
                ["F", "Potty Trained", "Yes / No"],
                ["G", "Guardian Name", "Required"],
              ].map(([col, name, note]) => (
                <li
                  key={col}
                  className="flex items-center justify-between rounded-lg bg-cream/70 px-3 py-2"
                >
                  <span>
                    <span className="mr-2 font-bold text-forest">{col}</span>
                    {name}
                  </span>
                  <span className="text-ink-soft">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
