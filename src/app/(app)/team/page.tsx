"use client";

import { useState } from "react";
import { TEAM } from "@/lib/data";
import { cn, type Role, type TeamMember } from "@/lib/types";
import { IconPlus, IconCheck } from "@/components/icons";

const rolePerms: Record<Role, string[]> = {
  Admin: [
    "Create & manage users",
    "Full student CRUD",
    "Excel import",
    "Classroom overrides",
    "Settings & roles",
  ],
  Manager: [
    "Student CRUD",
    "Excel import",
    "Classroom overrides",
    "Review alerts & projection",
    "View team",
  ],
  Scheduler: [
    "View students & classrooms",
    "Suggest schedule pairings",
    "View projection grid",
    "Acknowledge alerts",
    "No user admin",
  ],
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(TEAM);
  const [showInvite, setShowInvite] = useState(false);
  const [invite, setInvite] = useState({
    name: "",
    email: "",
    role: "Scheduler" as Role,
  });
  const [flash, setFlash] = useState("");

  const statusStyle = {
    Completed: "bg-success text-success-text",
    "In Progress": "bg-warning text-warning-text",
    Pending: "bg-danger text-danger-text",
  } as const;

  const sendInvite = () => {
    if (!invite.name || !invite.email) return;
    const initials = invite.name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    setMembers((prev) => [
      ...prev,
      {
        id: `tm-${prev.length + 1}`,
        name: invite.name,
        email: invite.email,
        role: invite.role,
        avatar: initials,
        task: "Awaiting first login",
        status: "Pending",
      },
    ]);
    setFlash(`Invite sent to ${invite.email} as ${invite.role}`);
    setShowInvite(false);
    setInvite({ name: "", email: "", role: "Scheduler" });
    setTimeout(() => setFlash(""), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-ink">Team & Roles</h1>
          <p className="mt-1 text-[14px] text-ink-muted">
            Secure access for Admin, Manager, and Scheduler roles.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowInvite(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-[13px] font-semibold text-white"
        >
          <IconPlus size={16} />
          Invite member
        </button>
      </div>

      {flash && (
        <div className="flex items-center gap-2 rounded-xl bg-success px-4 py-3 text-[13px] font-medium text-success-text">
          <IconCheck size={16} />
          {flash}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {(["Admin", "Manager", "Scheduler"] as Role[]).map((role) => (
          <div
            key={role}
            className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-ink">{role}</h3>
              <span className="rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold text-forest">
                {members.filter((m) => m.role === role).length} users
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {rolePerms[role].map((p) => (
                <li key={p} className="flex items-start gap-2 text-[13px] text-ink-muted">
                  <IconCheck size={14} className="mt-0.5 shrink-0 text-forest" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-card)]">
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-[16px] font-bold text-ink">Team members</h3>
        </div>
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-border bg-cream/40 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                <th className="px-5 py-3">Name</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Current focus</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-5 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-border/60 hover:bg-mint/20">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-[11px] font-bold text-white">
                        {m.avatar}
                      </div>
                      <span className="text-[13px] font-semibold text-ink">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="rounded-full bg-mint px-2.5 py-1 text-[11px] font-semibold text-forest">
                      {m.role}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-[12px] text-ink-muted">{m.task}</td>
                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                        statusStyle[m.status]
                      )}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[12px] text-ink-soft">{m.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] border border-border bg-surface p-6 shadow-2xl">
            <h2 className="text-[18px] font-bold text-ink">Invite team member</h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              Admin creates users → they log in → role permissions apply.
            </p>
            <div className="mt-5 space-y-3">
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Full name</label>
                <input
                  value={invite.name}
                  onChange={(e) => setInvite({ ...invite, name: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
                  placeholder="Jordan Lee"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Email</label>
                <input
                  type="email"
                  value={invite.email}
                  onChange={(e) => setInvite({ ...invite, email: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border px-3 text-[14px] focus:border-forest focus:outline-none"
                  placeholder="jordan@littlenest.care"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold">Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Admin", "Manager", "Scheduler"] as Role[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setInvite({ ...invite, role: r })}
                      className={cn(
                        "rounded-xl border py-2 text-[12px] font-semibold",
                        invite.role === r
                          ? "border-forest bg-mint text-forest"
                          : "border-border text-ink-muted"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="rounded-xl border border-border px-4 py-2.5 text-[13px] font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={sendInvite}
                className="rounded-xl bg-forest px-4 py-2.5 text-[13px] font-semibold text-white"
              >
                Send invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
