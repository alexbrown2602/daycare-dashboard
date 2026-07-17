"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("daycare_auth");
    if (!auth) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-forest" />
          <p className="text-sm text-ink-muted">Loading DayCare Dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Sidebar />
      <div className="pl-[248px]">
        <Header />
        <main className="px-6 pb-10 pt-6">{children}</main>
      </div>
    </div>
  );
}
