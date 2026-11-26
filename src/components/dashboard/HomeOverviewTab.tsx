"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  DollarSign,
  FileText,
  Instagram,
  MessageSquare,
  PackagePlus,
  PenTool,
  PhoneCall,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import type { AlphadoUserProfile } from "./types";

type DashboardTab =
  | "home"
  | "products"
  | "alphado"
  | "content"
  | "calls"
  | "settings";

interface HomeOverviewTabProps {
  profile: AlphadoUserProfile;
  onNavigate: (tab: DashboardTab) => void;
}

const chartRanges: Record<
  "7D" | "30D" | "90D",
  {
    revenue: string;
    change: string;
    points: number[];
    labels: string[];
    calls: string;
    reach: string;
    conversion: string;
  }
> = {
  "7D": {
    revenue: "$4,820",
    change: "+18.4%",
    points: [34, 48, 42, 65, 59, 82, 91],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    calls: "642",
    reach: "28.4K",
    conversion: "14.2%",
  },
  "30D": {
    revenue: "$19,460",
    change: "+29.1%",
    points: [28, 39, 51, 47, 68, 79, 94],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "Now"],
    calls: "2,894",
    reach: "118.2K",
    conversion: "16.8%",
  },
  "90D": {
    revenue: "$54,910",
    change: "+44.6%",
    points: [22, 35, 44, 58, 69, 84, 96],
    labels: ["M1", "M1+", "M2", "M2+", "M3", "M3+", "Now"],
    calls: "8,412",
    reach: "342.9K",
    conversion: "18.5%",
  },
};

const alphadoActivities = [
  {
    title: "Completed outbound voice wave — Weekend VIP List",
    meta: "48 customers dialed one-by-one • 48 AI summaries saved",
    status: "Summarized",
    time: "12m ago",
    icon: "call" as const,
  },
  {
    title: "Replied to 14 incoming Instagram DMs",
    meta: "Answered pricing & delivery questions in under 5s",
    status: "Auto-Replied",
    time: "38m ago",
    icon: "dm" as const,
  },
  {
    title: "Returned missed call — Tunde Adeyemi",
    meta: "Spoke naturally in English • Recap logged in Calls",
    status: "Completed",
    time: "1h ago",
    icon: "summary" as const,
  },
  {
    title: "Published scheduled Instagram Reel & story update",
    meta: "Posted autonomously using approved brand memory",
    status: "Published",
    time: "3h ago",
    icon: "ig" as const,
  },
];

export function HomeOverviewTab({
  profile,
  onNavigate,
}: HomeOverviewTabProps) {
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const data = chartRanges[range];

  // Build SVG path from points (0..100 scale)
  const width = 560;
  const height = 190;
  const padX = 20;
  const padY = 18;
  const stepX = (width - padX * 2) / (data.points.length - 1);

  const coords = data.points.map((v, i) => ({
    x: padX + i * stepX,
    y: height - padY - (v / 100) * (height - padY * 2),
  }));

  const linePath = coords
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${
    height - padY
  } L ${coords[0].x.toFixed(1)} ${height - padY} Z`;

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Welcome back, {profile.firstName}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Here&apos;s how{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {profile.businessName}
            </span>{" "}
            is earning and growing today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Instagram className="h-3.5 w-3.5" />
            <span>
              {profile.igConnected
                ? `${profile.igHandle} Live`
                : "Instagram Pending"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("products")}
            className="btn-brand inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold cursor-pointer"
          >
            <PackagePlus className="h-3.5 w-3.5" />
            <span>New Product</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Earnings
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/12 text-sky-600 dark:text-sky-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-extrabold text-slate-950 dark:text-white">
            {data.revenue}
          </p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{data.change} vs last period</span>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              AI Voice Calls
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/12 text-indigo-600 dark:text-indigo-400">
              <PhoneCall className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-extrabold text-slate-950 dark:text-white">
            {data.calls}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            100% summarized automatically
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Instagram Reach
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/12 text-pink-600 dark:text-pink-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-extrabold text-slate-950 dark:text-white">
            {data.reach}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            24/7 organic + paid growth
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Lead Conversion
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-extrabold text-slate-950 dark:text-white">
            {data.conversion}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Voice + DM unified pipeline
          </p>
        </div>
      </div>

      {/* Earnings Chart + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Earnings & Growth Analytics Card */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                Earnings &amp; Analytics
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Revenue attributed to Alphado voice calls, ads, and Instagram DMs
              </p>
            </div>

            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
              {(["7D", "30D", "90D"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-colors cursor-pointer ${
                    range === r
                      ? "bg-white text-slate-950 shadow-xs dark:bg-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Responsive SVG Area Chart */}
          <div className="mt-6 w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="h-52 w-full"
              role="img"
              aria-label="Earnings trend chart"
            >
              <defs>
                <linearGradient id="dashAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.01" />
                </linearGradient>
                <linearGradient id="dashLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>

              {[0.25, 0.5, 0.75].map((ratio) => (
                <line
                  key={ratio}
                  x1={padX}
                  x2={width - padX}
                  y1={padY + ratio * (height - padY * 2)}
                  y2={padY + ratio * (height - padY * 2)}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeDasharray="4 4"
                />
              ))}

              <path d={areaPath} fill="url(#dashAreaGrad)" />
              <path
                d={linePath}
                fill="none"
                stroke="url(#dashLineGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {coords.map((pt, idx) => (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    className="fill-white dark:fill-slate-900"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                  />
                </g>
              ))}
            </svg>

            <div className="mt-2 flex items-center justify-between px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              {data.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Workspace Shortcuts */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
              Quick Actions
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Jump straight into your daily tools
            </p>

            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={() => onNavigate("products")}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-left transition-colors hover:border-sky-300 hover:bg-sky-50/60 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-sky-500/40 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <PackagePlus className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Products &amp; Running Ads
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Publish products &amp; manage ads
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("alphado")}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-left transition-colors hover:border-pink-300 hover:bg-pink-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-pink-500/40 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Teach Alphado Your Brand
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Brand intelligence &amp; memory
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("content")}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-left transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-indigo-500/40 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <PenTool className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Open Content Studio
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Generate posts, reels &amp; scripts
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("calls")}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-left transition-colors hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-emerald-500/40 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Calls &amp; Live Chat
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Call logs, DMs &amp; AI recaps
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alphado Activity Only */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/12 text-sky-600 dark:text-sky-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-lg font-extrabold text-slate-950 dark:text-white leading-tight">
                Alphado Activity
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Autonomous actions handled by Alphado
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active</span>
          </span>
        </div>

        <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
          {alphadoActivities.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    item.icon === "call"
                      ? "bg-sky-500/12 text-sky-600 dark:text-sky-400"
                      : item.icon === "dm"
                      ? "bg-indigo-500/12 text-indigo-600 dark:text-indigo-400"
                      : item.icon === "summary"
                      ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
                      : "bg-pink-500/12 text-pink-600 dark:text-pink-400"
                  }`}
                >
                  {item.icon === "call" && <PhoneCall className="h-4 w-4" />}
                  {item.icon === "dm" && <MessageSquare className="h-4 w-4" />}
                  {item.icon === "summary" && <FileText className="h-4 w-4" />}
                  {item.icon === "ig" && <Instagram className="h-4 w-4" />}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.meta}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-12 sm:pl-0 sm:text-right shrink-0">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2.5 py-1 text-[11px] font-bold text-sky-700 dark:text-sky-300">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{item.status}</span>
                </span>
                <span className="text-xs text-slate-400">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
