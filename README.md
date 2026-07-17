# DayCare Dashboard

Phase 1 MVP **frontend** for the Daycare Enrollment Decision-Support Dashboard. Built with Next.js (App Router), Tailwind CSS, and custom icons.

## Features

- **Login / Signup** with Admin, Manager, and Scheduler roles
- **Dashboard** — capacity stats, weekly FTE analytics, transition queue, team, enrollment gauge, shuffle engine
- **Students** — profiles, DOB/room/schedule, manual classroom overrides
- **12-Month Projection** — age eligibility grid with cascade-aware overrides
- **Alerts** — birthday, age transition, exemption, and capacity flags
- **Classrooms** — Shark → Orca capacity, daily headcounts, FTE gapping
- **Excel Import** — validate → import → confirm workflow (UI)
- **Team & Roles** — invite members and view permissions
- **Settings / Help**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Demo login is prefilled — any password works.

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- date-fns, Framer Motion, Recharts (available)
- Frontend-only auth via `localStorage` (no backend)
