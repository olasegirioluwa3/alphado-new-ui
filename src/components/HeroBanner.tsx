"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Upload,
  Instagram,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Mic,
  FileCheck2,
  Heart,
  Send,
  CheckCircle2,
} from "lucide-react";

interface HeroBannerProps {
  onOpenDemo: (presetPrompt?: string, fileName?: string) => void;
}

const stripItems = [
  "Voice Calls in 95+ Languages",
  "Upload Any Number Sheet — No Cap",
  "Auto Call Summaries",
  "24/7 Instagram Posting",
  "Instant DM Replies & Callbacks",
  "Birthday & Campaign Calling",
  "Gist & Promo Voice Drops",
  "Audience Growth Engine",
];

type ActionPhaseId = "dialing" | "speaking" | "summarizing" | "instagram";

interface ActionPhase {
  id: ActionPhaseId;
  status: string;
  sub: string;
  accentBg: string;
  icon: React.ComponentType<{ className?: string }>;
  mascotPose: {
    y: number[];
    rotate: number[];
    scale: number[];
  };
}

const actionPhases: ActionPhase[] = [
  {
    id: "dialing",
    status: "Dialing customer from your sheet...",
    sub: "Calling next receiver",
    accentBg: "from-sky-500 to-blue-600",
    icon: PhoneCall,
    mascotPose: {
      y: [0, -9, -3, -9, 0],
      rotate: [0, -3.5, 2.5, -3, 0],
      scale: [1, 1.03, 1.01, 1.03, 1],
    },
  },
  {
    id: "speaking",
    status: "Speaking naturally as you in live voice",
    sub: "Any language • Real-time",
    accentBg: "from-cyan-500 to-indigo-600",
    icon: Mic,
    mascotPose: {
      y: [0, -6, -12, -5, 0],
      rotate: [-2, 3.5, -2.5, 3, -2],
      scale: [1.01, 1.05, 1.02, 1.05, 1.01],
    },
  },
  {
    id: "summarizing",
    status: "Writing crisp AI call summary for you",
    sub: "Saved to your dashboard",
    accentBg: "from-emerald-500 to-teal-600",
    icon: FileCheck2,
    mascotPose: {
      y: [0, -8, -4, -8, 0],
      rotate: [0, 2, -2, 1.5, 0],
      scale: [1, 1.02, 1.04, 1.02, 1],
    },
  },
  {
    id: "instagram",
    status: "Posting to Instagram & replying to DMs",
    sub: "24/7 audience autopilot",
    accentBg: "from-pink-500 to-orange-500",
    icon: Instagram,
    mascotPose: {
      y: [0, -14, -2, -11, 0],
      rotate: [0, -5, 5, -3, 0],
      scale: [1, 1.05, 0.99, 1.04, 1],
    },
  },
];

