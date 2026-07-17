"use client";

import { useState } from "react";
import { CURRENT_USER } from "@/lib/data";
import { CLASSROOMS } from "@/lib/types";
import { IconCheck } from "@/components/icons";

export default function SettingsPage() {
  const [center, setCenter] = useState(CURRENT_USER.center);
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [cascadeDay, setCascadeDay] = useState("1");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [birthdayLead, setBirthdayLead] = useState("14");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-ink">Settings</h1>
        <p className="mt-1 text-[14px] text-ink-muted">
          Center configuration, cascade schedule, and notification preferences.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-success px-4 py-3 text-[13px] font-medium text-success-text">
          <IconCheck size={16} />
          Settings saved
        </div>
      )}

      <section className="rounded-[22px] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-[16px] font-bold text-ink">Center profile</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-[12px] font-semibold">Center name</label>
            <input
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              className="h-11 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-semibold">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="h-11 w-full rounded-xl border border-border px-3 text-[14px] focus:outline-none"
            >
              <option value="America/Los_Angeles">Pacific (America/Los_Angeles)</option>
              <option value="America/Denver">Mountain</option>
              <option value="America/Chicago">Central</option>
              <option value="America/New_York">Eastern</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-[22px] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-[16px] font-bold text-ink">Shuffle engine</h2>
        <p className="mt-1 text-[13px] text-ink-muted">
          Optimization runs on the 1st of every month, cascading from Orca downward.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[12px] font-semibold">
              Cascade day of month
            </label>
            <select
              value={cascadeDay}
              onChange={(e) => setCascadeDay(e.target.value)}
              className="h-11 w-full rounded-xl border border-border px-3 text-[14px] focus:outline-none"
            >
              <option value="1">1st</option>
              <option value="15">15th</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-semibold">
              Birthday lead time (days)
            </label>
            <select
              value={birthdayLead}
              onChange={(e) => setBirthdayLead(e.target.value)}
              className="h-11 w-full rounded-xl border border-border px-3 text-[14px] focus:outline-none"
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-[13px] text-ink-muted">
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
            className="accent-forest"
          />
          Email managers when high-priority transition alerts fire
        </label>
      </section>

      <section className="rounded-[22px] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-[16px] font-bold text-ink">Classroom parameters</h2>
        <p className="mt-1 text-[13px] text-ink-muted">
          Read-only Phase 1 configuration from your approved parameter sheet.
        </p>
        <div className="mt-4 overflow-x-auto custom-scroll">
          <table className="w-full min-w-[520px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wider text-ink-soft">
                <th className="pb-2">Room</th>
                <th className="pb-2">Age (mo)</th>
                <th className="pb-2">Seats</th>
                <th className="pb-2">Rules</th>
              </tr>
            </thead>
            <tbody>
              {CLASSROOMS.map((c) => (
                <tr key={c.id} className="border-b border-border/50">
                  <td className="py-2.5 font-semibold">{c.name}</td>
                  <td className="py-2.5">
                    {c.ageMinMonths}–{c.ageMaxMonths}
                  </td>
                  <td className="py-2.5">{c.legalCapacity}</td>
                  <td className="py-2.5 text-ink-muted">
                    {c.requiresPottyTrained ? "Potty trained" : "—"}
                    {c.under36Cap != null && ` · max ${c.under36Cap} under 36mo`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <button
        type="button"
        onClick={save}
        className="rounded-xl bg-forest px-5 py-3 text-[14px] font-semibold text-white hover:bg-forest-mid"
      >
        Save settings
      </button>
    </div>
  );
}
