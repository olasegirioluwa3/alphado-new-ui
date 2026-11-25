"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet,
  PenLine,
  PhoneForwarded,
  ClipboardCheck,
  CheckCircle2,
  Infinity as InfinityIcon,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    short: "Upload sheet",
    title: "Upload your receiver numbers",
    description:
      "Drop any CSV, Excel, or document with your contact numbers — 20 VIPs or 20,000 campaign leads, zero cap.",
    icon: FileSpreadsheet,
    cardTitle: "contacts_sheet.xlsx",
    cardBadge: "No Cap • Ready to dial",
    highlights: ["CSV, Excel, PDF & Sheets", "Auto-cleans duplicates", "Global phone codes"],
  },
  {
    number: "02",
    short: "Write prompt",
    title: "Give Alphado a short prompt",
    description:
      "Type what you want said — birthday wish, promo campaign, gist, or DM follow-up — and connect Instagram in one tap.",
    icon: PenLine,
    cardTitle: "Prompt & Brand Tone",
    cardBadge: "Takes 15 seconds",
    highlights: ["Natural human voice", "95+ languages supported", "1-click Instagram link"],
  },
  {
    number: "03",
    short: "Launch autopilot",
    title: "Calls one-by-one & runs IG 24/7",
    description:
      "Alphado dials every receiver professionally as you, answers live questions, posts daily on Instagram, and replies to DMs.",
    icon: PhoneForwarded,
    cardTitle: "Voice + IG Autopilot",
    cardBadge: "Calling & Posting Live",
    highlights: ["One-by-one smart dialing", "Instant DM callbacks", "24/7 Instagram posts"],
  },
  {
    number: "04",
    short: "Read summaries",
    title: "Review crisp call summaries anytime",
    description:
      "Every finished call becomes a short bullet summary with customer mood, orders, and follow-ups ready to read later.",
    icon: ClipboardCheck,
    cardTitle: "AI Call Summaries",
    cardBadge: "Instant digest",
    highlights: ["3-bullet call recaps", "Hot leads flagged first", "Export or share in 1 click"],
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  // Holo-style animated step progression
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [paused]);

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <InfinityIcon className="h-3.5 w-3.5 text-sky-500" />
            <span>Register &amp; Launch in Minutes</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            How it works?{" "}
            <span className="text-brand-gradient">It&apos;s as easy as 1, 2, 3…</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            No call center to hire, no tools to learn. Set up once and let Alphado
            run on autopilot.
          </p>
        </motion.div>

        {/* Interactive Holo-style Animated Step Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {steps.map((step, idx) => {
            const isSelected = idx === activeStep;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  isSelected
                    ? "text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeStepPill"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full btn-brand -z-0"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="opacity-80">{step.number}.</span>
                  <span>{step.short}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Animated Step Spotlight (Motion like tryholo.ai steps!) */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left: Vertical Interactive Steps List with Animated Progress Beam */}
          <div className="lg:col-span-6 relative space-y-3">
            {/* Background track line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[22px] top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-slate-800"
            />
            {/* Animated active gradient beam */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-[22px] top-6 w-[2px] bg-gradient-to-b from-sky-400 via-indigo-500 to-pink-500 origin-top"
              animate={{
                height: `${((activeStep + 1) / steps.length) * 86}%`,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            />

            {steps.map((step, idx) => {
              const isSelected = idx === activeStep;
              const isDone = idx < activeStep;
              return (
                <motion.button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className={`relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-sky-400 bg-white shadow-md dark:border-sky-500/60 dark:bg-slate-900"
                      : "border-transparent bg-transparent hover:bg-white/70 dark:hover:bg-slate-900/50"
                  }`}
                >
                  <motion.div
                    animate={{
                      scale: isSelected ? 1.12 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold transition-colors ${
                      isSelected
                        ? "bg-gradient-to-br from-sky-500 via-indigo-500 to-pink-500 text-white shadow-md"
                        : isDone
                        ? "bg-emerald-500 text-white"
                        : "border border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : step.number}
                  </motion.div>

                  <div className="min-w-0">
                    <h3
                      className={`font-display text-base sm:text-lg font-extrabold ${
                        isSelected
                          ? "text-slate-950 dark:text-white"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Animated Visual Preview Card */}
          <div className="lg:col-span-6">
            <div className="gradient-border-card shadow-xl">
              <div className="gradient-border-inner p-6 sm:p-8 min-h-[340px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.number}
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400">
                          <CurrentIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                            Step {current.number} of 04
                          </span>
                          <p className="font-display text-lg font-extrabold text-slate-950 dark:text-white">
                            {current.cardTitle}
                          </p>
                        </div>
                      </div>

                      <motion.img
                        src="/mascot-v2.png"
                        alt="Alphado guiding step"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="h-14 w-14 object-contain shrink-0"
                      />
                    </div>

                    <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{current.cardBadge}</span>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      {current.highlights.map((item, hIdx) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 * hIdx }}
                          className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    <span>Onboarding Progress</span>
                    <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500"
                      animate={{
                        width: `${((activeStep + 1) / steps.length) * 100}%`,
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
