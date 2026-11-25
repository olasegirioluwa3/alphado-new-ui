"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Globe,
  Plug,
  Instagram,
  FileSpreadsheet,
  MessageCircle,
  PhoneCall,
  CalendarCheck,
  Database,
} from "lucide-react";

const niches = [
  "Fashion & Beauty",
  "Restaurants & Food",
  "Real Estate",
  "E-Commerce",
  "Clinics & Wellness",
  "Events & Creators",
  "Agencies & B2B",
  "Local Retail",
];

const spokenLanguages = [
  "🇬🇧 English",
  "🇳🇬 Pidgin",
  "🇳🇬 Yoruba",
  "🇳🇬 Igbo",
  "🇳🇬 Hausa",
  "🇫🇷 Français",
  "🇪🇸 Español",
  "🇩🇪 Deutsch",
  "🇸🇦 العربية",
  "🇰🇪 Swahili",
  "🇵🇹 Português",
  "🇯🇵 日本語",
  "+ 83 more",
];

const connections = [
  { name: "Instagram", icon: Instagram },
  { name: "Excel / CSV", icon: FileSpreadsheet },
  { name: "Phone Calls", icon: PhoneCall },
  { name: "DM Inbox", icon: MessageCircle },
  { name: "Calendar", icon: CalendarCheck },
  { name: "CRM Lists", icon: Database },
];

export function GlobalCapabilitiesSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50/80 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Built for Every Founder
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            Customer growth on autopilot,{" "}
            <span className="text-brand-gradient">anywhere in the world.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1: Any niche */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-[28px] p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold text-slate-950 dark:text-white">
                Any niche, from boutiques to B2B SaaS.
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Adapts to how your market speaks — warm for birthdays, lively for
                promos, sharp for B2B leads.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {niches.map((niche) => (
                  <span
                    key={niche}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Any language */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            whileHover={{ y: -4 }}
            className="gradient-border-card shadow-lg"
          >
            <div className="gradient-border-inner p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-600 dark:bg-violet-400/15 dark:text-violet-300">
                    <Globe className="h-5 w-5" />
                  </div>
                  <img
                    src="/mascot-v2.png"
                    alt="Alphado multilingual human mascot"
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-slate-950 dark:text-white">
                  Any language, spoken like a native.
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Every call goes out in your customer&apos;s natural language — tone,
                  warmth, and clarity intact.
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {spokenLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Any contact file & workflow */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-[28px] p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/12 text-pink-600 dark:bg-pink-400/15 dark:text-pink-300">
                <Plug className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold text-slate-950 dark:text-white">
                Plugs into what you already use.
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Upload any contact sheet and link your Instagram page in seconds —
                no complex setup.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {connections.map((conn) => {
                  const Icon = conn.icon;
                  return (
                    <div
                      key={conn.name}
                      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100"
                    >
                      <Icon className="h-4 w-4 text-sky-500 shrink-0" />
                      <span>{conn.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
