import { cn } from "@/lib/types";

type IconProps = {
  className?: string;
  size?: number;
};

export function AppLogo({ className, size = 36 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="20" cy="20" r="20" fill="#1a4d3e" />
      <path
        d="M13 22c0-5 3.5-8.5 7-8.5S27 17 27 22"
        stroke="#c5e8d9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M15.5 20.5c1.2-3.2 3.2-5 4.5-5s3.3 1.8 4.5 5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="24.5" r="2.2" fill="#7ba892" />
      <circle cx="23.5" cy="24.5" r="2.2" fill="#c5e8d9" />
      <path
        d="M18 27.5c.7.8 1.5 1.2 2 1.2s1.3-.4 2-1.2"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconDashboard({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="3" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="10" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function IconStudents({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.5" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 19.5c.8-3.2 3.2-5 5.5-5s4.7 1.8 5.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14 16.5c.6-1.6 1.9-2.5 3.2-2.5 1.5 0 2.8 1 3.3 2.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconGrid({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 8h16M4 16h16M8 4v16M16 4v16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function IconAlert({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 4.5 3.8 19.2a1 1 0 0 0 .87 1.5h14.66a1 1 0 0 0 .87-1.5L12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 10v4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="17.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconImport({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3v10m0 0 3.5-3.5M12 13 8.5 9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconRooms({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 19V9.5L12 4l8 5.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9.5 20v-6h5v6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTeam({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 19.5c1-3.5 3.5-5.2 7-5.2s6 1.7 7 5.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M18.5 8.5h3M20 7v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconSettings({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M4.9 7.1l1.6 1.5M17.5 15.4l1.6 1.5M3.5 12h2.2M18.3 12h2.2M4.9 16.9l1.6-1.5M17.5 8.6l1.6-1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconHelp({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M9.5 9.5a2.5 2.5 0 1 1 3.8 2.1c-.7.4-1.3 1-1.3 1.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconLogout({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M10 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14 8.5 17.5 12 14 15.5M8 12h9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSearch({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconBell({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 16.5h12l-1.2-1.4V11a4.8 4.8 0 1 0-9.6 0v4.1L6 16.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconMessage({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 3v-3H7.5A2.5 2.5 0 0 1 5 13.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPlus({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconArrowUpRight({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconVideo({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="6" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15 10.5 5-2.5v8l-5-2.5v-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPause({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="7" y="6" width="3.5" height="12" rx="1.2" fill="currentColor" />
      <rect x="13.5" y="6" width="3.5" height="12" rx="1.2" fill="currentColor" />
    </svg>
  );
}

export function IconStop({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" fill="currentColor" />
    </svg>
  );
}

export function IconPlay({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 6.5v11l10-5.5L8 6.5Z" fill="currentColor" />
    </svg>
  );
}

export function IconChevron({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="m8 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="m5 12.5 5 5 9-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEye({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M2.5 12S6.5 5.5 12 5.5 21.5 12 21.5 12 17.5 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function IconEyeOff({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="m4 4 16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M9.9 6.1C10.6 5.8 11.3 5.5 12 5.5 17.5 5.5 21.5 12 21.5 12a18 18 0 0 1-2.4 3.1M6.2 8.3A17.6 17.6 0 0 0 2.5 12S6.5 18.5 12 18.5c1.2 0 2.3-.3 3.3-.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconMail({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4.5 7.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLock({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="10" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10V7.5a4 4 0 1 1 8 0V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconFile({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14 3.5V9h5.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEdit({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 20h4l11-11-4-4L4 16v4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="m13 7 4 4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function IconFilter({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconCake({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 3c1 0 1.5 1 1.5 1.8S12.8 7 12 7s-1.5-.5-1.5-1.2S11 3 12 3Z" fill="currentColor" />
      <path d="M5 11h14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 16h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function TransitionIcon({
  type,
  className,
}: {
  type: "shell" | "leaf" | "wave" | "star";
  className?: string;
}) {
  const colors = {
    shell: { bg: "#e8f5f0", fg: "#1a4d3e" },
    leaf: { bg: "#fef3c7", fg: "#92400e" },
    wave: { bg: "#dbeafe", fg: "#1e40af" },
    star: { bg: "#fce7f3", fg: "#9d174d" },
  }[type];

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        className
      )}
      style={{ background: colors.bg, color: colors.fg }}
    >
      {type === "shell" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 20c6-2 8-8 6-14-4 2-6 6-6 14Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 20c-6-2-8-8-6-14 4 2 6 6 6 14Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 20V6" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      )}
      {type === "leaf" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M5 19 14 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      )}
      {type === "wave" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 14c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M3 9c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === "star" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3.5 14.2 9l5.8.5-4.4 3.8 1.4 5.7L12 16.5 6.9 19l1.4-5.7L4 9.5 9.8 9 12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
