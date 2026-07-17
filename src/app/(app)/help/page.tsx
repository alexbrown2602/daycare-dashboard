import Link from "next/link";
import { IconChevron } from "@/components/icons";

const faqs = [
  {
    q: "How does the monthly cascade work?",
    a: "On the 1st of each month, DayCare Dashboard checks vacancies in Orca first, then pulls qualified children up from Turtle, cascading downward until infant seats open in Shark and Octopus.",
  },
  {
    q: "What is FTE gapping?",
    a: "Part-time schedules that don’t overlap (e.g. M/W/F + T/Th) share one FTE seat. Daily legal headcount still cannot exceed room capacity.",
  },
  {
    q: "When do I need an exemption?",
    a: "Turtle allows a maximum of 2 children under 36 months. Exceeding that triggers an Exemption Needed warning on Alerts and Classrooms.",
  },
  {
    q: "Do overrides apply to future months?",
    a: "In Phase 1, manual dropdown overrides apply to the selected month only. Phase 2 will add “apply to all future months.”",
  },
];

const links = [
  { href: "/dashboard", label: "Dashboard overview" },
  { href: "/import", label: "Import Excel roster" },
  { href: "/projection", label: "12-month projection grid" },
  { href: "/alerts", label: "Birthday & age alerts" },
  { href: "/students", label: "Student profiles & overrides" },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-ink">Help</h1>
        <p className="mt-1 text-[14px] text-ink-muted">
          Phase 1 MVP guide for Little Nest Learning Center operators.
        </p>
      </div>

      <div className="rounded-[22px] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-[16px] font-bold text-ink">Quick links</h2>
        <ul className="mt-3 space-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium text-ink transition hover:bg-mint"
              >
                {l.label}
                <IconChevron className="text-ink-soft" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-[16px] font-bold text-ink">FAQ</h2>
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
          >
            <summary className="cursor-pointer list-none text-[14px] font-semibold text-ink marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {f.q}
                <IconChevron className="shrink-0 text-ink-soft transition group-open:rotate-90" />
              </span>
            </summary>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="wave-bg rounded-[22px] p-6 text-white">
        <h3 className="text-[16px] font-bold">Need more support?</h3>
        <p className="mt-2 text-[13px] text-mint-bright/85">
          Contact your DayCare Dashboard implementation lead or email{" "}
          <span className="font-semibold text-white">support@daycare.dashboard</span> for Phase 1
          onboarding help.
        </p>
      </div>
    </div>
  );
}
