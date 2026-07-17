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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("maya.chen@littlenest.care");
  const [password, setPassword] = useState("demo1234");
  const [show, setShow] = useState(false);
  const [role, setRole] = useState<"Admin" | "Manager" | "Scheduler">("Manager");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Enter your work email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "daycare_auth",
        JSON.stringify({ email, role, name: "Maya Chen" })
      );
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-cream">
      {/* Left brand panel */}
      <div className="relative hidden w-[48%] flex-col justify-between overflow-hidden wave-bg p-10 text-white lg:flex xl:w-[52%]">
        <div className="flex items-center gap-3">
          <AppLogo size={44} />
          <span className="text-2xl font-bold tracking-tight">DayCare Dashboard</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-mint-bright/80">
            Enrollment decision support
          </p>
          <h1 className="text-[42px] font-bold leading-[1.1] tracking-tight">
            Replace spreadsheets with confident classroom planning.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-mint-bright/85">
            Track FTE capacity across Shark through Orca, surface age-based
            transitions, and cascade seats from the top down — every month.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "12-month projection grid with age eligibility",
              "Birthday & transition alerts for managers",
              "Part-time FTE pairing that protects legal seats",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[14px] text-mint-bright/90">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/20 text-mint-bright">
                  <IconCheck size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[12px] text-mint-bright/50">
          Little Nest Learning Center · Phase 1 MVP
        </p>

        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-sage/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-mint/10 blur-2xl" />
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <AppLogo size={36} />
            <span className="text-xl font-bold">DayCare Dashboard</span>
          </div>

          <h2 className="text-[28px] font-bold tracking-tight text-ink">Welcome back</h2>
          <p className="mt-1.5 text-[14px] text-ink-muted">
            Sign in to manage rosters, capacity, and transitions.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink">
                Work email
              </label>
              <div className="relative">
                <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-[14px] transition focus:border-forest focus:outline-none"
                  placeholder="you@center.care"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink">
                Password
              </label>
              <div className="relative">
                <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-12 text-[14px] transition focus:border-forest focus:outline-none"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink">
                Sign in as
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Admin", "Manager", "Scheduler"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-xl border px-2 py-2.5 text-[12px] font-semibold transition ${
                      role === r
                        ? "border-forest bg-mint text-forest"
                        : "border-border bg-surface text-ink-muted hover:bg-cream"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-danger px-3 py-2 text-[13px] text-danger-text">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-ink-muted">
                <input type="checkbox" defaultChecked className="accent-forest" />
                Remember me
              </label>
              <button type="button" className="font-semibold text-forest hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-forest text-[14px] font-semibold text-white transition hover:bg-forest-mid disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-ink-muted">
            New to DayCare Dashboard?{" "}
            <Link href="/signup" className="font-semibold text-forest hover:underline">
              Create an account
            </Link>
          </p>

          <p className="mt-8 rounded-xl border border-dashed border-border bg-mint/40 px-3 py-2.5 text-center text-[11px] text-ink-muted">
            Demo: use the prefilled credentials · any password works
          </p>
        </div>
      </div>
    </div>
  );
}
