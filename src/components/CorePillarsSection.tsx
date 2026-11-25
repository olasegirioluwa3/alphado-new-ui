"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Instagram,
  MessageSquareHeart,
  TrendingUp,
  CheckCircle2,
  FileSpreadsheet,
  Languages,
  Clock,
  Sparkles,
} from "lucide-react";

const pillars = [
  {
    id: "voice",
    tab: "AI Voice Calls",
    headline: "Calls that sound like you.",
    tagline:
      "Upload any list of numbers and a short prompt. Alphado calls every receiver one-by-one with no cap, speaks naturally in any language, and delivers crisp call summaries.",
    icon: PhoneCall,
    badge: "Main Superpower",
    accent: "from-sky-500 to-blue-600",
    bullets: [
      "Calls every number one-by-one — zero cap",
      "Speaks professionally in 95+ native languages",
      "Auto-summarizes every call for instant review",
    ],
    stats: [
      { label: "Dialing Cap", value: "Unlimited" },
      { label: "Languages", value: "95+ Native" },
      { label: "Call Recap", value: "Instant" },
    ],
  },
  {
    id: "instagram",
    tab: "Instagram 24/7",
    headline: "Posts that run 24/7.",
    tagline:
      "Alphado plans, creates, and publishes Reels, carousels, and captions on your Instagram automatically around the clock so your brand stays active every day.",
    icon: Instagram,
    badge: "Autonomous",
    accent: "from-pink-500 to-orange-500",
    bullets: [
      "Daily Reels, carousels & captions in your voice",
      "Optimal posting times tailored to your audience",
      "Zero manual scheduling or missed days",
    ],
    stats: [
      { label: "Schedule", value: "24/7 Auto" },
      { label: "Voice Match", value: "99% Brand" },
      { label: "Consistency", value: "30d Ahead" },
    ],
  },
  {
    id: "dms",
    tab: "Smart DM Replies",
    headline: "DMs that turn into calls.",
    tagline:
      "Every Instagram DM gets a fast, friendly reply — and when a customer wants to speak with you, Alphado calls them directly and saves the summary.",
    icon: MessageSquareHeart,
    badge: "DM → Voice",
    accent: "from-violet-500 to-purple-600",
    bullets: [
      "Instant replies to pricing, stock & booking DMs",
      "Calls warm DM customers who want to reach out",
      "Captures every lead even while you sleep",
    ],
    stats: [
      { label: "Reply Speed", value: "< 5 sec" },
      { label: "Callback", value: "Instant" },
      { label: "Missed DMs", value: "Zero" },
    ],
  },
  {
    id: "growth",
    tab: "Audience Growth",
    headline: "Accounts that grow fast.",
    tagline:
      "Promote your Instagram page continuously, attract real buyers in your niche, and convert new followers into paying customers automatically.",
    icon: TrendingUp,
    badge: "Growth Engine",
    accent: "from-emerald-500 to-teal-600",
    bullets: [
      "Smart account promotion that expands reach",
      "Turns comments & views into qualified leads",
      "Clear weekly growth & customer reports",
    ],
    stats: [
      { label: "Avg Reach", value: "3.2x Lift" },
      { label: "Targeting", value: "High Intent" },
      { label: "Reporting", value: "Weekly" },
    ],
  },
];

export function CorePillarsSection() {
  const [activeId, setActiveId] = useState("voice");
  const active = pillars.find((p) => p.id === activeId) || pillars[0];
  const ActiveIcon = active.icon;

  return (
    <section id="pillars" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            One AI. Every Customer Channel.
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            Built to win customers —{" "}
            <span className="text-brand-gradient">by voice and on Instagram.</span>
          </h2>
        </motion.div>

        {/* 4 Interactive Pillar Tiles */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = pillar.id === activeId;
            return (
              <motion.button
                key={pillar.id}
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveId(pillar.id)}
                className={`relative flex flex-col items-start rounded-2xl border p-4 text-left transition-colors cursor-pointer ${
                  isActive
                    ? "border-sky-500 bg-white shadow-md ring-2 ring-sky-500/20 dark:border-sky-400 dark:bg-slate-900"
                    : "border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.accent} text-white shadow-sm`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mt-3 font-display text-sm sm:text-base font-bold text-slate-950 dark:text-white">
                  {pillar.tab}
                </span>
                <span className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {pillar.badge}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Animated Active Showcase Card */}
        <div className="mt-8 gradient-border-card shadow-xl">
          <div className="gradient-border-inner p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
              >
                {/* Left Narrative */}
                <div className="lg:col-span-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    <ActiveIcon className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                    <span>{active.badge}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                    {active.headline}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                    {active.tagline}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {active.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Crisp Summary Visual */}
                <div className="lg:col-span-6">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-6 dark:border-slate-800 dark:bg-slate-950/80">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="/mascot-v2.png"
                          alt="Alphado mascot"
                          className="h-12 w-12 object-contain"
                        />
                        <div>
                          <p className="font-display text-base font-extrabold text-slate-950 dark:text-white">
                            {active.tab}
                          </p>
                          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                            Autopilot Ready
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        Active
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {active.stats.map((st) => (
                        <div
                          key={st.label}
                          className="rounded-2xl border border-slate-200 bg-white p-3.5 text-center dark:border-slate-800 dark:bg-slate-900"
                        >
                          <p className="font-display text-base sm:text-lg font-extrabold text-brand-gradient">
                            {st.value}
                          </p>
                          <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {st.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        <FileSpreadsheet className="h-3.5 w-3.5 text-sky-500" />
                        CSV / Excel / PDF
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        <Languages className="h-3.5 w-3.5 text-violet-500" />
                        Any Language
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        <Clock className="h-3.5 w-3.5 text-emerald-500" />
                        Runs 24/7
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