export function HeroBanner({ onOpenDemo }: HeroBannerProps) {
  const [promptInput, setPromptInput] = useState("");
  const [selectedFile, setSelectedFile] = useState("customers_list.csv");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [callSeconds, setCallSeconds] = useState(1);

  // Cycle Alphado's live performed tasks naturally every 4.2s
  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhaseIdx((prev) => (prev + 1) % actionPhases.length);
      setCallSeconds(1);
    }, 4200);
    return () => clearInterval(phaseTimer);
  }, []);

  // Tick call duration smoothly during dialing/speaking
  useEffect(() => {
    const secTimer = setInterval(() => {
      setCallSeconds((s) => (s >= 59 ? 1 : s + 1));
    }, 1000);
    return () => clearInterval(secTimer);
  }, []);

  const phase = actionPhases[phaseIdx];
  const PhaseIcon = phase.icon;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file.name);
  };

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenDemo(
      promptInput.trim() ||
        "Call each customer warmly as our brand, share our 20% VIP offer, and summarize every conversation.",
      selectedFile
    );
  };

  const formattedTimer = `00:${String(callSeconds).padStart(2, "0")}`;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Subtle Ambient Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[460px] w-[860px] rounded-full bg-gradient-to-r from-sky-400/20 via-indigo-400/15 to-pink-400/20 blur-3xl dark:from-sky-500/15 dark:via-violet-500/15 dark:to-pink-500/15"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Editorial Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.06, type: "spring", stiffness: 280, damping: 22 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-xs backdrop-blur-md dark:border-sky-500/30 dark:bg-slate-900/80 dark:text-sky-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
            </span>
            <span>Meet Alphado — AI Voice Caller &amp; 24/7 Instagram Growth</span>
          </motion.div>

          {/* Monumental 3-Line Stacked Display Headline */}
          <h1
            style={{
              fontSize: "clamp(3.75rem, 9.2vw, 7.5rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.045em",
            }}
            className="mt-7 font-display font-extrabold text-slate-950 dark:text-white"
          >
            <span className="block">Your Voice.</span>{" "}
            <span className="block">Your Customers.</span>{" "}
            <span className="block text-brand-gradient">On Autopilot.</span>
          </h1>

          {/* Single Crisp Subtitle */}
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Upload your receiver numbers and give one short prompt —{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              Alphado
            </strong>{" "}
            calls every customer in any language, summarizes every call, and runs
            your Instagram 24/7.
          </p>

          {/* Centered Holo-style Gradient-Bordered Input Bar */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
            onSubmit={handleLaunch}
            className="mt-9 max-w-2xl mx-auto"
          >
            <div className="gradient-border-card shadow-lg">
              <div className="gradient-border-inner p-2 sm:p-2.5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3.5 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0">
                    <Upload className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span className="max-w-[135px] truncate">{selectedFile}</span>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls,.txt,.pdf"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>

                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="Short prompt: wish happy birthday, campaign, gist or DM callback..."
                    aria-label="Short prompt for Alphado voice calls"
                    className="w-full min-w-0 bg-transparent px-2.5 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-slate-400"
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="btn-brand inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Start Calling</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.form>
        </motion.div>

        {/* Active Mascot Performing Calls, Summaries & Instagram 24/7 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-12 flex flex-col items-center justify-center"
        >
          <div
            onClick={() => setPhaseIdx((prev) => (prev + 1) % actionPhases.length)}
            title="Click to see Alphado's next live action"
            className="relative flex h-64 w-full max-w-md sm:h-72 items-center justify-center cursor-pointer"
          >
            {/* Phase-Specific Visual Choreography Around the Mascot (Zero Overlap) */}

            {/* 1. DIALING: Expanding Cyan Sonar Call Ripples + Orbiting Ringing Phone Badge */}
            {phase.id === "dialing" && (
              <>
                {[0, 1, 2].map((ring) => (
                  <motion.span
                    key={`dial-ring-${ring}`}
                    aria-hidden="true"
                    initial={{ scale: 0.55, opacity: 0.65 }}
                    animate={{ scale: 1.48, opacity: 0 }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: ring * 0.72,
                      ease: "easeOut",
                    }}
                    className="pointer-events-none absolute h-52 w-52 rounded-full border-2 border-sky-400/60 dark:border-sky-400/45"
                  />
                ))}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.6, x: 115, y: -55 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.12, 1],
                    rotate: [-12, 12, -12, 12, 0],
                    x: 118,
                    y: -58,
                  }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  className="pointer-events-none absolute z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg"
                >
                  <PhoneCall className="h-5 w-5" />
                </motion.div>
              </>
            )}

            {/* 2. SPEAKING: Symmetrical Holographic Headphone Voice Waves Radiating Left & Right */}
            {phase.id === "speaking" && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 sm:left-8 flex h-24 items-center gap-1.5"
                >
                  {[24, 52, 82, 46, 94, 58, 30].map((h, i) => (
                    <motion.span
                      key={`lw-${i}`}
                      animate={{ scaleY: [0.35, 1, 0.45, 0.9, 0.35] }}
                      transition={{
                        duration: 0.95,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut",
                      }}
                      style={{ height: `${h * 0.65}px` }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.65)]"
                    />
                  ))}
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 sm:right-8 flex h-24 items-center gap-1.5"
                >
                  {[30, 58, 94, 46, 82, 52, 24].map((h, i) => (
                    <motion.span
                      key={`rw-${i}`}
                      animate={{ scaleY: [0.4, 0.95, 0.35, 1, 0.4] }}
                      transition={{
                        duration: 0.95,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut",
                      }}
                      style={{ height: `${h * 0.65}px` }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-sky-400 to-indigo-400 shadow-[0_0_12px_rgba(56,189,248,0.65)]"
                    />
                  ))}
                </div>
              </>
            )}

            {/* 3. SUMMARIZING: Floating Summary Document & Checkmark Rising Cleanly */}
            {phase.id === "summarizing" && (
              <>
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 24, x: -120 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [24, -18, -36, -54], x: -120 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  className="pointer-events-none absolute z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg"
                >
                  <FileCheck2 className="h-5 w-5" />
                </motion.div>
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 28, x: 120 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [28, -14, -34, -52], x: 120 }}
                  transition={{
                    duration: 2.4,
                    delay: 0.85,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-emerald-400/50 text-emerald-500 shadow-lg"
                >
                  <CheckCircle2 className="h-5 w-5" />
                </motion.div>
              </>
            )}

            {/* 4. INSTAGRAM 24/7: Floating Post, Heart & DM Send Micro-Icons */}
            {phase.id === "instagram" && (
              <>
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 30, x: -122 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [30, -15, -40, -60], x: -122 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  className="pointer-events-none absolute z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 text-white shadow-lg"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </motion.div>
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 26, x: 122 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [26, -18, -42, -62], x: 122 }}
                  transition={{
                    duration: 2.2,
                    delay: 0.7,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg"
                >
                  <Send className="h-4 w-4" />
                </motion.div>
              </>
            )}

            {/* Dynamic Soft Glow Aura behind Mascot */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-52 w-52 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/20"
            />

            {/* Mascot Performing Active Pose */}
            <motion.img
              key={phase.id}
              src="/mascot-v2.png"
              alt={`Alphado mascot ${phase.status}`}
              animate={phase.mascotPose}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.07 }}
              className="relative z-10 h-56 w-56 sm:h-64 sm:w-64 object-contain drop-shadow-[0_22px_34px_rgba(14,165,233,0.28)] select-none"
            />
          </div>

          {/* Single Sleek Live Activity Pill Directly Below Mascot (Zero Overlap) */}
          <div className="mt-2 min-h-[54px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                className="glass-nav inline-flex items-center gap-3 rounded-full px-4 py-2"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${phase.accentBg} text-white shadow-xs`}
                >
                  <PhaseIcon className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white leading-tight">
                    {phase.status}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {phase.sub}
                  </p>
                </div>
                {(phase.id === "dialing" || phase.id === "speaking") && (
                  <span className="ml-1 rounded-full bg-emerald-500/12 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                    {formattedTimer}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Holo-style Continuous Platform & Capability Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 py-3.5 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="animate-marquee flex items-center gap-3">
              {[...stripItems, ...stripItems].map((label, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 whitespace-nowrap"
                >
                  {idx % 3 === 0 ? (
                    <PhoneCall className="h-3.5 w-3.5 text-sky-500" />
                  ) : idx % 3 === 1 ? (
                    <Instagram className="h-3.5 w-3.5 text-pink-500" />
                  ) : idx % 4 === 0 ? (
                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                  ) : (
                    <MessageCircle className="h-3.5 w-3.5 text-violet-500" />
                  )}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
