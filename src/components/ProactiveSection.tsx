"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Cake,
  Calendar,
  FileText,
  TrendingUp,
  Megaphone,
  Check,
  Sparkles,
} from "lucide-react";

interface ProactiveCard {
  id: string;
  tag: string;
  title: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
  color: string;
}

const cards: ProactiveCard[] = [
  {
    id: "dm-leads",
    tag: "Call DM Leads",
    title: "4 customers in your Instagram DMs asked for a callback. Dial now?",
    metric: "12s response",
    icon: PhoneCall,
    cta: "Approve",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "birthdays",
    tag: "Birthday Wave",
    title: "14 VIP customers have birthdays today. Queue warm personal calls?",
    metric: "VIP list",
    icon: Cake,
    cta: "Approve",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "schedule-ig",
    tag: "Post 24/7",
    title: "30 days of Instagram Reels & carousels drafted in your voice. Publish?",
    metric: "30 posts",
    icon: Calendar,
    cta: "Approve",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "campaign",
    tag: "Campaign Dial",
    title: "Promo sheet uploaded (650 numbers). Start calling in any language?",
    metric: "No cap",
    icon: Megaphone,
    cta: "Approve",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "summaries",
    tag: "Summarize",
    title: "186 calls finished today. 47 hot buyers ready in your summary digest.",
    metric: "47 hot leads",
    icon: FileText,
    cta: "Mark Read",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "promote",
    tag: "Grow Page",
    title: "Your latest Reel hit 3.4x reach. Promote page & reply to 89 comments?",
    metric: "+1,240 visits",
    icon: TrendingUp,
    cta: "Approve",
    color: "from-cyan-500 to-sky-600",
  },
];

export function ProactiveSection() {
  const [approved, setApproved] = useState<Record<string, boolean>>({});

  const toggleApprove = (id: string) => {
    setApproved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-50/80 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/30 dark:bg-slate-900 dark:text-sky-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Always One Step Ahead</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              Proactive.{" "}
              <span className="text-brand-gradient">No babysitting needed.</span>
            </h2>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 shrink-0"
          >
            <img
              src="/mascot-v2.png"
              alt="Alphado proactive mascot"
              className="h-14 w-14 object-contain"
            />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-950 dark:text-white">
                Tap any card to approve
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                1-click control from your phone
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isApproved = Boolean(approved[card.id]);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: idx * 0.06,
                  type: "spring",
                  stiffness: 240,
                  damping: 22,
                }}
                whileHover={{ y: -4 }}
                className={`group flex flex-col justify-between rounded-[26px] border p-6 transition-colors ${
                  isApproved
                    ? "border-emerald-400/70 bg-emerald-50/50 dark:border-emerald-500/40 dark:bg-emerald-950/20"
                    : "border-slate-200 bg-white hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-sky-500/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-xs`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{card.tag}</span>
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {card.metric}
                    </span>
                  </div>

                  <p className="mt-5 text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
                    {card.title}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <img
                      src="/mascot-v2.png"
                      alt=""
                      aria-hidden="true"
                      className="h-7 w-7 object-contain"
                    />
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {isApproved ? "Running now" : "Ready"}
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    type="button"
                    onClick={() => toggleApprove(card.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      isApproved
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-900 text-white hover:bg-sky-600 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-400"
                    }`}
                  >
                    {isApproved ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Approved</span>
                      </>
                    ) : (
                      <span>{card.cta}</span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
