"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Paperclip, Send } from "lucide-react";

const unifyingPillars = [
  {
    icon: Lightbulb,
    title: "Gets smarter with every call.",
    description:
      "Alphado learns how your customers respond, what converts in your niche, and sharpens every next wave automatically.",
  },
  {
    icon: Paperclip,
    title: "Every channel, covered.",
    description:
      "Outbound calls, instant summaries, Instagram Reels, and DM replies in 95+ languages — without adding a hire or a freelancer.",
  },
  {
    icon: Send,
    title: "Built for founders, not call centers.",
    description:
      "Alphado does the daily calling and posting so growing your business feels more like checking in than clocking in.",
  },
];

export function MissionBandSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Exact tryholo.ai signature big declarative mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.18] text-slate-950 dark:text-white">
            Alphado runs your{" "}
            <span className="text-brand-gradient">voice calls</span>,{" "}
            <span className="text-brand-gradient">call summaries</span>,{" "}
            <span className="text-brand-gradient">Instagram posts</span>, and{" "}
            <span className="text-brand-gradient">DM replies</span> end to end —
            calling every number on your list and growing your audience — while you
            run the actual business.
          </h2>
        </motion.div>

        {/* Exact tryholo.ai 3-column hairline-divided founder pillars */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-200 dark:md:divide-slate-800">
          {unifyingPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="md:px-8 first:md:pl-0 last:md:pr-0"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  <strong className="font-bold text-slate-950 dark:text-white">
                    {item.title}
                  </strong>{" "}
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
