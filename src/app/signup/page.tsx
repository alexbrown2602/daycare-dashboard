"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  AppLogo,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
} from "@/components/icons";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    center: "",
    role: "Manager" as "Admin" | "Manager" | "Scheduler",
    password: "",
    confirm: "",
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.center || !form.password) {
      setError("Please complete all required fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "daycare_auth",
        JSON.stringify({
          email: form.email,
          role: form.role,
          name: form.name,
          center: form.center,
        })
      );
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-cream">
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-forest p-10 text-white lg:flex">
        <div className="flex items-center gap-3">
          <AppLogo size={44} />
          <span className="text-2xl font-bold">DayCare Dashboard</span>
        </div>
        <div>
          <h1 className="text-[36px] font-bold leading-tight tracking-tight">
            Set up your center in minutes.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-mint-bright/85">
            Invite managers and schedulers, import your roster from Excel, and
            see the 12-month projection grid immediately.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { step: "01", title: "Create your account", desc: "Admin, Manager, or Scheduler roles" },
              { step: "02", title: "Import student data", desc: "Validate DOB, room & schedule columns" },
              { step: "03", title: "Review cascade alerts", desc: "Age transitions surface on day one" },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur">
                <span className="text-[18px] font-bold text-mint-bright">{s.step}</span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-[13px] text-mint-bright/70">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[12px] text-mint-bright/50">Trusted by early childhood operators</p>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-[460px]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <AppLogo size={36} />
            <span className="text-xl font-bold">DayCare Dashboard</span>
          </div>

          <h2 className="text-[28px] font-bold tracking-tight text-ink">Create account</h2>
          <p className="mt-1.5 text-[14px] text-ink-muted">
            Join DayCare Dashboard to run enrollment decision support.
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-3.5">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[13px] font-semibold text-ink">Full name</label>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-[14px] focus:border-forest focus:outline-none"
                  placeholder="Maya Chen"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[13px] font-semibold text-ink">Work email</label>
                <div className="relative">
                  <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-[14px] focus:border-forest focus:outline-none"
                    placeholder="you@center.care"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[13px] font-semibold text-ink">
                  Center name
                </label>
                <input
                  value={form.center}
                  onChange={(e) => set("center", e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-[14px] focus:border-forest focus:outline-none"
                  placeholder="Little Nest Learning Center"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Admin", "Manager", "Scheduler"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => set("role", r)}
                    className={`rounded-xl border px-2 py-2.5 text-[12px] font-semibold transition ${
                      form.role === r
                        ? "border-forest bg-mint text-forest"
                        : "border-border bg-surface text-ink-muted"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink">Password</label>
              <div className="relative">
                <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-12 text-[14px] focus:border-forest focus:outline-none"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
                >
                  {show ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink">
                Confirm password
              </label>
              <div className="relative">
                <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  type={show ? "text" : "password"}
                  value={form.confirm}
                  onChange={(e) => set("confirm", e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-[14px] focus:border-forest focus:outline-none"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-danger px-3 py-2 text-[13px] text-danger-text">{error}</p>
            )}

            <label className="flex items-start gap-2 text-[12px] text-ink-muted">
              <input type="checkbox" required className="mt-0.5 accent-forest" />
              I agree to DayCare Dashboard&apos;s terms and acknowledge this is a secure internal tool for authorized staff only.
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-forest text-[14px] font-semibold text-white transition hover:bg-forest-mid disabled:opacity-70"
            >
              {loading ? "Creating…" : (
                <>
                  <IconCheck size={16} />
                  Create account
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-ink-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-forest hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
