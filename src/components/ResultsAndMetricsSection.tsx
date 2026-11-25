"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, Instagram, Clock, Globe2, TrendingUp } from "lucide-react";

const impactStats = [
  {
    prefix: "Up to",
    value: "94%",
    label: "Call pickup & instant summary accuracy",
    icon: PhoneCall,
  },
  {
    prefix: "Truly",
    value: "No Cap",
    label: "Call 50 or 50,000 numbers one-by-one",
    icon: TrendingUp,
  },
  {
    prefix: "Runs",
    value: "24/7",
    label: "Autonomous Instagram posts & DMs",
    icon: Instagram,
  },
  {
    prefix: "Speaks",
    value: "95+",
    label: "Native languages & natural accents",
    icon: Globe2,
  },
];

export function ResultsAndMetricsSection() {
  return (
    <section id="results" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {impactStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 260, damping: 24 }}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-3xl p-5 sm:p-6 text-center sm:text-left"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {stat.prefix}
                </p>
                <p className="mt-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-gradient">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs sm:text-sm leading-snug text-slate-600 dark:text-slate-300">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Performance Charts Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-20 mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            More calls answered. More followers won.{" "}
            <span className="text-brand-gradient">Every single week.</span>
          </h2>
        </motion.div>

        {/* 2 Side-by-Side Animated Charts */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chart 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Voice Outreach Performance
                </p>
                <div className="mt-2 flex items-baseline gap-2.5">
                  <span className="font-display text-3xl font-extrabold text-slate-950 dark:text-white">
                    4,820
                  </span>
                  <span className="rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    +184% customers reached
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <Clock className="h-3.5 w-3.5 text-sky-500" />
                <span>Saved 120h/mo</span>
              </div>
            </div>

            <div className="mt-6">
              <svg
                viewBox="0 0 460 170"
                className="w-full h-44 overflow-visible"
                role="img"
                aria-label="Chart showing sharp rise in completed customer calls after starting Alphado"
              >
                <defs>
                  <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {[30, 75, 120, 155].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="460"
                    y2={y}
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeDasharray="4 4"
                  />
                ))}
                <motion.path
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  d="M0,145 L65,142 L130,138 L175,132 L220,98 L280,72 L340,48 L400,32 L460,18 L460,155 L0,155 Z"
                  fill="url(#callsGrad)"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  d="M0,145 L65,142 L130,138 L175,132 L220,98 L280,72 L340,48 L400,32 L460,18"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="175"
                  y1="14"
                  x2="175"
                  y2="155"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <circle
                  cx="175"
                  cy="132"
                  r="5"
                  className="fill-indigo-600 stroke-white dark:stroke-slate-900"
                  strokeWidth="2"
                />
                <rect
                  x="118"
                  y="2"
                  width="116"
                  height="22"
                  rx="11"
                  className="fill-indigo-600"
                />
                <text
                  x="176"
                  y="16"
                  textAnchor="middle"
                  className="fill-white text-[10px] font-bold"
                >
                  Started Alphado
                </text>
              </svg>
              <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span>Today</span>
              </div>
            </div>
          </motion.div>

          {/* Chart 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                  Instagram 24/7 Growth
                </p>
                <div className="mt-2 flex items-baseline gap-2.5">
                  <span className="font-display text-3xl font-extrabold text-slate-950 dark:text-white">
                    56,320
                  </span>
                  <span className="rounded-full bg-pink-500/12 px-2.5 py-0.5 text-xs font-bold text-pink-700 dark:text-pink-300">
                    +72.4% followers
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <Instagram className="h-3.5 w-3.5 text-pink-500" />
                <span>389 DM calls</span>
              </div>
            </div>

            <div className="mt-6">
              <svg
                viewBox="0 0 460 170"
                className="w-full h-44 overflow-visible"
                role="img"
                aria-label="Chart showing compounding Instagram follower growth after starting Alphado"
              >
                <defs>
                  <linearGradient id="igGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {[30, 75, 120, 155].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="460"
                    y2={y}
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeDasharray="4 4"
                  />
                ))}
                <motion.path
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  d="M0,142 L65,139 L130,134 L175,127 L230,104 L290,78 L350,55 L410,36 L460,22 L460,155 L0,155 Z"
                  fill="url(#igGrad)"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  d="M0,142 L65,139 L130,134 L175,127 L230,104 L290,78 L350,55 L410,36 L460,22"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="175"
                  y1="14"
                  x2="175"
                  y2="155"
                  stroke="#ec4899"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <circle
                  cx="175"
                  cy="127"
                  r="5"
                  className="fill-pink-600 stroke-white dark:stroke-slate-900"
                  strokeWidth="2"
                />
                <rect
                  x="118"
                  y="2"
                  width="116"
                  height="22"
                  rx="11"
                  className="fill-pink-600"
                />
                <text
                  x="176"
                  y="16"
                  textAnchor="middle"
                  className="fill-white text-[10px] font-bold"
                >
                  Started Alphado
                </text>
              </svg>
              <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <span>Month 1</span>
                <span>Month 2</span>
                <span>Month 3</span>
                <span>Month 4</span>
                <span>Now</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
